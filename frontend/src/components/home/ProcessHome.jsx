const ProcessHome = () => {
  return (
    <div className="">
      <h2 className="text-4xl font-medium text-white mb-10 text-center">
        Create And Sell{" "}
        <span className="text-color-primary">Your Products</span>
      </h2>
      <div className="grid grid-cols-1 m-auto gap-5   w-full  md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col text-white gap-4 justify-start p-8 rounded-2xl bg-theme-bg ">
          <h2 className="text-5xl font-bold text-stroke">01</h2>
          <h3 className="text-2xl font-bold">Setup your Account</h3>
          <p className="text-body-text-color">
            Register for a free account and unlock the power to sell anything,
            anytime.
          </p>
        </div>
        <div className="flex flex-col text-white gap-4 justify-start p-8 rounded-2xl bg-theme-bg ">
          <h2 className="text-5xl font-bold text-stroke">02</h2>
          <h3 className="text-2xl font-bold">Create Your Auction</h3>
          <p className="text-body-text-color">
            Create a compelling listing that showcases your item and attracts
            potential buyers.
          </p>
        </div>
        <div className="flex flex-col text-white gap-4 justify-start p-8 rounded-2xl bg-theme-bg ">
          <h2 className="text-5xl font-bold text-stroke">03</h2>
          <h3 className="text-2xl font-bold">Add Starting Price for Bid</h3>
          <p className="text-body-text-color">
            Determine your starting bid and consider a reserve price for added
            control.
          </p>
        </div>
        <div className="flex flex-col text-white gap-4 justify-start p-8 rounded-2xl bg-theme-bg ">
          <h2 className="text-5xl font-bold text-stroke">04</h2>
          <h3 className="text-2xl font-bold">List Product for Sale</h3>
          <p className="text-body-text-color">
            Publish your Product and watch the bids come in, turning your unused
            items into revenue.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessHome;
