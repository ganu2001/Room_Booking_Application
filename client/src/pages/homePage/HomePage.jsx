import React, { useEffect, useState } from 'react'
import styles from './HomePage.module.css'
import { getHotelsList } from '../../services/api';
import { IoLocationOutline } from "react-icons/io5";
import {CustomButton} from '../../components/reusableComponents/customButton/CustomButton';
import { useNavigate } from 'react-router';

export const HomePage = () => {

	const [hotelData, setHotelData] = useState([]);
	const navigate = useNavigate();

	const getHostelList = async() => {
		try {
			const res = await getHotelsList();
			setHotelData(res.data.result);
		} catch (err) {
			console.error(err);
		}
	}

	const handleViewHotel = (hotelId) => {
		navigate(`/hotel/${hotelId}`)
	}

	useEffect(() => {
		getHostelList();
	}, [])

	return (
	<div className={styles.homePageContainer}>
		<div className={styles.searchContainer}>
			<input type="text" placeholder='Search' className={styles.serachInput}  />
		</div>

		<div className={styles.hotelListContainer}>
			{hotelData?.map((hotel) => (
				<div className={styles.hotelDataContainer}>
					<div className={styles.bannerImgContainer}><img src={hotel?.hotel_images[0]} alt="image" className={styles.hotelBannerImg} /></div>
					<div className={styles.hotelInfoContainer}>
						<div className={`${styles.hotelName} ${styles.infodiv}`} onClick={() => handleViewHotel(hotel._id)}>{hotel?.name}</div>
						<div className={`${styles.hotelAddress} ${styles.infodiv}`}>
							<IoLocationOutline style={{color: 'black'}}/>
							{hotel?.address}
						</div>
						<div className={`${styles.hotelCity} ${styles.infodiv}`}>{hotel?.city}</div>
						<div className={`${styles.hotelPrice} ${styles.infodiv}`}>Prices starting from {hotel?.non_ac_room_price ? hotel?.non_ac_room_price : hotel?.ac_room_price}</div>
						<div className={`${styles.availabilityBtn} ${styles.infodiv}`}><CustomButton text='Check availability' onClick={() => handleViewHotel(hotel?._id)} /></div>
					</div>
				</div>
			))}
		</div>

	</div>
	)
}
