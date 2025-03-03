import { Modal } from 'antd';
import React from 'react'
import { CustomButton } from '../../components/reusableComponents/customButton/CustomButton';
import styles from './DeleteHotelConfirmationModal.module.css'
import { deleteHotel } from '../../services/api';
import { toast } from 'react-toastify';

export const DeleteHotelConfirmationModal = ({isOpen, setIsOpen, hotelData, getHostelList}) => {
	
	const handleCancel = () => {
		setIsOpen(false);
	}

	const handleDelete = async () => {
		try {
			const res = await deleteHotel(hotelData._id);
			toast.success(res.data.message)
			await getHostelList();
			handleCancel();
		} catch (err) {
			console.error(err);
			toast.error(err.resposne.data.message)
		}
 	}

	return (
		<Modal
			title={<span style={{ color: 'black', fontWeight: '500', fontSize: '20px' }}>Confirm Delete</span>}
			open={isOpen}
			onCancel={handleCancel}
			width={'70%'}
			footer={null}
		>
			<div>
				Do you want to delete hotel? 
			</div>
			<div className={styles.buttonscontainer}>
				<CustomButton text='Cancel' onClick={handleCancel} />
				<CustomButton text='Delete' isFilled={true} onClick={handleDelete} />
			</div>
		</Modal>
	)
}
