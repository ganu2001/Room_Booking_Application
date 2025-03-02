import React, { useEffect, useState } from 'react'
import styles from './HomePage.module.css'
import { getHotelsList } from '../../services/api';

export const HomePage = () => {

	const [hotelData, setHotelData] = useState([]);

	const getHostelList = async() => {
		try {
			const res = await getHotelsList();
			setHotelData(res.data.result);
		} catch (err) {
			console.error(err);
		}
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
					<div><img src={hotel?.hotel_images[0]} alt="image" className={styles.hotelBannerImg} /></div>
					<div>{hotel?.name}</div>
				</div>
			))}
		</div>

	</div>
	)
}
