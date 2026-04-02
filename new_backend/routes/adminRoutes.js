
// File: routes/adminRoutes.js (Enhanced with update and delete endpoints)
const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Reservation = require('../models/reservation');
     
// Admin login
router.post('/login', async (req, res) => {
  try {
    const { adminId, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ adminId });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password and login
    if (admin.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      adminId: admin.adminId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all reservations (admin only)
router.get('/reservations', async (req, res) => {
  try {
    const { adminId, password } = req.query;

    // Verify admin credentials
    const admin = await Admin.findOne({ adminId });
    if (!admin || admin.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    // Get all reservations in descending order (newest first)
    const reservations = await Reservation.find().sort({ date: -1, time: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update reservation (admin only)
router.put('/reservations/:id', async (req, res) => {
  try {
    const { adminId, password } = req.query;
    const { id } = req.params;
    const { firstName, lastName, email, phone, date, time } = req.body;

    // Verify admin credentials
    const admin = await Admin.findOne({ adminId });
    if (!admin || admin.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    // Check if reservation exists
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    // Update reservation
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        phone,
        date,
        time
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Reservation updated successfully',
      data: updatedReservation
    });
  } catch (error) {
    res.status(error.httpStatusCode || 500).json({
      success: false,
      message: error.message
    });
  }
});

// Delete reservation (admin only)
router.delete('/reservations/:id', async (req, res) => {
  try {
    const { adminId, password } = req.query;
    const { id } = req.params;

    // Verify admin credentials
    const admin = await Admin.findOne({ adminId });
    if (!admin || admin.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    // Check if reservation exists
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    // Delete reservation
    await Reservation.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Reservation deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;