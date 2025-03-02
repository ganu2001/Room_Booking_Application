import axios from 'axios';
import Cookies from 'js-cookie';


// const apiUrl = "http://127.0.0.1:5500/api";
const apiUrl = "http://192.168.150.231:5500/api";


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