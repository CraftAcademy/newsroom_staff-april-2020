import React, { useState } from 'react'
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from 'react-stripe-elements'
import axios from 'axios'

const CreateSubscription = props => {
  const [subscriberStatus, setSubscriberStatus] = useState(false)
  const [subscriptionMessage, setSubscriptionMessage] = useState("")
  const headers = JSON.parse(localStorage.getItem('J-tockAuth-Storage'))

  const submitPayment = async () => {
    const stripeResponse = await props.stripe.createToken()
    try {
      const paymentStatus = await axios.post(
        "/subscriptions",
        { stripeToken: stripeResponse.token.id },
        { headers: headers }
      )
      if (paymentStatus.status === 200) {
        setSubscriberStatus(true)
        setSubscriptionMessage(paymentStatus.data.message)
      }
    } catch (error) {
      debugger
    }

  }
  return (
    <>
      {subscriberStatus ?
        <h1 id="subscription-message">{subscriptionMessage}</h1>
        :
        <div id="payment-interface">
          <label htmlFor="cardnumber">Card number</label>
          <CardNumberElement id="cardnumber" />
          <label htmlFor="exp-date">Expiry Date</label>
          <CardExpiryElement id="exp-date" />
          <label htmlFor="cvc">CVC</label>
          <CardCVCElement id="cvc" />
          <button
            onClick={ submitPayment }
          >Submit</button>
        </div >
      }

    </>
  )
}

export default injectStripe(CreateSubscription)
