const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Enquiry = require('../models/Enquiry');
const { JWT_SECRET, authMiddleware } = require('../middleware/auth');

const router = express.Router();

// POST /api/admin/login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required.',
            });
        }

        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password.',
            });
        }

        const isMatch = await admin.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password.',
            });
        }

        const token = jwt.sign(
            { id: admin._id, username: admin.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login.',
            error: error.message,
        });
    }
});

// GET /api/admin/enquiries - Fetch all enquiries (protected)
router.get('/enquiries', authMiddleware, async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: enquiries.length,
            data: enquiries,
        });
    } catch (error) {
        console.error('Error fetching enquiries:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch enquiries.',
            error: error.message,
        });
    }
});

module.exports = router;
