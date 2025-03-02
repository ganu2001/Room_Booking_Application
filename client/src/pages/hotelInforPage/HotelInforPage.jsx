import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getHotelInfo } from '../../services/api';
import styles from './HotelInforPage.module.css'
import { Carousel } from 'antd';

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
	<div className={styles.infoPageContainer}>
		<div className={styles.infoPage}>
			<div className={styles.hotelName}>	
				{hotelData?.name}
			</div>
			<div className={styles.hotelAddress}>	
				{hotelData?.address}
			</div>
			<div className={styles.hotelCityState}>	
				{hotelData?.city}, {hotelData?.state}
			</div>
			
			<div className={styles.imageCarouselContainer}>
				<Carousel className={styles.imageCarousel} arrows infinite={true}>
					{
						hotelData?.hotel_images.length > 0 && 
						<div className={styles.imageContainer}>
								<img src={hotelData?.hotel_images[0]} alt={hotelData?.name} className={styles.carouselImg} />
						</div>
					}
					{
						hotelData?.hotel_images.length > 1 && 
						<div className={styles.imageContainer}>
								<img src={hotelData?.hotel_images[1]} alt={hotelData?.name} className={styles.carouselImg} />
						</div>
					}
					{
						hotelData?.hotel_images.length > 2 && 
						<div className={styles.imageContainer}>
								<img src={hotelData?.hotel_images[2]} alt={hotelData?.name} className={styles.carouselImg} />
						</div>
					}
					{
						hotelData?.hotel_images.length > 3 && 
						<div className={styles.imageContainer}>
								<img src={hotelData?.hotel_images[3]} alt={hotelData?.name} className={styles.carouselImg} />
						</div>
					}
					{
						hotelData?.hotel_images.length > 4 && 
						<div className={styles.imageContainer}>
								<img src={hotelData?.hotel_images[4]} alt={hotelData?.name} className={styles.carouselImg} />
						</div>
					}
					{
						hotelData?.hotel_images.length > 5 && 
						<div className={styles.imageContainer}>
								<img src={hotelData?.hotel_images[5]} alt={hotelData?.name} className={styles.carouselImg} />
						</div>
					}
					{
						hotelData?.hotel_images.length > 6 && 
						<div className={styles.imageContainer}>
								<img src={hotelData?.hotel_images[6]} alt={hotelData?.name} className={styles.carouselImg} />
						</div>
					}
				</Carousel>
			</div>


		</div>
	</div>
  )
}
