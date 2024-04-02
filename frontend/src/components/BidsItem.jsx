import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import { getBidsAuctionsByUser } from '../store/bid/bidSlice'
import { Link } from 'react-router-dom'



const BidsItem = () => {

  const dispatch = useDispatch()
  const {bids} = useSelector(state => state.bid)
console.log(bids, "bids....");
  useEffect(() => {
    dispatch(getBidsAuctionsByUser())
    console.log("use effecty bids....", bids);
  }, [])




  return (
    <div className='bg-green-800 text-white'>
      <span className='px-2'>img</span>
      <span className='px-2'>name</span>
      <span className='px-2'>category</span>
      <span className='px-2'>status</span>
      <span className='px-2'>currentPrice</span>
      <span className='px-2'>your bid</span>

      <span className='px-2'>view</span>
      {
        bids?.map(bid => (
          <div key={bid?._id} className='flex justify-between items-center p-4 border-b border-green-600'>
            <img src={bid?.auction?.image} alt="auction image" className='w-[50px] h-[50px] rounded-full' />
            <h1 className='px-2'>{bid?.auction?.name}</h1>
            <h2 className='px-2'>{bid?.auction?.category?.name}</h2>
            <h2 className='px-2'>{bid?.auction?.status}</h2>
            <h2 className='px-2'>{bid?.auction?.startingPrice}</h2>
            <h2 className='px-2'>{bid?.bidAmount}</h2>

            <Link to={`/single-auction-detail/${bid?.auction?._id}`}>view</Link>


          </div>
        ))
      }

    </div>
  )
}

export default BidsItem