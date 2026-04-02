// module.exports = router;

const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');

function getSlotRange(timeStr) {
  const [hour, minute] = timeStr.split(':').map(Number);
  const slotStartHour = Math.floor(hour / 3) * 3;
  const slotEndHour = slotStartHour + 3;

  const slotStart = `${slotStartHour.toString().padStart(2, '0')}:00`;
  const slotEnd = `${slotEndHour.toString().padStart(2, '0')}:00`;

  return { slotStart, slotEnd };
}

router.post('/send', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, date, time, payment } = req.body;

    console.log('Received reservation data:', req.body);

    if (!firstName || !lastName || !email || !phone || !date || !time || !payment) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all fields',
      });
    }

    const { slotStart, slotEnd } = getSlotRange(time);

    const bookingsInSlot = await Reservation.countDocuments({
      date: date,
      time: { $gte: slotStart, $lt: slotEnd },
    });

    if (bookingsInSlot >= 3) {
      const allSlots = ['09:00', '12:00', '15:00', '18:00', '21:00', '00:00'];
      const suggestions = [];

      for (let i = 0; i < allSlots.length; i++) {
        const altStart = allSlots[i];
        const altEnd = i < allSlots.length - 1 ? allSlots[i + 1] : '23:59';

        const count = await Reservation.countDocuments({
          date: date,
          time: { $gte: altStart, $lt: altEnd },
        });

        if (count < 3) {
          suggestions.push({ from: altStart, to: altEnd });
        }
      }

      return res.status(400).json({
        success: false,
        message: `The selected time slot (${slotStart} - ${slotEnd}) is fully booked.`,
        suggestions,
        popup: `This time slot is full. Please choose another time slot. Suggestions: ${suggestions.map((s) => `${s.from} to ${s.to}`).join(', ')}`,
      });
    }

    const newReservation = new Reservation({
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
      payment,
    });

    const savedReservation = await newReservation.save();

    console.log('Reservation saved:', savedReservation);

    res.status(201).json({
      success: true,
      message: 'Reservation created successfully (Your Booking Id is Your Mobile no)',
      data: savedReservation,
    });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

module.exports = router;
