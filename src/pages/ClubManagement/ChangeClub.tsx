
import React, { useState } from 'react';
import { Modal, Select, Button } from 'antd';

const { Option } = Select;

const ChangeClub = ({ visible, onClose, selectedMembers }) => {
	const [selectedClub, setSelectedClub] = useState(null);

	const handleChangeClub = () => {
		// Handle club change logic here
		console.log(`Changing club for ${selectedMembers.length} members to ${selectedClub}`);
		onClose();
	};

	return (
		<Modal
			title="Change Club"
			visible={visible}
			onCancel={onClose}
			onOk={handleChangeClub}
			okButtonProps={{ disabled: !selectedClub }}
		>
			<p>Changing club for {selectedMembers.length} members.</p>
			<Select
				placeholder="Select a club"
				style={{ width: '100%' }}
				onChange={(value) => setSelectedClub(value)}
			>
				<Option value="Club A">Club A</Option>
				<Option value="Club B">Club B</Option>
				<Option value="Club C">Club C</Option>
			</Select>
		</Modal>
	);
};

export default ChangeClub;