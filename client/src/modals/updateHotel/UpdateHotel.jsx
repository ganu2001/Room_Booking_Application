import { Modal, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import { DynamicInputComponent } from '../../components/reusableComponents/dynamicInputComponent/DynamicInputComponent'
import styles from './UpdateHotel.module.css'
import { CustomButton } from '../../components/reusableComponents/customButton/CustomButton'

export const UpdateHotel = ({isOpen, setIsOpen, hotelData}) => {
	
	const [updatFormData, setUpdateFormData] = useState()
	
	const handleCancel = () => {
		setIsOpen(false)
		setUpdateFormData(null);
	}

	const handleUpdate = () => {
		console.log("updated data", updatFormData);
	}

	useEffect(() => {
		if(isOpen) {
			setUpdateFormData(hotelData);
		}
	}, [isOpen])

	return (
	<Modal
		title={<span style={{ color: 'black', fontWeight: '500', fontSize: '20px' }}>Update Hotel</span>}
		open={isOpen}
		onCancel={handleCancel}
		width={'70%'}
		footer={null}
	>
		<div className={styles.formContainer}>
			<div>Name: </div>
			<div> <DynamicInputComponent inputValue={updatFormData?.name} onInputChange={(e) => setUpdateFormData({...updatFormData, name: e.target.value})}  /></div>
			<div>Address</div>
			<div><DynamicInputComponent inputValue={updatFormData?.address} onInputChange={(e) => setUpdateFormData({...updatFormData, address: e.target.value})}  /></div>
			<div>City</div>
			<div><DynamicInputComponent inputValue={updatFormData?.city} onInputChange={(e) => setUpdateFormData({...updatFormData, city: e.target.value})}  /></div>
			<div>State</div>
			<div><DynamicInputComponent inputValue={updatFormData?.state} onInputChange={(e) => setUpdateFormData({...updatFormData, state: e.target.value})}  /></div>
			<div>Mobile</div>
			<div><DynamicInputComponent inputValue={updatFormData?.mobile} onInputChange={(e) => setUpdateFormData({...updatFormData, mobile: e.target.value})}  /></div>
			<div>AC Room</div>
			<div><DynamicInputComponent inputType='number' inputValue={updatFormData?.ac_rooms} onInputChange={(e) => setUpdateFormData({...updatFormData, ac_rooms: parseInt(e.target.value)})}  /></div>
			<div>NonAc Room</div>
			<div><DynamicInputComponent inputType='number' inputValue={updatFormData?.non_ac_rooms} onInputChange={(e) => setUpdateFormData({...updatFormData, non_ac_rooms: parseInt(e.target.value)})}  /></div>	
			<div>NonAc Room Price</div>
			<div><DynamicInputComponent inputType='number' inputValue={updatFormData?.non_ac_room_price} onInputChange={(e) => setUpdateFormData({...updatFormData, non_ac_room_price: parseInt(e.target.value)})}  /></div>	
			<div>AC Room Price</div>
			<div><DynamicInputComponent inputType='number' inputValue={updatFormData?.ac_room_price} onInputChange={(e) => setUpdateFormData({...updatFormData, ac_room_price: parseInt(e.target.value)})}  /></div>	
			
			<div className={styles.buttonParent}>
			<div>Banquet Hall Aavailable</div>	
			<div><Switch checked={updatFormData?.banquet_hall_available} onChange={(value) => setUpdateFormData({...updatFormData, banquet_hall_available:value })} /></div>
			</div>

			<div className={styles.popupFooter}>
				<CustomButton text='Cancel' onClick={handleCancel} />
				<CustomButton text='Update' isFilled={true} onClick={handleUpdate} />
			</div>
		</div>

	</Modal>
	)
}
