import { Flex, Modal } from 'antd';
import React from 'react'
import { CustomButton } from '../../components/reusableComponents/customButton/CustomButton';
import { bookHotel } from '../../services/api';
import { toast } from 'react-toastify';
import scannerIimage from '../../assets/QR_CODE.jpeg';


export const BookingConfirmModal = ({ isOpen, setIsOpen, hotelId, bookingData, advanceAmount }) => {

	const handleCancel = () => {
		setIsOpen(false);
	}
	const handleBook = async () => {
		const bookingDataPaylod = {
			"hotelId": hotelId,
			"roomType": bookingData.isRoomTypeAC ? "AC" : "Non-AC",
			"numberOfRooms": 1,
			"checkInDate": bookingData.checkInDateString,
			"checkOutDate": bookingData.checkOutDateString
		}

		try {
			const res = await bookHotel(bookingDataPaylod);
			toast.success(res.data.message)
			handleCancel()
		} catch (err) {
			console.error(err);
			toast.error(err.resposne.data.message)
		}

	}

	return (
		<Modal 
			title={<span style={{ color: 'black', fontWeight: '500', fontSize: '20px' }}>Confirm Booking</span>}
			open={isOpen}
			onCancel={handleCancel}
			width={'60%'}
			footer={null}
		>
			Please pay 4000 On Below Scanner for Booking Confirnation 
			<div className='scannerImg' style={{display:'Flex' , justifyContent:'center',alignItems:'center'}}>
				<img src={scannerIimage} style={{height:'200px'}} className="scannerImg" alt="Room Preview" />
			</div>
			<div style={{ textAlign: "right" }}>
				<CustomButton text='Cancel' />
				<CustomButton text='Confirm' isFilled={true} onClick={handleBook} />
			</div>

		</Modal>
	)
}
