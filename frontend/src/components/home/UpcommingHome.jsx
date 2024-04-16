import SingleAuction from "../SingleAuction";
const data = [
  {
    name: "Bike for sale",
    startingPrice: "1000",
    image:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    endTime: "2025-12-12T12:00:00.000Z",
    startTime: "2024-12-12T12:00:00.000Z",
    id: "1",
    status: "upcoming",
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
    startTime: "2024-12-12T12:00:00.000Z",
    id: "2",
    status: "upcoming",
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
    startTime: "2024-12-12T12:00:00.000Z",
    id: "3",
    status: "upcoming",
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
    startTime: "2024-12-12T12:00:00.000Z",
    id: "4",
    status: "upcoming",
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
    startTime: "2024-12-12T12:00:00.000Z",
    id: "5",
    status: "upcoming",
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
    startTime: "2024-12-12T12:00:00.000Z",
    id: "6",
    status: "upcoming",
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
    startTime: "2024-12-12T12:00:00.000Z",
    id: "7",
    status: "upcoming",
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
    startTime: "2024-12-12T12:00:00.000Z",
    id: "8",
    status: "upcoming",
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
    startTime: "2024-12-12T12:00:00.000Z",
    id: "9",
    status: "upcoming",
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
    startTime: "2024-12-12T12:00:00.000Z",
    id: "10",
    status: "upcoming",
    sellerImage:
      "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg",
    sellerName: "John Doe",
    sellerId: "10",
  },
];

const UpcommingHome = () => {
  return (
    <>
      <div className="">
        <h2 className="text-2xl font-bold text-white mb-5">Upcoming </h2>

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
            <swiper-slide key={item.id}>
              <SingleAuction
                name={item.name}
                startingPrice={item.startingPrice}
                image={item.image}
                endTime={item.endTime}
                startTime={item.startTime}
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

export default UpcommingHome;
