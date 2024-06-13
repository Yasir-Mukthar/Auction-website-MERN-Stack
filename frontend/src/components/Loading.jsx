import { VscLoading } from "react-icons/vsc";
function Loading(props) {
  return (
    <>
      <div className={`relative text-white text-center flex flex-col mt-[-60px] gap-5 items-center justify-center ${props?.width==="sidebar" ? "h-[400px]" : "h-screen"}`} >
        <VscLoading
          size={110}
          className="absolute text-color-primary animate-[clockspin_1s_infinite]"
        />
        <VscLoading
          size={70}
          className="absolute text-color-primary animate-[counterspin_1s_linear_infinite]"
        />
        {/* <span className="mt-[200px]">Loading your assets</span> */}
      </div>
    </>
  );
}

export default Loading;
