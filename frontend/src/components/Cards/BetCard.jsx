import React, { useState } from 'react'
import DislikeOutlined from '@ant-design/icons/DislikeOutlined.js'
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled.js'
import LikeOutlined from '@ant-design/icons/LikeOutlined.js'
import Card from 'antd/es/card'
import { useBets } from '../../hooks/useBets.js'
import { formatToCurrency } from '../Tables/utils.js'
import { COLORS } from '../../constants/colors.js'
import { toastifyError } from '../../toastify/error.js'

export function BetCard ({
  group,
  description,
  accounts,
  amount,
  odds,
  oppositeBet,
  betID,
  pay
}) {
  const [activeTabKey, setActiveTabKey] = useState(betID)
  const [betStatus, setBetStatus] = useState('active')
  const { resolveBet, cancelBet } = useBets()

  if (betStatus !== 'active') {
    return null
  }

  const handleResolve =
    ({ betResult }) =>
      () => {
        try {
          resolveBet(activeTabKey, { betResult })
          setBetStatus(betResult)
        } catch (error) {
          toastifyError({ message: 'Error al resolver la apuesta' })
        }
      }
  const handleCancel = () => {
    try {
      cancelBet(activeTabKey)
      setBetStatus('cancelled')
    } catch (error) {
      toastifyError({ message: 'Error al cancelar la apuesta' })
    }
  }

  const onTabChange = (key) => {
    setActiveTabKey(key)
    console.log({ tabContent })
  }

  const titleNode = group ?? description

  function descriptionNode ({ accounts, amount, odds, pay }) {
    console.log({ pay })
    return (
      <ul>
        <li>
          cuentas: {accounts.map((account) => account.username).join(', ')}
        </li>
        <li>monto: {formatToCurrency(amount)}</li>
        <li>cuota: {odds}</li>
        <li>paga: {formatToCurrency(pay)}</li>
      </ul>
    )
  }

  const tabContent = oppositeBet
    ? {
        [betID]: descriptionNode({ accounts, amount, odds, pay }),
        [oppositeBet.id]: descriptionNode(oppositeBet)
      }
    : null

  const tabList = oppositeBet
    ? [
        {
          key: betID,
          label: description
        },
        {
          key: oppositeBet.id,
          label: oppositeBet.description
        }
      ]
    : null

  const actions = [
    <LikeOutlined
      key='won'
      style={{ color: COLORS.GREEN }}
      onClick={handleResolve({ betResult: 'won' })}
    />,
    <DislikeOutlined
      key='lost'
      style={{ color: COLORS.RED }}
      onClick={handleResolve({ betResult: 'lost' })}
    />,
    <CloseCircleFilled
      key='cancel'
      style={{ color: COLORS.LIGHTGREY }}
      onClick={handleCancel}
    />
  ]
  if (group && oppositeBet) {
    return (
      <Card
        title={titleNode}
        style={{
          width: 300
        }}
        actions={actions}
        tabList={tabList}
        onTabChange={onTabChange}
        tabProps={{
          size: 'small',
          style: { marginBottom: 0 },
          centered: true,
          tabBarGutter: 30
        }}
      >
        {tabContent[activeTabKey]}
      </Card>
    )
  }

  if (!group) {
    return (
      <Card
        title={titleNode}
        style={{
          width: 300
        }}
        actions={actions}
      >
        {descriptionNode({ accounts, amount, odds, pay })}
      </Card>
    )
  }
}
