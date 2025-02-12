 export function Showmore({showMore}){
    return(
        <div className=" mx-4 flex justify-center items-center ">
        <hr className=" mx-2 flex-1 border-t-2 border-black" />
        <button onClick={showMore}>
          <span className="text-blue-500">Show more</span>
        </button>
        <hr className="mx-2 flex-1 border-t-2 border-black" />
      </div> 
    )
 }