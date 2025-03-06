import React from 'react'
import { NavButton } from '../UI/NavButton.jsx'

/**
 * @typedef {Object} ButtonData
 * @property {string} text - Texto del botón.
 * @property {string} href - Enlace del botón.
 */

/**
 * @typedef {Object} VerticalNavBarProps
 * @property {ButtonData[]} buttons - Lista de botones.
 */

/**
 * @param {VerticalNavBarProps} props - Propiedades del componente.
 */
export function VerticalNavBar ({ buttons }) {
  return (
    <nav
      className='flex justify-center gap-y-5 flex-col shadow-[1px_2px_4px_#141414,_0_4px_12px_#0a0a0a] shadow-black p-3 min-w-fit'
      id='nav'
    >
      {buttons.map(button => (
        <NavButton
          leftBorder
          text={button.text}
          href={button.href}
          key={button.text}
        />
      ))}
    </nav>
  )
}
