// routes/bookingRoutes.js
import express from "express";
import Booking from "../models/seatmodel.js";
import {
  createBooking,
  getBookedSeats,
} from "../controller/bookingcontroller.js";

const router = express.Router();

router.post("/booking", createBooking);
router.get("/ticket-details", getBookedSeats);

export default router;
