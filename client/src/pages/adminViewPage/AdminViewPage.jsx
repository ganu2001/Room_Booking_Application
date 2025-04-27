import React, { useEffect, useState } from 'react'
import styles from './AdminViewPage.module.css'
import { getHotelsList } from '../../services/api';
import { IoLocationOutline } from 'react-icons/io5';
import { CustomButton } from '../../components/reusableComponents/customButton/CustomButton';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';
import { UpdateHotel } from '../../modals/updateHotel/UpdateHotel';
import { DeleteHotelConfirmationModal } from '../../modals/deleteHotelConfirmationModal/DeleteHotelConfirmationModal';

export const AdminViewPage = () => {
	const [hotelData, setHotelData] = useState([]);
	const [serachQuery, setSearchQuery] = useState("");
	const [particlarHotelData, setParticlarHotelData] = useState()
	const [updateHotelOpen, setUpdateHotelOpen] = useState(false)
	const [deleteHotelOpen, setDeleteHotelOpen] = useState(false)
	const navigate = useNavigate();

	const getHostelList = async(queryString) => {
		try {
			const res = await getHotelsList(queryString);
			setHotelData(res.data.result);
		} catch (err) {
			console.error(err);
		}
	}

	const handleHotelSearch = (e) => {
		setSearchQuery(e.target.value);
		getHostelList(e.target.value);
	} 

	const handleHotelUpdate = (hotel) => {
		setParticlarHotelData(hotel);
		setUpdateHotelOpen(true);
	}

	const hotelHotelDelete = (hotel) => {
		setParticlarHotelData(hotel);
		setDeleteHotelOpen(true);
	}

	useEffect(() => {
		console.log("called");
		if(Cookies.get("role") != "admin") {
			toast.info("Admin access required");
			navigate('/');
		}
		else {
			getHostelList();
		}
	}, [])

	return (
	<div className={styles.homePageContainer}>
		<div className={styles.searchContainer}>
			<input type="text" placeholder='Search' value={serachQuery} className={styles.serachInput} onChange={(e) => handleHotelSearch(e)}  />
		</div>

		<div className={styles.hotelListContainer}>
			{hotelData?.length <= 0 ? 
				<div style={{textAlign: "center"}}> 
					No Hotels Available
				</div>
				:
				<>
					{hotelData?.map((hotel) => (
						<div className={styles.hotelDataContainer}>
							<div className={styles.bannerImgContainer}><img src={hotel?.hotel_images[0]} alt="image" className={styles.hotelBannerImg} /></div>
							<div className={styles.hotelInfoContainer}>
								<div className={`${styles.hotelName} ${styles.infodiv}`} >{hotel?.name}</div>
								<div className={`${styles.hotelAddress} ${styles.infodiv}`}>
									<IoLocationOutline style={{color: 'black'}}/>
									{hotel?.address}
								</div>
								<div className={`${styles.hotelCity} ${styles.infodiv}`}>{hotel?.city}</div>
								<div className={`${styles.hotelPrice} ${styles.infodiv}`}>Prices starting from {hotel?.non_ac_room_price ? hotel?.non_ac_room_price : hotel?.ac_room_price}</div>
								<div className={`${styles.handlehotelDiv} ${styles.infodiv}`}>
									<CustomButton text='Update' onClick={() => handleHotelUpdate(hotel)} />
									<CustomButton text='Delete' isFilled={true} onClick={() => hotelHotelDelete(hotel)} />
								</div>
							</div>
						</div>
					))}
				</>
			}
		</div>

		<UpdateHotel
			isOpen={updateHotelOpen}
			setIsOpen={setUpdateHotelOpen}
			hotelData={particlarHotelData}
			getHostelList={getHostelList}
		/>

		<DeleteHotelConfirmationModal
			hotelData={particlarHotelData}
			getHostelList={getHostelList}
			isOpen={deleteHotelOpen}
			setIsOpen={setDeleteHotelOpen}
		/>

	</div>
  )
}
