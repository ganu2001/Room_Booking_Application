import { Modal } from 'antd';
import React from 'react'
import { CustomButton } from '../../components/reusableComponents/customButton/CustomButton';
import { bookHotel } from '../../services/api';
import { toast } from 'react-toastify';

export const BookingConfirmModal = ({isOpen, setIsOpen, hotelId, bookingData, advanceAmount}) => {
	
	const handleCancel = () => {
		setIsOpen(false);
	}
	const handleBook = async() => {
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
			Please confirm if you want to book the rooms for specified dates?

			<div style={{textAlign: "right"}}>
				<CustomButton text='Cancel' />
				<CustomButton text='Confirm' isFilled={true} onClick={handleBook} />
			</div>
			
		</Modal>
  )
}
