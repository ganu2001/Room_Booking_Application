import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getHotelInfo } from '../../services/api';

export const HotelInforPage = () => {
	const [hotelData, setHotelData] = useState(null)
	const {hotelId} = useParams();

	const getCurrentHotelInfo = async (hotelId) => {
		try {
			const res = await getHotelInfo(hotelId);
			setHotelData(res.data.result);
		} catch (err) {
			console.error(err);
			toast.error(err.response.data.message);
		}

	} 

	useEffect(() => {
		if(hotelId) {
			getCurrentHotelInfo(hotelId);
		}
	}, [hotelId])


	return (
	<div>
		{hotelData?.name}
	</div>
  )
}
