import React from 'react'
import Checkbox from 'antd/es/checkbox'
import Form from 'antd/es/form'
import Input from 'antd/es/input'

/**
 *
 * @param {Object} props
 * @param {any} props.inputStyle
 * @param {any} props.itemStyle
 * @param {any} props.accounts
 * @param {boolean} [props.isOppositeBet]
 * @returns
 */
export function SingleBetForm ({
  inputStyle,
  itemStyle,
  accounts,
  isOppositeBet
}) {
  function parseName (name) {
    if (isOppositeBet) {
      return ['oppositeBet', name]
    }
    return name
  }

  return (
    <>
      <Form.Item
        name={parseName('description')}
        className={itemStyle}
        label='Descripción'
        rules={[{ required: true, message: 'Descripción requerida' }]}
      >
        <Input style={inputStyle} />
      </Form.Item>
      <Form.Item
        name={parseName('amount')}
        className={itemStyle}
        label='Monto'
        rules={[
				  { required: true, message: 'Monto requerido' },
				  { min: 1, message: 'Monto debe ser mayor a 0' }
        ]}
      >
        <Input type='number' style={inputStyle} />
      </Form.Item>
      <Form.Item
        name={parseName('odds')}
        className={itemStyle}
        vertical
        label='Cuota'
        rules={[
				  { required: true, message: 'Cuota requerida' },
				  { min: 1, message: 'Cuota debe ser mayor a 1' }
        ]}
      >
        <Input type='number' style={inputStyle} />
      </Form.Item>
      <Form.Item
        name={parseName('accounts')}
        className={itemStyle}
        label='Cuentas'
        style={{ maxWidth: '56%' }}
      >
        <Checkbox.Group className='flex gap-2 flex-wrap max-w-[70%]'>
          {accounts
					  ? accounts.map(account => {
					    return (
  <Checkbox key={account.id} value={account.id}>
    {account.username}
  </Checkbox>
					    )
					  })
					  : null}
        </Checkbox.Group>
      </Form.Item>
    </>
  )
}
