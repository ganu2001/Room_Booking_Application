import { Modal } from 'antd'
import styles from './HotelBookModal.module.css'
import React, { useEffect } from 'react'
import { CustomButton } from '../../components/reusableComponents/customButton/CustomButton'
import { calculateAdvance, calculateCheckout, calculateTax, calculateTotal } from '../../utils/helperFunctions'
import { BookingConfirmModal } from '../bookingConfirmModal/BookingConfirmModal'

export const HotelBookModal = ({isOpen, setIsOpen, hotelAvailableData, hotelData, availabilityInputData, setBookingConfirmOpen}) => {

	const handleCancel = () => {
		setIsOpen(false)
	}


	useEffect(() => {
		if (isOpen) {
			console.log(hotelAvailableData,'--',hotelData,'---', availabilityInputData, 'data')
		}
	}, [isOpen])

  return (
	<Modal
		title={<span style={{ color: 'black', fontWeight: '500', fontSize: '20px' }}>Get availability and Book</span>}
		open={isOpen}
		onCancel={handleCancel}
		width={'40%'}
		footer={null}
	>
		<div>
		{hotelAvailableData?.isCompleteAvailable == true ?
			<>
				<div className={styles.bookingSummary}>
					<div>
						<b>Rooms available for specified dates</b>
					</div>
					<div style={{margin: "5px 0px"}}>
						<h3>Booking Summary</h3>
						{/* <div> {hotelData.name}</div> */}
						<div className={styles.summaryContainer}>
							<div className={styles.summaryTab}>
									<div className={styles.summaryContent}>
										No of {availabilityInputData.isRoomTypeAC  ? "AC" : "Non-AC"} rooms :
									</div>
									<div className={styles.summaryContent} style={{textAlign:'right'}}>
									  	{availabilityInputData.roomCount}
									</div>
							</div>
							<div className={styles.summaryTab}>
									<div className={styles.summaryContent}>
										Total Price :
									</div>
									<div className={styles.summaryContent} style={{textAlign:'right'}}>
									  	{availabilityInputData.isRoomTypeAC ? (availabilityInputData.roomCount * hotelData.ac_room_price * hotelAvailableData.availableDates.length): (availabilityInputData.roomCount * hotelData.non_ac_room_price * hotelAvailableData.availableDates.length)}
									</div>
							</div>
							<div className={styles.summaryTab}>
									<div className={styles.summaryContent}>
										Taxes & other charges
									</div>
									<div className={styles.summaryContent} style={{textAlign:'right'}}>
									  	{availabilityInputData.isRoomTypeAC ? calculateTax(availabilityInputData.roomCount * hotelData.ac_room_price * hotelAvailableData.availableDates.length): calculateTax(availabilityInputData.roomCount * hotelData.non_ac_room_price * hotelAvailableData.availableDates.length)}
									</div>
							</div>
							<hr />
							<div className={styles.summaryTab}>
									<div className={styles.summaryContent}>
										Sub Total : 
									</div>
									<div className={styles.summaryContent} style={{textAlign:'right'}}>
									  	{availabilityInputData.isRoomTypeAC ? calculateTotal(availabilityInputData.roomCount * hotelData.ac_room_price * hotelAvailableData.availableDates.length): calculateTotal(availabilityInputData.roomCount * hotelData.non_ac_room_price * hotelAvailableData.availableDates.length)}
									</div>
							</div>
							<hr />			
							<div className={styles.summaryTab}>
									<div className={styles.summaryContent}>
										Total Paylable Now : 
									</div>
									<div className={styles.summaryContent} style={{textAlign:'right'}}>
									  	{availabilityInputData.isRoomTypeAC ? calculateAdvance(availabilityInputData.roomCount * hotelData.ac_room_price * hotelAvailableData.availableDates.length): calculateAdvance(availabilityInputData.roomCount * hotelData.non_ac_room_price * hotelAvailableData.availableDates.length)}
									</div>
							</div>

							<div className={styles.summaryTab}>
									<div className={styles.summaryContent}>
										Total Paylable at hotel : 
									</div>
									<div className={styles.summaryContent} style={{textAlign:'right'}}>
									  	{availabilityInputData.isRoomTypeAC ? calculateCheckout(availabilityInputData.roomCount * hotelData.ac_room_price * hotelAvailableData.availableDates.length): calculateCheckout(availabilityInputData.roomCount * hotelData.non_ac_room_price * hotelAvailableData.availableDates.length)}
									</div>
							</div>
						</div>
					</div>
					
				</div>
			</>
			:
			<>
				Rooms not available for specified dates

				<div className={styles.tableContainer}>
					<table className={styles.table}>
						<thead>
							<th className={styles.th}>Date</th>
							<th className={styles.th}>No of rooms available</th>
							<th className={styles.th}>Required rooms available </th>
						</thead>
						<tbody>
							{hotelAvailableData?.availableDates.map((row) => (
								<tr>
									<td className={styles.td}>{row.date}</td>
									<td className={styles.td}>{row.availableRooms}</td>
									<td className={styles.td}>{row.available ? <>available</> : <>not available</>}</td>
								</tr>	
							))}
						</tbody>
					</table>					
				</div>
			
			</> 
		}
		</div>



		<div className={styles.modlaFooter}>
			{hotelAvailableData?.isCompleteAvailable == true ? 
			<>
				<CustomButton text='Cancel' onClick={handleCancel} /> 
				<CustomButton text='Book' isFilled={true} onClick={() => {setIsOpen(false); setBookingConfirmOpen(true)}}  /> 
			</>
			:
			<>
				<CustomButton text='Close' onClick={handleCancel} /> 
			</>
			}
		</div>

		
	</Modal>
  )
}
