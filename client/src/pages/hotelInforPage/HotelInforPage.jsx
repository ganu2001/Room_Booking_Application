import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getAvailability, getHotelInfo, updateHotelData } from '../../services/api';
import styles from './HotelInforPage.module.css'
import { Carousel, Switch } from 'antd';
import { DynamicInputComponent } from '../../components/reusableComponents/dynamicInputComponent/DynamicInputComponent';
import { CustomButton } from '../../components/reusableComponents/customButton/CustomButton';
import { toast } from 'react-toastify';

export const HotelInforPage = () => {
	const [hotelData, setHotelData] = useState(null)
	const {hotelId} = useParams();
	const [availabilityInputData, setAvailabilityInputData] = useState({
		checkInDateValue: "",
		checkInDateString: "",
		checkOutDateValue: "",
		checkOutDateString: "",
		isRoomTypeAC: false,
		roomCount:0
	})
	const [hotelAvailableData, setHotelAvailableData] = useState({
		isCompleteAvailable : false,
		availableDates: []
	})

	const getCurrentHotelInfo = async (hotelId) => {
		try {
			const res = await getHotelInfo(hotelId);
			setHotelData(res.data.result);
		} catch (err) {
			console.error(err);
			toast.error(err.response.data.message);
		}

	} 
	
	const handleCheckInChange = (date, dateString) => {
		setAvailabilityInputData({
			...availabilityInputData,
			checkInDateValue: date,
			checkInDateString: dateString
		})
	}

	const handleCheckOutChange = (date, dateString) => {
		setAvailabilityInputData({
			...availabilityInputData,
			checkOutDateValue: date,
			checkOutDateString: dateString
		})
	}
	
	const handleValueChnage = (type) => {
		if(type === "add") {
			const count = availabilityInputData.roomCount;
			setAvailabilityInputData({
				...availabilityInputData,
				roomCount: count + 1,
			})
		} else {
			const count = availabilityInputData.roomCount;
			setAvailabilityInputData({
				...availabilityInputData,
				roomCount: count - 1,
			})
		}
	}

	const handleCheckAvailability = async() => {
		try {
			const res = await getAvailability(availabilityInputData, hotelId);
			const availabilityData = res?.data?.result;

			const completAvailable = availabilityData && availabilityData.every(el => el.available);
			const availableDates = availabilityData && availabilityData.filter(el => el.available);

			setHotelAvailableData({
				isCompleteAvailable : completAvailable,
				availableDates: availableDates
			})

			console.log(res, 'res check');
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


	useEffect(() => {
		console.log(hotelAvailableData, 'aaaaaa');
	}, [hotelAvailableData])


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

			<div className={styles.availabilityOptions}>
				<div>
					<DynamicInputComponent 
						inputType='date' 
						placeholder="Check In" 
						inputValue={availabilityInputData.checkInDateValue}
						onInputChange={handleCheckInChange}
					/>
				</div>
				<div>
					<DynamicInputComponent 
						inputType='date' 
						placeholder="Check Out"
						inputValue={availabilityInputData.checkOutDateValue}
						onInputChange={handleCheckOutChange}
					 />
				</div>
				<div>
					Non-AC <Switch checked={availabilityInputData.isRoomTypeAC} onChange={(value) => setAvailabilityInputData({...availabilityInputData, isRoomTypeAC : value})} /> AC
				</div>
				<div>
					<span onClick={() => handleValueChnage('add')}> + </span>
					<span> {availabilityInputData?.roomCount} </span>
					<span onClick={() => handleValueChnage('sub')}> - </span>
				</div>
				
			</div>

			<div className={styles.availabilityBtn}>
				<CustomButton text='Get Availability' isFilled={true} onClick={handleCheckAvailability} />
			</div>


		</div>
	</div>
  )
}
