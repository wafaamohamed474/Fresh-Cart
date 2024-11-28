import React from 'react'
import Payment from '../../components/payment/Payment'
import { useParams } from 'react-router-dom'

const OnlinePayment = ( ) => {
const {OrderID} = useParams()
  const url =`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${OrderID}`
  const img = `https://e-commerce-website-angular-tau.vercel.app/assets/address.svg`
  return (
    <>
    <Payment type="online" url={url} img={img}/>
      
    </>
  )
}

export default OnlinePayment
