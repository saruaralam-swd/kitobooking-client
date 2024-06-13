
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CheckoutForm = ({ order }) => {
  const { price, email, _id, name, productId } = order;
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
            name: name,
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
      // payment information
      const payment = {
        price,
        transactionId: paymentIntent.id,
        email,
        orderId: _id
      };

      // store payment information
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

          // order paid: true
          fetch(`https://used-products-resale-server.vercel.app/orderPaid/${_id}`, {
            method: 'PUT',
            headers: {
              authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
          })
            .then(res => res.json())
            .then(data => {
              if (data.acknowledged) {

                // product available:false (sold)
                fetch(`https://used-products-resale-server.vercel.app/productSold/${productId}`, {
                  method: 'PUT',
                  headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                  }
                })
                  .then(res => res.json())
                  .then(data => {
                    if (data.acknowledged) {
                      setSuccess('Payment Complete!')
                      setTransactionId(paymentIntent.id);
                      setProcessing(false)
                      toast.success("Payment Complete")
                    }
                  })
              }
            })
        })
    }


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
          <p>TransactionId: <span className='font-bold'>{transactionId}</span></p>
        </div>
      }
    </>
  );
};

export default CheckoutForm;