import Form from 'antd/es/form'
import Input from 'antd/es/input'
import React from 'react'
import { SingleBetForm } from './SingleBetForm.jsx'

export function DoubleBetForm ({ inputStyle, itemStyle, accounts }) {
  return (
    <>
      <Form.Item
        name='group'
        className={itemStyle}
        label='Grupo'
        rules={[{ required: true, message: 'Grupo requerido' }]}
      >
        <Input style={inputStyle} />
      </Form.Item>
      <br />
      <h3 className='text-green'>Apuesta</h3>
      <br />
      <SingleBetForm
        inputStyle={inputStyle}
        itemStyle={itemStyle}
        accounts={accounts}
      />
      <br />
      <h3 className='text-green'>Apuesta cruzada</h3>
      <br />
      <SingleBetForm
        inputStyle={inputStyle}
        itemStyle={itemStyle}
        accounts={accounts}
        isOppositeBet
      />
    </>
  )
}
