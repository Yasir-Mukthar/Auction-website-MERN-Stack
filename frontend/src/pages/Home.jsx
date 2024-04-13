import CreateEarnHome from "../components/home/CreateEarnHome";
import HeroHome from "../components/home/HeroHome";
import LiveHome from "../components/home/LiveHome";
import ProcessHome from "../components/home/ProcessHome";
import UpcommingHome from "../components/home/UpcommingHome";

const Home = () => {
  return (
    <>
      <HeroHome/>
      <LiveHome />
      <UpcommingHome />
      <ProcessHome />
      <div className="text-white flex flex-col gap-8 pt-20 px-6 lg:px-11 ">
      <CreateEarnHome />
      </div>
    </>
  );
};

export default Home;
