import itemimg from "../assets/Behance_Animation_2d.jpg";
import avatar from "../assets/avatar.jpg";
import avatar2 from "../assets/avatar2.jpg";
import avatar3 from "../assets/avatar3.jpg";
const Home = () => {
  return (
    <div
      className=" place-content-between p-10 flex pt-40 items-start gap-7 flex-wrap lg:flex-nowrap"
      id="item01"
    >
      <img
        className=" rounded-xl min-w-48 max-w-3xl "
        src={itemimg}
        alt="img"
      />
      <div className="lg:min-w-[50%] lg:w-1/2 flex gap-4 flex-col ">
        <div>
          <h2 className="text-3xl font-extrabold text-white">
            Modern Abstract Painting
          </h2>
          <p className="pt-4 text-body-text-color font-semibold">
            Sale Price:
            <span className="font-extrabold text-color-danger"> 5.63ETH</span>
          </p>
          <div className="pt-4 flex flex-row gap-4 flex-wrap text-body-text-color capitalize">
            <a
              href="#"
              className="px-4 py-1 border rounded-full hover:bg-color-primary border-border-info-color hover:text-white transition-all"
            >
              art
            </a>
            <a
              href="#"
              className="px-4 py-1 border rounded-full hover:bg-color-primary border-border-info-color hover:text-white transition-all"
            >
              2.5k
            </a>
            <a
              href="#"
              className="px-4 py-1 border rounded-full hover:bg-color-primary border-border-info-color hover:text-white transition-all"
            >
              525k
            </a>
            <a
              href="#"
              className="px-4 py-1 border rounded-full hover:bg-color-primary border-border-info-color hover:text-white transition-all"
            >
              share
            </a>
            <a
              href="#"
              className="px-4 py-1 border rounded-full hover:bg-color-primary border-border-info-color hover:text-white transition-all"
            >
              Report
            </a>
          </div>
          {/* border */}
        </div>
        <div className="pt-4 border-t border-border-info-color">
          {/* Creator */}
          <div className="flex gap-8">
            <div id="author-item" className="text-heading-color">
              <span className="font-medium capitalize  ">creator</span>
              <div id="author-info" className="flex items-center gap-2 pt-2">
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-[45px] rounded-full"
                />
                <a href="#" className="font-medium ">
                  @kristy_ander
                </a>
              </div>
            </div>
            {/* Creator */}
            <div id="author-item" className="text-heading-color capitalize">
              <span className="font-medium  ">Collection</span>
              <div id="author-info" className="flex items-center gap-2 pt-2">
                <img
                  src={avatar2}
                  alt=""
                  className="w-[45px] h-[45px] rounded-full"
                />
                <a href="#" className="font-medium">
                  modern art
                </a>
              </div>
            </div>
          </div>
          {/* TABS buttons */}
          <div className="flex gap-4 pt-4 font-bold text-white ">
            <button className="px-5 py-2 rounded-xl bg-color-primary ">
              Details
            </button>
            <button className="px-5 py-2 rounded-xl bg-theme-bg2 text-body-text-color">
              Bids
            </button>
            <button className="px-5 py-2 rounded-xl bg-theme-bg2 text-body-text-color">
              History
            </button>
          </div>
        </div>
        {/* Owner*/}
        <div
          id="author-item"
          className="pt-4 border-t border-border-info-color text-heading-color"
        >
          <span className="font-medium capitalize ">Owner</span>
          <div id="author-info" className="flex items-center gap-2 pt-2">
            <img src={avatar3} alt="" className="w-[45px] rounded-full" />
            <a href="#" className="font-medium">
              @donel_tryon
            </a>
          </div>
        </div>
        <div className="text-heading-color capitalize">
          {/* property */}
          <span className="font-medium ">Property</span>
          {/* property wrap */}
          <div className="flex flex-wrap gap-2.5 pt-4">
            <div className="flex flex-col py-1 px-4 rounded-2xl border border-border-info-color bg-theme-bg">
              <span className="text-theme-color py-1">background</span>
              <h6 className="font-medium">navy Blue</h6>
              <p className="text-body-text-color normal-case">
                5% have this trait
              </p>
            </div>
            <div className="flex flex-col py-1 px-4 rounded-2xl border border-border-info-color bg-theme-bg">
              <span className="text-theme-color py-1">mouth grade</span>
              <h6 className="font-medium">Fresh</h6>
              <p className="text-body-text-color normal-case">
                3% have this trait
              </p>
            </div>
            <div className="flex flex-col py-1 px-4 rounded-2xl border border-border-info-color bg-theme-bg">
              <span className="text-theme-color py-1">head</span>
              <h6 className="font-medium">Bowlcut</h6>
              <p className="text-body-text-color normal-case">
                8% have this trait
              </p>
            </div>
            <div className="flex flex-col py-1 px-4 rounded-2xl border border-border-info-color bg-theme-bg">
              <span className="text-theme-color py-1">body</span>
              <h6 className="font-medium">red</h6>
              <p className="text-body-text-color normal-case">
                6% have this trait
              </p>
            </div>
            <div className="flex flex-col py-1 px-4 rounded-2xl border border-border-info-color bg-theme-bg">
              <span className="text-theme-color py-1">accessory</span>
              <h6 className="font-medium">metal headband</h6>
              <p className="text-body-text-color normal-case">
                5% have this trait
              </p>
            </div>
            <div className="flex flex-col py-1 px-4 rounded-2xl border border-border-info-color bg-theme-bg">
              <span className="text-theme-color py-1">skin</span>
              <h6 className="font-medium">dark brown</h6>
              <p className="text-body-text-color normal-case">
                9% have this trait
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
