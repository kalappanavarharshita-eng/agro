const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingNumber: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  product: {
    name: String,
    price: Number
  },
  fromDate: {
    type: String,
    required: true
  },
  toDate: {
    type: String,
    required: true
  },
  days: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  bookingStatus: {
    type: String,
    enum: ["Pending", "Confirmed", "Rejected"],
    default: "Pending"
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending"
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "card", "upi", "netbanking"],
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema);