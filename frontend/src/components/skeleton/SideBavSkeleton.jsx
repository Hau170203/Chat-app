import { UsersRound } from "lucide-react"
const skeletonuser = Array(9).fill(null);
export const SideBavSkeleton = () => {
  return (
    <>
      <aside className="h-full w-full flex flex-row sm:flex-col">
        {/* Header */}
        <div className="hidden sm:flex justify-center items-center border-b-2 py-2 ">
          <span className="pr-2"> <UsersRound /></span>
          <p className="text-lg "> Liên hệ</p>
        </div>

        {/* List Users */}

        <div className=" flex flex-row overflow-x-auto sm:flex-col sm:overflow-y-auto ">
          {skeletonuser.map((_, index) => (
            <div key={index} className="flex items-center py-3">
                {/* avatar */}
                <div className="mx-4">
                    <div className="skeleton rounded-full size-10 md:size-14"></div>
                </div>

                {/* user */}
                <div className="hidden sm:flex flex-col pl-2">
                    <div>
                      <div className="skeleton h-4 w-28 md:w-32 mb-2"></div>
                      <div className="skeleton h-4 w-16"></div>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}
