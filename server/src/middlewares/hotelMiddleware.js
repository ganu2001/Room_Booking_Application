const Hotel = require("../models/hotelSchema");
const {apiErrorResponse } = require("../utils/helperFuntions");

const createHotelMiddleware = async(req, res, next) => {

	const hotelData =  { 
		name:req.body.name, 
		address:req.body.address,
		city:req.body.city, 
		state:req.body.state, 
		mobile:req.body.mobile, 
		ac_rooms:req.body.ac_rooms, 
		non_ac_rooms:req.body.non_ac_rooms, 
		ac_room_price:req.body.ac_room_price, 
		non_ac_room_price:req.body.non_ac_room_price 
	};
	
	
	const missingValues = Object.keys(hotelData).filter(key => !hotelData[key]);
	if(missingValues.length > 0) {
		return res.status(400).json({ message:`Missing fields:  ${missingValues.join(', ')}`})
	}

	const hotelExist = await Hotel.findOne({name: hotelData.name, address:hotelData.address, city: hotelData.city, state:hotelData.state });
	if(hotelExist) {
		return apiErrorResponse(res,403,"Hotel with same data already exist");
	}
	
	next();
}

module.exports = {createHotelMiddleware};