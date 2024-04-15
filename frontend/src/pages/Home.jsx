import CreateEarnHome from "../components/home/CreateEarnHome";
import HeroHome from "../components/home/HeroHome";
import LiveHome from "../components/home/LiveHome";
import ProcessHome from "../components/home/ProcessHome";
import UpcommingHome from "../components/home/UpcommingHome";

import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

const Home = () => {
  return (
    <>
      <HeroHome />
      <div className="px-5 lg:px-12 flex flex-col gap-20">
        <LiveHome />
        <UpcommingHome />
        <ProcessHome />
        <div className="text-white flex flex-col gap-8">
          <CreateEarnHome />
        </div>
      </div>
    </>
  );
};

export default Home;
