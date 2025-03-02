const Hotel = require('../models/hotelSchema');
const { apiErrorResponse, apiSuccessResponse } = require('../utils/helperFuntions');

const searchHotels = async (req, res) => {
	try {
		const {query} = req.body;

		if (!query) {
		return apiErrorResponse(res, 400, "Search query missing")
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
		

		// return apiSuccessResponse(res, 200, "Hotels Fetched successfully", finalHotels);
	}
	catch (error) {
		return apiErrorResponse(res,500,"Internal Server Error", error.message)
	}
} 

module.exports = {searchHotels, bookHotel}