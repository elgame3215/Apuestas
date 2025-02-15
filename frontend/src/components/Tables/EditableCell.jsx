import { useContext, useEffect, useRef, useState } from 'react';
import { EditableContext } from './Context.js';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import React from 'react';
import { COLORS } from '../../constants/colors.js';

export const EditableCell = ({
	title,
	editable,
	children,
	dataIndex,
	record,
	handleSave,
	...restProps
}) => {
	const [editing, setEditing] = useState(false);
	const inputRef = useRef(null);
	const form = useContext(EditableContext);
	useEffect(() => {
		if (editing) {
			inputRef.current?.focus();
		}
	}, [editing]);
	const toggleEdit = () => {
		setEditing(!editing);
		form.setFieldsValue({
			[dataIndex]: record[dataIndex],
		});
	};
	const save = async () => {
		try {
			const values = await form.validateFields();
			let prevUsername;
			if (title.toLowerCase() === 'cuenta') {
				prevUsername = children[1];
			}
			toggleEdit();
			handleSave({
				...record,
				...values,
				prevUsername,
			});
		} catch (errInfo) {
			console.log('Save failed:', errInfo);
		}
	};
	let childNode = children;
	if (editable) {
		childNode = editing ? (
			<Form.Item
				style={{
					margin: 0,
				}}
				name={dataIndex}
				rules={[
					{
						required: true,
						message: `${title} is required.`,
					},
				]}
			>
				<Input
					ref={inputRef}
					onPressEnter={save}
					style={{ backgroundColor: COLORS.GREY, borderColor: COLORS.GREEN }}
					onBlur={save}
				/>
			</Form.Item>
		) : (
			<div
				className="editable-cell-value-wrap"
				style={{
					paddingInlineEnd: 24,
				}}
				onClick={toggleEdit}
			>
				{children}
			</div>
		);
	}
	return <td {...restProps}>{childNode}</td>;
};
