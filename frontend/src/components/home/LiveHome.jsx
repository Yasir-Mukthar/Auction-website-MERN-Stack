import SingleAuction from "../SingleAuction";

const data = [
  {
    name: "Bike for sale",
    startingPrice: "1000",
    image:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    endTime: "2025-12-12T12:00:00.000Z",
    startTime: "2022-12-12T12:00:00.000Z",
    id: "1",
    status: "active",
    sellerImage:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    sellerName: "John Doe",
    sellerId: "1",
  },
  {
    name: "Car for sale",
    startingPrice: "1000",
    image:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    endTime: "2025-12-12T12:00:00.000Z",
    startTime: "2022-12-12T12:00:00.000Z",
    id: "2",
    status: "active",
    sellerImage:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    sellerName: "John Doe",
    sellerId: "2",
  },
  {
    name: "House for sale",
    startingPrice: "1000",
    image:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    endTime: "2025-12-12T12:00:00.000Z",
    startTime: "2022-12-12T12:00:00.000Z",
    id: "3",
    status: "active",
    sellerImage:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    sellerName: "John Doe",
    sellerId: "3",
  },
  {
    name: "Land for sale",
    startingPrice: "1000",
    image:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    endTime: "2025-12-12T12:00:00.000Z",
    startTime: "2022-12-12T12:00:00.000Z",
    id: "4",
    status: "active",
    sellerImage:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    sellerName: "John Doe",
    sellerId: "4",
  },
  {
    name: "Land for sale",
    startingPrice: "1000",
    image:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    endTime: "2025-12-12T12:00:00.000Z",
    startTime: "2022-12-12T12:00:00.000Z",
    id: "5",
    status: "active",
    sellerImage:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    sellerName: "John Doe",
    sellerId: "5",
  },
  {
    name: "Land for sale",
    startingPrice: "1000",
    image:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    endTime: "2025-12-12T12:00:00.000Z",
    startTime: "2022-12-12T12:00:00.000Z",
    id: "6",
    status: "active",
    sellerImage:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    sellerName: "John Doe",
    sellerId: "6",
  },
  {
    name: "Land for sale",
    startingPrice: "1000",
    image:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    endTime: "2025-12-12T12:00:00.000Z",
    startTime: "2022-12-12T12:00:00.000Z",
    id: "7",
    status: "active",
    sellerImage:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    sellerName: "John Doe",
    sellerId: "7",
  },
  {
    name: "Land for sale",
    startingPrice: "1000",
    image:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    endTime: "2025-12-12T12:00:00.000Z",
    startTime: "2022-12-12T12:00:00.000Z",
    id: "8",
    status: "active",
    sellerImage:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    sellerName: "John Doe",
    sellerId: "8",
  },
  {
    name: "Land for sale",
    startingPrice: "1000",
    image:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    endTime: "2025-12-12T12:00:00.000Z",
    startTime: "2022-12-12T12:00:00.000Z",
    id: "9",
    status: "active",
    sellerImage:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    sellerName: "John Doe",
    sellerId: "9",
  },
  {
    name: "Land for sale",
    startingPrice: "1000",
    image:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    endTime: "2025-12-12T12:00:00.000Z",
    startTime: "2022-12-12T12:00:00.000Z",
    id: "10",
    status: "active",
    sellerImage:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    sellerName: "John Doe",
    sellerId: "10",
  },
];

const LiveHome = () => {
  return (
    <>
      <div id="livehome">
        <div className="flex gap-2 items-center mb-5">
          <div>
            <span class="absolute animate-ping flex rounded-full h-3 w-3 bg-sky-500"></span>
            <span class="relative flex rounded-full h-3 w-3 bg-sky-500"></span>
          </div>
          <h2 className="text-2xl font-bold text-white">Live Auctions</h2>
        </div>
        <swiper-container
          breakpoints={JSON.stringify({
            768: {
              slidesPerView: 3,              
            },

            1024: {
              slidesPerView: 4,
              
            },
          })}
          style={{
            "--swiper-navigation-color": "#00A3FF",
          }}
          navigation="true"
          slides-per-view="1"
          space-between="16"
        >
          {data.map((item) => (
            <swiper-slide>
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
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </>
  );
};

export default LiveHome;
