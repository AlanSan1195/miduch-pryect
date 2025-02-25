import { TooltipColapsar, TooltipLives } from "./Tooltip";

export function Showmore({ showMore, isShow }) {
  return (
    <div className=" mx-4 flex justify-center items-center ">
      <hr className=" mx-2 flex-1 border-t-1 border-zinc-800 " />
      <button onClick={showMore}>
        {isShow ? (
          <span className=" text-rose">Show less</span>
        ) : (
          <span className=" text-rose">Show more</span>
        )}
      </button>
      <hr className="mx-2 flex-1 border-t-1 border-zinc-800 " />
    </div>
  );
}
export function ShowmoreWhitActive({ showMore, isActive, isShow }) {
  return (
    <div className="  flex justify-center items-center ">
      <hr className=" mx-2 flex-1 border-t-1 border-zinc-800 " />
      <button onClick={showMore}>
        {isActive ? (
          <div className=" flex  items-center group  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-video"
            >
              <path d="M0 0h24v24H0z" stroke="none" />
              <path d="m15 10 4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14v-4zM3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            <TooltipLives />
          </div>
        ) : isShow ? (
          <span className=" text-rose">Show less</span>
        ) : (
          <span className=" text-rose">Show more</span>
        )}
      </button>
      <hr className="mx-2 flex-1 border-t-1 border-zinc-800 " />
    </div>
  );
}
