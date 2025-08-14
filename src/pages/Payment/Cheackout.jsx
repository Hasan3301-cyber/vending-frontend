import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/Hook/useAxiosSecure";
import useCart from "../../hooks/Hook/useCart";
import useAuth from "../../hooks/Hook/useAuth";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [cart, refetch] = useCart(); 
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Error creating payment intent:", err);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
    } else if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      setError("");

      const payment = {
        email: user.email,
        price: totalPrice,
        date: new Date(),
        cartId: cart.map(item => item._id),
        title: cart.map(item => item.title),
        status: 'Pending',
        transactionId: paymentIntent.id,
      };

      try {
        const res = await axiosSecure.post('/payments', payment);
        console.log("Payment saved:", res.data);
        refetch(); 
      } catch (err) {
        console.error("Failed to save payment:", err);
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
        className="p-4 border border-gray-300 rounded"
      />

      {error && <p className="text-red-500">{error}</p>}
      {transactionId && (
        <p className="text-green-600">Payment successful! Transaction ID: {transactionId}</p>
      )}

      <button
        type="submit"
        disabled={!stripe || processing || !clientSecret}
        className="btn btn-primary w-full"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default Checkout;
