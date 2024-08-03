import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCartItems, reset } from "../store/cart/cartSlice";
import axios from "axios";
import { useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [cartItem, setCartItem] = useState();
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // const stripe = useStripe();
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    const fetchStripe = async () => {
      const stripe = await loadStripe(
        "pk_test_51P5t81Lvvxf0OOpItZ5a94EMI92eFidBTy8oWVF7XTsHTwu17Q9BB292AQjV6s3fjSoWdp60vlG1jG090s6QgDm100UKAL5SIR"
      ); // Replace with your public key
      setStripe(stripe);
    };

    fetchStripe();
  }, []);

  //console.log(cartItem);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  useEffect(() => {
    if (cartItems) {
      setCartItem(cartItems);
    }
  }, [cartItems]);

  const redirectToCheckout = async (product) => {
    // event.preventDefault();
    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: product.startingPrice * 100, // because stripe interprets price in cents
        },
        quantity: 1,
      },
    ];
    const sendProductData = { id: product._id, lineItems: lineItems };
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/payments/checkout",
      {
        sendProductData,
      },
      {
        withCredentials: true,
      }
    );

    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });
    //console.log(result);

    if (result.error) {
      //console.log(result.error.message);
    } else {
      alert("succes");
    }
  };

  return (
    <div className=" px-7 py-4 w-full bg-theme-bg text-slate-300 rounded-2xl ">
      <h2 className=" text-white font-bold text-xl border-b border-border-info-color pb-3 mb-5 ">
        Your Cart
      </h2>
      {cartItem?.map((item) => (
        <div
          key={item._id}
          className="flex flex-col gap-2 border rounded-md p-4 border-border-info-color"
        >
          {item.products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col justify-between gap-5 p-4 md:flex-row items-start md:items-center border-b border-border-info-color"
            >
              <div className="flex gap-4">
                <img
                  className="w-[85px] h-[85px] rounded-md"
                  src={product.image}
                  alt={product.name}
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-bold ">{product.name}</h3>
                  <p>{product.startingPrice}$</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Link
                  to={`/single-auction-detail/${product._id}`}
                  className="text-theme-color p-3 hover:bg-theme-bg2 hover border border-border-info-color rounded-lg "
                >
                  View Product
                </Link>
                <button
                  className="bg-theme-color  p-3 rounded-lg text-white font-bold"
                  onClick={() => redirectToCheckout(product)}
                >
                  Go to Checkout
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Cart;
