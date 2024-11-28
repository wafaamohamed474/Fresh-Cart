import React from 'react'
import Payment from '../../components/payment/Payment'
import { useParams } from 'react-router-dom'

const CashPayment = () => {
  const {CartID} = useParams()
  const img =`https://e-commerce-website-angular-tau.vercel.app/assets/best-practices-for-managing-cash-on-delivery.webp`
  const url = `https://ecommerce.routemisr.com/api/v1/orders/${CartID}`
  return (
    <>
      <Payment  type="cash" url={url} img={img}/>
    </>
  )
}

export default CashPayment
