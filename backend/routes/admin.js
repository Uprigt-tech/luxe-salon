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
        console.log('🔑 Login attempt:', { username });

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required.',
            });
        }

        const admin = await Admin.findOne({ username });

        if (!admin) {
            console.log('❌ Login failed: admin not found');
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password.',
            });
        }

        console.log('📋 Found admin, comparing passwords...');

        // Direct string comparison (no bcrypt)
        if (password !== admin.password) {
            console.log('❌ Login failed: password mismatch');
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

        console.log('✅ Login successful for:', username);
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

// PUT /api/admin/enquiries/:id/contacted - Mark enquiry as contacted
router.put('/enquiries/:id/contacted', authMiddleware, async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndUpdate(
            req.params.id,
            { status: 'contacted' },
            { new: true }
        );

        if (!enquiry) {
            return res.status(404).json({ success: false, message: 'Enquiry not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Enquiry marked as contacted',
            data: enquiry,
        });
    } catch (error) {
        console.error('Error updating enquiry:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// DELETE /api/admin/enquiries/:id - Permanent delete
router.delete('/enquiries/:id', authMiddleware, async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

        if (!enquiry) {
            return res.status(404).json({ success: false, message: 'Enquiry not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Enquiry deleted permanently',
        });
    } catch (error) {
        console.error('Error deleting enquiry:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
