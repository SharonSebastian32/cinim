// controllers/bookingController.js
import Booking from "../models/seatmodel.js";

export const createBooking = async (req, res) => {
  try {
    const bookingsArray = req.body; // array of booking objects

    if (!bookingsArray || bookingsArray.length === 0) {
      return res.status(400).json({
        status: "error",
        data: null,
        message: "Booking array is required",
      });
    }

    const savedBookings = [];

    for (const bookingData of bookingsArray) {
      const { seats, totalPrice, seatIds, status } = bookingData;

      if (!seats || seats.length === 0) {
        return res.status(400).json({
          status: "error",
          data: null,
          message: "Each booking must have seats",
        });
      }

      // Check if any seat is already booked
      const existingBooking = await Booking.findOne({
        seatIds: { $in: seatIds },
        status: "booked",
      });

      if (existingBooking) {
        const bookedSeats = existingBooking.seatIds.filter((id) =>
          seatIds.includes(id)
        );
        return res.status(400).json({
          status: "error",
          data: { bookedSeats },
          message: "Some seats are already booked",
        });
      }

      // Save booking
      const booking = new Booking({
        seats,
        seatIds,
        totalPrice,
        status: status || "booked",
      });

      const savedBooking = await booking.save();
      savedBookings.push(savedBooking);
    }

    res.status(201).json({
      status: "success",
      //   data: savedBookings,
      message: "Booking(s) created successfully",
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({
      status: "error",
      data: null,
      message: "Server error",
    });
  }
};

export const getBookedSeats = async (req, res) => {
  try {
    // Find all bookings with status "booked"
    const bookings = await Booking.find({ status: "booked" });

    // Extract all booked seat IDs and make them unique
    const bookedSeatsArray = [
      ...new Set(bookings.flatMap((booking) => booking.seatIds)),
    ];

    // Standardized response
    res.status(200).json({
      status: "success",
      data: {
        bookedSeats: bookedSeatsArray,
      },
      message: "Fetched all booked seats successfully",
    });
  } catch (error) {
    console.error("Error fetching booked seats:", error);
    res.status(500).json({
      status: "error",
      data: null,
      message: "Server error while fetching booked seats",
    });
  }
};
