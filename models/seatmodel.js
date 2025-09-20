// models/Booking.js
import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  id: { type: String, required: true },
  row: { type: Number, required: true },
  seat: { type: Number, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ["regular", "premium", "vip"], required: true },
});

const bookingSchema = new mongoose.Schema(
  {
    seats: { type: [seatSchema], required: true },
    seatIds: { type: [String], required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["booked", "cancelled"], default: "booked" },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
