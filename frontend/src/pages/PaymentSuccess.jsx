import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { useParams,useNavigate } from "react-router-dom"
import { deleteCartItem } from "../store/cart/cartSlice";
import { updatePaymentStatus } from "../store/auction/auctionSlice";
const PaymentSuccess = () => {
    const { id } = useParams();
    const dispatch=useDispatch();
    const navigate=useNavigate()

    useEffect(()=>{
        dispatch(updatePaymentStatus(id))
            dispatch(deleteCartItem(id))
       
setTimeout(
    ()=>{
        navigate("/")
    },5000
)

    },[])
  return (
    <div className="text-white">PaymentSuccess</div>
  )
}

export default PaymentSuccess