import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useCart from '../../../Hooks/useCart';
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const ChackoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState();
    const [transactionId, setTransactionId] = useState();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
       if(totalPrice > 0){
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
        .then(res => {
            console.log('api hitting');
            console.log(res);
            setClientSecret(res.data.clientSecret)
        })
       }
    }, [axiosSecure, totalPrice]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })

        if (error) {
            console.log('Payment error', error);
            setError(error.message)
        } else {
            console.log('payment method: ', paymentMethod);
            setError('')
        }

        //  confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymuos'
                }
            }
        });

        if (confirmError) {
            console.log(confirmError);
        }
        else {
            console.log('payment intent', paymentIntent);
            if(paymentIntent.status === "succeeded"){
                console.log('transaction id: ', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const paymentInfo = {
                    name: user?.displayName,
                    email: user?.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending',
                }
                const res = await axiosSecure.post('/payments', paymentInfo);
                console.log('payment save', res.data);
                if(res?.data?.deleteResult?.deletedCount > 0 && res?.data?.paymentResult?.insertedId){
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thanks for your payment",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate('/dashboard/paymentHistory')
                }
            }
        }
    }

    return (
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
            ></CardElement>
            <button disabled = {!stripe || !clientSecret} className="btn btn-sm btn-primary my-4" type="submit">Pay</button>
            <p className=" text-red-600">{error}</p>
            {
                transactionId && <p className=" text-green-600">Your transaction id : <span className=" text-black"> {transactionId}</span></p>
            }
        </form >
    );
};

export default ChackoutForm;