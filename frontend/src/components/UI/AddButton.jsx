import Button from 'antd/es/button'
import { COLORS } from '../../constants/colors.js'
import React from 'react'

export function AddButton ({ handleClick, text }) {
  return (
    <Button
      onClick={handleClick}
      type='primary'
      style={{
			  marginBottom: 16,
			  backgroundColor: COLORS.BACKGROUND,
			  color: COLORS.GREEN,
			  border: `.05rem solid ${COLORS.GREEN}`
      }}
    >
      {text}
    </Button>
  )
}
