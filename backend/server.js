const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Enquiry = require('./models/Enquiry');
const Admin = require('./models/Admin');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
    .connect('mongodb+srv://uprigt:vipin2006@cluster0.xrnaoz8.mongodb.net/salonDB')
    .then(async () => {
        console.log('✅ Connected to MongoDB - salonDB');

        // Seed default admin if none exists
        const adminExists = await Admin.findOne({ username: 'admin' });
        if (!adminExists) {
            await Admin.create({ username: 'admin', password: 'admin123' });
            console.log('✅ Default admin created (username: admin)');
        }
    })
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/admin', adminRoutes);

// POST /api/enquiry - Save enquiry data
app.post('/api/enquiry', async (req, res) => {
    try {
        const { name, phone, email, pincode, enquiryType, message } = req.body;

        const newEnquiry = new Enquiry({
            name,
            phone,
            email,
            pincode,
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
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
