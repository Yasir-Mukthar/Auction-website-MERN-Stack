import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { getCurrentUser } from "../store/auth/authSlice";
import { toast } from "react-toastify";

const stripe = await loadStripe(
  "pk_test_51P5t81Lvvxf0OOpItZ5a94EMI92eFidBTy8oWVF7XTsHTwu17Q9BB292AQjV6s3fjSoWdp60vlG1jG090s6QgDm100UKAL5SIR"
);

const CheckoutForm = () => {
  const { user } = useSelector((state) => state.auth);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch=useDispatch()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  ////console.log(user, "user in payment method..........");
  useEffect(()=>{

  },[user])

  useEffect(()=>{
    dispatch(getCurrentUser())
    
  },[])

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
      ////console.log("[error]", error.message);
    } else {
      ////console.log("[PaymentMethod]", paymentMethod);

      // Send paymentMethod.id to your server
      //use axios
      if (user?.paymentVerified){
        axios
          .post(
            "http://localhost:8000/api/v1/payments/update-payment-method",
            { paymentMethodId: paymentMethod.id },
            { withCredentials: true }
          )
          .then((response) => {
            ////console.log(response.data);
            //react toastfy
            toast.success("Payment Method Updated Successfully");
            //empty inputs
            setName("");
            setEmail("");
            setAddress("");
            //emptty cardelement
            cardElement.clear();
            
          })
          .catch((error) => {
            ////console.error(error);
          });

          ////console.log("Payment method updating........");

        } else {
        axios
          .post(
            "http://localhost:8000/api/v1/payments/add-payment-method",
            {
              paymentMethodId: paymentMethod.id,
            },
            { withCredentials: true }
          )
          .then((response) => {
            if (response.status === 200) {
              ////console.log(response.data); // Should log "Payment method added successfully"
              //react toastfy
              toast.success("Payment Method Added Successfully");
              //empty inputs
              setName("");
              setEmail("");
              setAddress("");
              //emptty cardelement
              cardElement.clear();

            } else {
              ////console.log("Failed to add payment method");
            }
          })
          .catch((error) => {
            ////console.error(error);
          });
          ////console.log("Payment method adding........");

      }
    }
  };

  return (
    <div className=" px-7 pt-4 pb-10 w-full bg-theme-bg  rounded-2xl ">
      <h1 className=" text-white font-bold text-xl border-b border-border-info-color pb-3 mb-5 ">Payment Method</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:w-[450px] gap-3 inputs:outline-none inputs:px-2 inputs:py-[10px] inputs:rounded-md inputs:white [&_button[type=submit]]:bg-theme-color [&_button:hover[type=submit]]:bg-color-danger inputs:border inputs:border-border-info-color focus:inputs:border-theme-color select:border select:border-border-info-color inputs:placeholder-body-text-color inputs:text-sm [&_*]:transition-all "
      >
        <input
       
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name on card"
          
          required
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          required
          
        />
        <CardElement className="  outline-none px-2 py-3 rounded-md bg-white border border-border-info-color focus:border-theme-color placeholder-body-text-color " />
        <button
          type="submit"
          disabled={!stripe}
          className="px-3 py-4 rounded-xl text-white cursor-pointer font-bold tracking-wide"
        >
          {user?.paymentVerified
            ? "Update Payment Method"
            : "Add Payment Method"}
        </button>
      </form>
    </div>
  );
};

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

export default PaymentMethod;
