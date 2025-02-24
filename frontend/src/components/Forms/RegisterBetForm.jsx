import React, { useState } from 'react';
import { COLORS } from '../../constants/colors.js';
import { useAccounts } from '../../hooks/useAccounts.js';
import Radio from 'antd/es/radio';
import Button from 'antd/es/button';
import Form from 'antd/es/form';
import { SingleBetForm } from './SingleBetForm.jsx';
import { DoubleBetForm } from './DoubleBetForm.jsx';
import { toastifyError } from '../../toastify/error.js';
import { useBets } from '../../hooks/useBets.js';
import { useNavigate } from 'react-router-dom';
import Checkbox from 'antd/es/checkbox';

const inputStyle = {
	backgroundColor: COLORS.GREY,
	borderColor: COLORS.GREEN,
	maxwidth: '80%',
};
const itemStyle = 'max-w-[80%]';

export function RegisterBetForm() {
	const navigate = useNavigate();
	const { accounts } = useAccounts({});
	const { registerBet } = useBets();
	const [betType, setBetType] = useState('single');
	const onFormLayoutChange = ({ betType }) => {
		if (betType) {
			setBetType(betType);
		}
	};

	function onfinish(values) {
		console.log({ values });
		if (values.oppositeBet) {
			values.oppositeBet.group = values.group;
		}
		try {
			registerBet(values);
			setTimeout(() => {
				navigate('/bets');
			}, 500);
		} catch (error) {
			toastifyError({ message: 'Error al registrar la apuesta' });
		}
	}

	function onFinishFailed({ errorFields }) {
		toastifyError({ message: errorFields[0].errors[0] });
	}

	return (
		<Form
			labelCol={{
				span: 20,
			}}
			layout="vertical"
			initialValues={{
				size: 'small',
			}}
			onValuesChange={onFormLayoutChange}
			style={{
				maxWidth: '90%',
				color: COLORS.WHITE,
			}}
			autoComplete="off"
			onFinish={onfinish}
			onFinishFailed={onFinishFailed}
			className="min-h-[75vh] flex flex-col justify-evenly items-center bg-bg-even p-4"
		>
			<Form.Item
				className="flex justify-center"
				style={{ marginTop: '5%' }}
				name="betType"
				initialValue="single"
			>
				<Radio.Group>
					<Radio.Button style={inputStyle} value="single">
						Simple
					</Radio.Button>
					<Radio.Button style={inputStyle} value="double">
						Doble
					</Radio.Button>
				</Radio.Group>
			</Form.Item>
			<Form.Item name="isFreeBet" valuePropName='checked' initialValue={false}>
				<Checkbox name="isFreeBet" value={true}>
					Apuesta gratis
				</Checkbox>
			</Form.Item>
			{betType === 'single' ? (
				<SingleBetForm
					accounts={accounts}
					inputStyle={inputStyle}
					itemStyle={itemStyle}
				></SingleBetForm>
			) : (
				<DoubleBetForm
					accounts={accounts}
					inputStyle={inputStyle}
					itemStyle={itemStyle}
				></DoubleBetForm>
			)}

			<Form.Item>
				<Button
					htmlType="submit"
					size="large"
					type="primary"
					style={inputStyle}
				>
					Confirmar
				</Button>
			</Form.Item>
		</Form>
	);
}
