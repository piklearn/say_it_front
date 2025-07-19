export default function Loading({status}) 
{
    const persianStatus = {"connecting": "در حال اتصال", "waiting": "در حال اتصال"}
  return (
     <div className={`fixed bg-gray-500 w-dvw h-dvh opacity-60 ${status === "matched" | "disconnected" ? "hidden" : ""}`}>
            <div className='relative top-1/2 left-1/2 -translate-1/2 shadow-md p-5 rounded-md bg-amber-50 w-1/3 h-1/3 overflow-y-hidden overflow-x-hidden'>
                <div
                    className="flex text-amber-200 mx-auto h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                </div>
                <h1 className="text-amber-400 text-center">{persianStatus[status]}</h1>
            </div>
        </div>
  );
}