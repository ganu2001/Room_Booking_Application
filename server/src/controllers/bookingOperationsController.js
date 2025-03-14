const Hotel = require('../models/hotelSchema');
const Booking = require('../models/bookingSchema');
const { apiErrorResponse, apiSuccessResponse } = require('../utils/helperFuntions');

const searchHotels = async (req, res) => {
	try {
		const {query} = req.body;

		if (!query || query == "") {
			const hotelsData = await Hotel.find();
				return apiSuccessResponse(res, 200,"Hotels data fetched successfully",  hotelsData);
		}

		const hotelSet = new Set();
    	const finalHotels = [];

		const hotelsByName = await Hotel.find({ name: { $regex: query, $options: "i" } });
		hotelsByName.forEach((hotel) => {
			if (!hotelSet.has(hotel.id)) {
			hotelSet.add(hotel.id);
			finalHotels.push({ ...hotel.toObject(), matchedBy: "name" });
			}
		});

		const hotelsByCity = await Hotel.find({ 
			city: { $regex: query, $options: "i" },
			_id: { $nin: Array.from(hotelSet) } 
		});
		hotelsByCity.forEach((hotel) => {
			if (!hotelSet.has(hotel.id)) {
			hotelSet.add(hotel.id);
			finalHotels.push({ ...hotel.toObject(), matchedBy: "city" });
			}
		});

		const hotelsByState = await Hotel.find({ 
			state: { $regex: query, $options: "i" },
			_id: { $nin: Array.from(hotelSet) } 
		});
		hotelsByState.forEach((hotel) => {
			if (!hotelSet.has(hotel.id)) {
			hotelSet.add(hotel.id);
			finalHotels.push({ ...hotel.toObject(), matchedBy: "state" });
			}
		});

		return apiSuccessResponse(res, 200, "Hotels Fetched successfully", finalHotels);
	}
	catch (error) {
		return apiErrorResponse(res,500,"Internal Server Error", error.message)
	}
}

const bookHotel = async (req, res) => {
	try {
		const {userId, hotelId, roomType, numberOfRooms, checkInDate, checkOutDate, status} = req.body;

		const hotel = await Hotel.findById(hotelId);
		if (!hotel) return apiErrorResponse(res, 404, "Hotel not found");

		if (roomType === "AC" && hotel.ac_rooms < numberOfRooms) {
			return apiErrorResponse(res, 400, "Not enough AC rooms available");
		}
		
		if (roomType === "Non-AC" && hotel.non_ac_rooms < numberOfRooms) {
			return apiErrorResponse(res, 400, "Not enough Non-AC rooms available");
		}

		const newBooking = new Booking({
			userId,
			hotelId,
			roomType,
			numberOfRooms,
			checkInDate,
			checkOutDate,
			status: "Confirmed",
		  });
	  
		  await newBooking.save();
		  
		  return apiSuccessResponse(res, 200, "Booking successful");		
	}
	catch (error) {
		return apiErrorResponse(res,500,"Internal Server Error", error.message)
	}
} 

const getUserBookings = async (req, res) => {
	try {
		const userId = req.body.userId;

		const bookings = await Booking.find({ userId: userId }).populate('hotelId');

		return apiSuccessResponse(res, 200, "Bookings fetched successful", bookings);		
	}
	catch (error) {
		return apiErrorResponse(res,500,"Internal Server Error", error.message)
	}
}

const checkAvailability = async (req, res) => {
	try {
		const { hotelId, checkInDate, checkOutDate, numberOfRooms, roomType } = req.body;
		
		if (!hotelId || !checkInDate || !checkOutDate || !numberOfRooms || !roomType) {
			return apiErrorResponse(res,400, "Required Fields missing");
		}

		const hotel = await Hotel.findOne({_id: hotelId});
		if(!hotel) {
			return apiErrorResponse(res,404,"Hotel not found");
		}

		const totalRooms = roomType == "AC" ? hotel.ac_rooms : hotel.non_ac_rooms;
		const startDt = new Date(checkInDate);
    	const endDt = new Date(checkOutDate);

		let dateAvailability = {};

		for (let d = new Date(startDt); d <= endDt; d.setDate(d.getDate() + 1)) {
		dateAvailability[d.toISOString().split("T")[0]] = totalRooms;
		}

		const bookings = await Booking.find({
		hotelId,
		roomType,
		status: "Confirmed",
		$or: [
			{ checkInDate: { $lte: endDt }, checkOutDate: { $gte: startDt } },
		],
		});

		bookings.forEach((booking) => {
		let checkIn = new Date(booking.checkInDate);
		let checkOut = new Date(booking.checkOutDate);
		for (let d = new Date(checkIn); d <= checkOut; d.setDate(d.getDate() + 1)) {
			let dateStr = d.toISOString().split("T")[0];
			if (dateAvailability[dateStr] !== undefined) {
			dateAvailability[dateStr] -= booking.numberOfRooms;
			}
		}
		});

		let availability = Object.keys(dateAvailability).map((date) => ({
			date,
			availableRooms: dateAvailability[date],
			available: dateAvailability[date] >= numberOfRooms
		}));

		return apiSuccessResponse(res, 200, "Availability fetched successful", availability);		
	}
	catch (error) {
		return apiErrorResponse(res,500,"Internal Server Error", error.message)
	}
} 


module.exports = {searchHotels, bookHotel, getUserBookings, checkAvailability}