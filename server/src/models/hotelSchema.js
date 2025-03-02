const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
	name: { type: String, required: true},
	address: { type: String, required: true},
	city: { type: String, required: true },
	state: { type: String, required: true },
	mobile: { type: String, required: true },
	ac_rooms : { type: Number, required: true, default: 0 },
	non_ac_rooms : { type: Number, required: true, default: 0 },
	banquet_hall_available: { type: Boolean, required: true, default: false },
	hotel_images: { type: [String], default: []}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", HotelSchema);