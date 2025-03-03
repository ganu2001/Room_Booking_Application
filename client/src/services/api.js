import axios from 'axios';
import Cookies from 'js-cookie';


const apiUrl = "http://127.0.0.1:5500/api";
// const apiUrl = "http://192.168.150.231:5500/api";


export const login = (email, password) => {
	const payload = {
			"email": email,
			"password": password
		}
	const res = axios.post(`${apiUrl}/login`, payload);
	return res;
}

export const getHotelsList = (searchquery = "") => {
	const payload = {
		query: searchquery,
		userId: Cookies.get("userId"),
	}
	const res = axios.post(`${apiUrl}/get-hotels-list`, payload);
	return res;
} 

export const getHotelInfo = (hotelId) => {
	const payload = {
		hotelId: hotelId,
		userId: Cookies.get("userId"),
	}
	const res = axios.post(`${apiUrl}/hotel`, payload);
	return res;
}

export const updateHotelData = (hotelData) => {
	const payload = {
		...hotelData,
		userId: Cookies.get("userId"),
	}
	const res = axios.post(`${apiUrl}/update-hotel`, payload);
	return res;

}

export const deleteHotel = (hotelId) => {
	const payload = {
		hotelId: hotelId,
		userId: Cookies.get("userId"),
	}
	const res = axios.post(`${apiUrl}/delete-hotel`, payload);
	return res;

}

export const getAvailability = (enteredData, hotelId) => {
	const payload = {
		"userId": Cookies.get("userId"),
		"hotelId": hotelId,
		"checkInDate": enteredData.checkInDateString,
		"checkOutDate": enteredData.checkOutDateString,
		"roomType": enteredData.isRoomTypeAC ? "AC" : "Non-AC",
		"numberOfRooms": enteredData.roomCount
	}
	const res = axios.post(`${apiUrl}/get-availability`, payload);
	return res;

}
