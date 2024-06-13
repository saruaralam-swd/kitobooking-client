// Payment Component
 /* import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useNavigation } from 'react-day-picker';
import { useLoaderData } from 'react-router-dom';
import Loader from '../../Shared/Loader/Loader';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const booking = useLoaderData();
  const { appointmentDate, price, slot, treatmentName } = booking;
  const navigation = useNavigation();

  if (navigation.status === 'loading') {
    return <Loader></Loader>
  }

  return (
    <div>
      <h2 className='text-2xl '>Payment for <strong>{treatmentName}</strong></h2>
      <p>Please pay <strong>${price}</strong> for your appointment on {appointmentDate} at {slot}</p>
      <div className='w-96 my-12'>
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment; */

// -----------------


/* 

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ booking }) => {
  const { price, patient, email, _id } = booking;
  const [cardError, setCardError] = useState('');
  const [success, setSuccess] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    fetch("https://used-products-resale-server.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log(error)
      setCardError(error.message)
    }
    else {
      setCardError("");
    }

    setSuccess('');
    setProcessing(true);

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: patient,
            email: email,
          }
        }
      }
    );

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {

      // store payment info in the database
      const payment = {
        price,
        transactionId: paymentIntent.id,
        email,
        bookingId: _id
      };

      fetch('https://used-products-resale-server.vercel.app/payments', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(payment)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setSuccess('Congrats! your payment complete')
          setTransactionId(paymentIntent.id);
        })
    }

    setProcessing(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className='btn btn-sm mt-4 btn-primary' type="submit" disabled={!stripe || !clientSecret || processing}>
          Pay
        </button>
      </form>
      <p className="text-red-500">{cardError}</p>
      {
        success && <div>
          <p className="text-green-500">{success}</p>
          <p>Your TransactionId: <span className='font-bold'>{transactionId}</span></p>
        </div>
      }
    </>
  );
};

export default CheckoutForm;*/
