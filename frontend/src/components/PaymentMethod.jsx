import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
const stripe = await loadStripe(
    "pk_test_51Oktd0SFo6ikMNdBYu3icDP4fdkOtxImlSZMcqCnXsmRMG3lNy7lELJaRbfZIbkbeYCUccuWpcDt6IkMoAfj1D6r004Rsy2XI5"
  ); 

const CheckoutForm = () => {
    const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");



  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: name,
        email: email,
        address: {
          line1: address,
        },
      },
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);

      // Send paymentMethod.id to your server
      //use axios
    //   axios
    //     .post("http://localhost:8000/api/v1/payments/add-payment-method", {
    //       paymentMethodId: paymentMethod.id,
    //     }, { withCredentials: true })
    //     .then((response) => {
    //       if (response.status === 200) {
    //         console.log(response.data); // Should log "Payment method added successfully"
    //       } else {
    //         console.log("Failed to add payment method");
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });

//       axios.post('http://localhost:4000/update-payment-method', { customerId: 'cus_Pvby11RKwu2XPI', paymentMethodId: paymentMethod.id })
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });
    }
  };


  return (
    <div>
        <h1 className="text-white">Payment Method</h1>
        <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-blue-50 rounded-md"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name on card"
          className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md mb-4"
          required
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md mb-4"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          required
          className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md mb-4"
        />
        <CardElement className="mt-4 w-full py-3 px-4 border border-gray-300 rounded-md mb-4 bg-white" />
        <button
          type="submit"
          disabled={!stripe}
          className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Add Card
        </button>
      </form>
    </div>
  )
}

const PaymentMethod = () => {
    // const [stripe, setStripe] = useState(null);
  
    // useEffect(() => {
    //   const fetchStripe = async () => {
    //     const stripe = await loadStripe(
    //       "pk_test_51Oktd0SFo6ikMNdBYu3icDP4fdkOtxImlSZMcqCnXsmRMG3lNy7lELJaRbfZIbkbeYCUccuWpcDt6IkMoAfj1D6r004Rsy2XI5"
    //     ); // Replace with your public key
    //     setStripe(stripe);
    //   };
  
    //   fetchStripe();
    // }, []);
    return (
      <Elements stripe={stripe}>
        <CheckoutForm />
      </Elements>
    );
  };

export default PaymentMethod