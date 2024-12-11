import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore"
import { SideBavSkeleton } from "./skeleton/SideBavSkeleton";
import { UsersRound } from "lucide-react"
import avatar from "../assets/user.jpg"
import { useAuthStore } from "../store/useAuthStore";


export const SideBav = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState(users);
  useEffect(() => {
    getUsers();
  }, [])


  useEffect(() => {
    if (isActive) {
      const filter = users.filter(user => onlineUsers.includes(user._id));
      setData(filter);
    } else {
      setData(users); // Show all users if not active
    }

    console.log(data);
    console.log(isActive)
  }, [isActive, users, onlineUsers]);


  if (isUsersLoading) return <SideBavSkeleton />
  return (
    <aside className="h-full w-full flex flex-row sm:flex-col">
      {/* Header */}
      <div className="hidden sm:flex  justify-center items-center  py-2 ">
        <span className="pr-2"> <UsersRound /></span>
        <p className="text-lg "> Liên hệ</p>
        <div className="ml-3">
        <input type="checkbox" 
            className=" border-2 border-gray-400 rounded-md focus:ring-2 mr-1"
            onClick={(e) => setIsActive(e.target.checked)}
         />
        <span>Hoạt động</span>
        </div>
      </div>

      {/* List Users */}

      <div className=" flex flex-row overflow-x-auto sm:flex-col sm:overflow-y-auto ">
      {data.map(item => (
          <button
            key={item._id}
            className={`
              w-full hover:bg-base-300
              ${selectedUser?._id === item._id ? "bg-base-300 ring-1" : ""}
              `}
            onClick={() => setSelectedUser(item)}
          >
            <div className="flex items-center md:py-1">
              {/* avatar */}
              <div className=" relative mx-4">
                <div className="  rounded-full overflow-hidden size-10 md:size-12">
                  <img src={item.profilePic || avatar} alt={item.fullName} />
                </div>
                {onlineUsers.includes(item._id) && (
                  <span className="absolute top-0 right-0 size-4 rounded-full bg-green-500"></span>
                )}
                <p className="block sm:hidden">{item.fullName.split(" ")[2] || item.fullName.split(" ")[1]}</p>
              </div>

              {/* user */}
              <div className="hidden sm:flex flex-col pl-2">
                <div>
                  <div className="hidden md:block font-medium mb-1">{item.fullName}</div>
                  <div className="block md:hidden font-medium mb-1">{item.fullName.split(" ")[2] || item.fullName.split(" ")[1]}</div>
                  <div className=" text-sm h-4 w-16">
                    {onlineUsers.includes(item._id) ? "Online" : "Offline"}
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  )
}
