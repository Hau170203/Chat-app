import { Chat } from "../components/Chat";
import { NoChat } from "../components/NoChat";
import { SideBav } from "../components/SideBav"
import { useChatStore } from "../store/useChatStore"

export const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-screen w-full sm:container mx-auto pt-20 ">
      <div className="h-[97%] flex ">
        <div className="w-full flex flex-col space-y-4  sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="w-full  sm:w-[200px] md:w-[250px]  md:pt-2 bg-base-200 rounded-xl ">
            <SideBav />
          </div>
          <div className="w-full  flex flex-1  bg-base-200 rounded-xl">
            {selectedUser ? <Chat /> : <NoChat />}
          </div>
        </div>
      </div>
    </div>
  )
}
