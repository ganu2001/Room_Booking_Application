const Hotel = require('../models/hotelSchema');
const { apiErrorResponse, apiSuccessResponse } = require('../utils/helperFuntions');

const createHotel = async (req, res) => {
	try {
		const hotelData =  { 
			name: req.body.name, 
			address: req.body.address,
			city: req.body.city, 
			state: req.body.state, 
			mobile: req.body.mobile, 
			ac_rooms: req.body.ac_rooms, 
			non_ac_rooms: req.body.non_ac_rooms, 
			ac_room_price: req.body.ac_room_price, 
			non_ac_room_price: req.body.non_ac_room_price,
			banquet_hall_available: req.body.banquet_hall_available,
			hotel_images: req.body.hotel_images,
		};

		const newHotel = new Hotel({...hotelData});
		await newHotel.save(); 

		return res.status(200).json({ message:"Hotel Created Successfully", name : hotelData.name})
	}
	catch (error) {
		return res.status(500).json({ message: "Server error", error: error.message });
	}
}

const getHotelData = async (req, res) => {
	try {
		const hotelId = req.params.id;

		if(hotelId) {
			const hotelData = await Hotel.findOne({_id: hotelId})

			if(!hotelData) {
				return apiErrorResponse(res, 404, "Hotel not found");
			}

			return apiSuccessResponse(res, 200, "Hotel Data fetched", hotelData);
		}
		else {
			return apiErrorResponse(res,500,"hotel id required", error.message)
		}
		
	}
	catch (error) {
		return apiErrorResponse(res,500,"Internal Server Error", error.message)
	}
}

const updateHotelData = async (req, res) => {
	try {
		const hotelId = req.params.id;
		
		if(!hotelId) {
			return apiErrorResponse(res, 400, "Hotel Id required")
		}

		const updatedData = req.body;

		const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, updatedData, {
			new: true,          
			runValidators: true 
		  });
		
		  return apiSuccessResponse(res, 200, "Hotel Updated Sucessfully", updatedHotel);
		
	}
	catch (error) {
		return apiErrorResponse(res,500,"Internal Server Error", error.message)
	}
}

const deleteHotel = async (req, res) => {
	try {
		const hotelId = req.params.id;
		
		if(!hotelId) {
			return apiErrorResponse(res, 400, "Hotel Id required")
		}

		const updatedHotel = await Hotel.deleteOne({_id: hotelId});
		
		return apiSuccessResponse(res, 200, "Hotel deleted Sucessfully", updatedHotel);
		
	}
	catch (error) {
		return apiErrorResponse(res,500,"Internal Server Error", error.message)
	}
}

module.exports = {createHotel, getHotelData, updateHotelData, deleteHotel}