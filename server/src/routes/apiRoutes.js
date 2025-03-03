const express = require("express");
const {signupUser, loginUser} = require('../controllers/userController');
const { adminAuthMiddleware, userAuthMiddleware } = require("../middlewares/userAuthMiddleware");
const { createHotelMiddleware } = require("../middlewares/hotelMiddleware");
const {createHotel, getHotelData, updateHotelData, deleteHotel} = require("../controllers/hotelController");
const {searchHotels, bookHotel, getUserBookings} = require("../controllers/bookingOperationsController");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hi");
});

router.post('/signup', signupUser);
router.post("/login", loginUser);

// Hotel CRUD 
router.post("/create-hotel", adminAuthMiddleware, createHotelMiddleware, createHotel);
router.post("/hotel", userAuthMiddleware, getHotelData)
router.post("/update-hotel", adminAuthMiddleware, updateHotelData)
router.post("/delete-hotel", adminAuthMiddleware, deleteHotel)


// Booking operations
router.post("/get-hotels-list", userAuthMiddleware, searchHotels);
router.post("/book-hotel", userAuthMiddleware, bookHotel)
router.post("/get-user-bookings", userAuthMiddleware, getUserBookings)
// router.post("/getAvailability", userAuthMiddleware, getHotelAvailability)

	
module.exports = router;
