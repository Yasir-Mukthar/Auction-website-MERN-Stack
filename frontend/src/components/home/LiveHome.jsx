import SingleAuction from "../SingleAuction"

const data =[
    {
        name: "Bike for sale",
        startingPrice: "1000",
        image: "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
        endTime: "2025-12-12T12:00:00.000Z",
        startTime: "2022-12-12T12:00:00.000Z",
        id: "1",
        status: "active",
        sellerImage:"https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
        sellerName:"John Doe",
        sellerId:"1"
    },
    {
        name: "Car for sale",
        startingPrice: "1000",
        image: "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
        endTime: "2025-12-12T12:00:00.000Z",
        startTime: "2022-12-12T12:00:00.000Z",
        id: "2",
        status: "active",
        sellerImage:"https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
        sellerName:"John Doe",
        sellerId:"2"
    },
    {
        name: "House for sale",
        startingPrice: "1000",
        image: "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
        endTime: "2025-12-12T12:00:00.000Z",
        startTime: "2022-12-12T12:00:00.000Z",
        id: "3",
        status: "active",
        sellerImage:"https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
        sellerName:"John Doe",
        sellerId:"3"
    },
    {
        name: "Land for sale",
        startingPrice: "1000",
        image: "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
        endTime: "2025-12-12T12:00:00.000Z",
        startTime: "2022-12-12T12:00:00.000Z",
        id: "4",
        status: "active",
        sellerImage:"https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
        sellerName:"John Doe",
        sellerId:"4"
    },{
        name: "Land for sale",
        startingPrice: "1000",
        image: "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
        endTime: "2025-12-12T12:00:00.000Z",
        startTime: "2022-12-12T12:00:00.000Z",
        id: "5",
        status: "active",
        sellerImage:"https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
        sellerName:"John Doe",
        sellerId:"5"
    },{
        name: "Land for sale",
        startingPrice: "1000",
        image: "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
        endTime: "2025-12-12T12:00:00.000Z",
        startTime: "2022-12-12T12:00:00.000Z",
        id: "6",
        status: "active",
        sellerImage:"https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
        sellerName:"John Doe",
        sellerId:"6"
    },
    {
        name: "Land for sale",
        startingPrice: "1000",
        image: "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
        endTime: "2025-12-12T12:00:00.000Z",
        startTime: "2022-12-12T12:00:00.000Z",
        id: "7",
        status: "active",
        sellerImage:"https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
        sellerName:"John Doe",
        sellerId:"7"
    },
    {
        name: "Land for sale",
        startingPrice: "1000",
        image: "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
        endTime: "2025-12-12T12:00:00.000Z",
        startTime: "2022-12-12T12:00:00.000Z",
        id: "8",
        status: "active",
        sellerImage:"https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
        sellerName:"John Doe",
        sellerId:"8"
    },
    {
        name: "Land for sale",
        startingPrice: "1000",
        image: "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
        endTime: "2025-12-12T12:00:00.000Z",
        startTime: "2022-12-12T12:00:00.000Z",
        id: "9",
        status: "active",
        sellerImage:"https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
        sellerName:"John Doe",
        sellerId:"9"
    },
    {
        name: "Land for sale",
        startingPrice: "1000",
        image: "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
        endTime: "2025-12-12T12:00:00.000Z",
        startTime: "2022-12-12T12:00:00.000Z",
        id: "10",
        status: "active",
        sellerImage:"https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
        sellerName:"John Doe",
        sellerId:"10"
    },
   
    
]

const LiveHome = () => {
  return (
    <div className=" bg-red-400 flex overflow-x-auto p-10">

{
    data.map((item)=>(
        <SingleAuction
        name={item.name}
        startingPrice={item.startingPrice}
        image={item.image}
        endTime={item.endTime}
        startTime={item.startTime}  
        key={item.id}
        id={item.id}
        status={item.status}
        sellerImage={item.sellerImage}
        sellerName={item.sellerName}
        sellerId={item.sellerId}
        />
    
    ))
}

    </div>
  )
}

export default LiveHome