import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCartItems,reset } from "../store/cart/cartSlice";
import axios from "axios";
import {
    
    useStripe,
  } from "@stripe/react-stripe-js";
  import { loadStripe } from "@stripe/stripe-js";



const Cart = () => {
const [cartItem, setCartItem] =useState()
const {cartItems} = useSelector((state)=> state.cart)
const dispatch= useDispatch()
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


console.log(cartItem);

useEffect(()=>{
    dispatch(getCartItems())
  


},[])

useEffect(()=>{
    if(cartItems){
        setCartItem(cartItems)
    }
}
,[cartItems])

const redirectToCheckout = async (product) => {
    // event.preventDefault();
    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name:product.name,
            images: [
              product.image,
            ],
          },
          unit_amount: product.startingPrice * 100, // because stripe interprets price in cents
        },
        quantity: 1,
      },
    ];
    // const { data } = await axios.post("http://localhost:8000/api/v1/payments/checkout", {
    //   lineItems,
    // },{

    //     withCredentials:true
    // });
    const {data}= await axios.post(
        "http://localhost:8000/api/v1/payments/checkout",
        {
          lineItems,
        },
        {
          withCredentials: true,
        }
      );
    

    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });
    console.log(result);

    if (result.error) {
      console.log(result.error.message);
    } else{
alert("succes")    }
  };

  return (
    <div>
        <h1 className="text-white">My Cart</h1>
        {
            cartItem?.map((item)=>(
                <div key={item._id} className="bg-white">
                   
                   {
                    item.products.map((product)=>(
                        <div key={product._id} className="flex justify-between items-center">
                            <div>
                                <img className="w-20" src={product.image} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>{product.startingPrice}</p>
                            </div>
                            <Link to={`/single-auction-detail/${product._id}`} className="text-theme-color">View Product</Link>
                            <button onClick={()=>redirectToCheckout(product)}>Go to Checkout</button>


                           
                        </div>
                    ))
                   }
                </div>
                
            ))
        }

    </div>
  )
}

export default Cart