// File: models/Reservation.js

const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [2, 'First name must be at least 2 characters long']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: [2, 'Last name must be at least 2 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: Number,
    required: [true, 'Phone number is required'],
    validate: {
      validator: (v) => {
        return v.toString().length === 10;
      },
      message: 'Please enter a correct mobile number (10 digits)'
    }
  },
  date: {
    type: String,
    required: [true, 'Date is required']
  },
  time: {
    type: String,
    required: [true, 'Time is required']
  },
  payment: {
    type: String,
    required: [true, 'Payment method is required'],
    enum: ['Cash', 'UPI', 'Card'],
  },
  createdAt: {
    type: Date,
    default: () => {
      const indianTimeOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
      return new Date(Date.now() + indianTimeOffset);
    }
  }
});

module.exports = mongoose.model('Reservation', reservationSchema);
