const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Enquiry = require('./models/Enquiry');
const Admin = require('./models/Admin');
const adminRoutes = require('./routes/admin');

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Middleware
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://luxe-mens-salon.vercel.app"
    ],
    credentials: true
}));

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('✅ Connected to MongoDB - salonDB');

        // Seed default admin with plain text password
        const adminExists = await Admin.findOne({ username: "admin" });

        if (!adminExists) {
            await Admin.create({
                username: "admin",
                password: "admin123"
            });

            console.log("Admin created: admin / admin123");
        }
        console.log('✅ Admin seeded (username: admin, password: admin123)');
    })
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/admin', adminRoutes);

// POST /api/enquiry - Save enquiry data
app.post('/api/enquiry', async (req, res) => {
    try {
        const { name, phone, email, city, enquiryType, message } = req.body;

        const newEnquiry = new Enquiry({
            name,
            phone,
            email,
            city,
            enquiryType,
            message,
        });

        const savedEnquiry = await newEnquiry.save();

        res.status(201).json({
            success: true,
            message: 'Enquiry submitted successfully',
            data: savedEnquiry,
        });
    } catch (error) {
        console.error('Error saving enquiry:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit enquiry',
            error: error.message,
        });
    }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 