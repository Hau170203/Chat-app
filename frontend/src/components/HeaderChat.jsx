import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore';
import avatar from "../assets/user.jpg"

export const HeaderChat = () => {
    const {selectedUser, setSelectedUser} = useChatStore();
    const {onlineUsers} = useAuthStore();

  return (
    <div className='w-full h-16 flex mt-2 border-b-2 shadow-sm '>
        {/* info */}
        <div className='flex flex-1 pl-2  '>
            {/* avatar */}
            <div className=' flex size-12 rounded-full overflow-hidden '>
                <img src={selectedUser.profilePic || avatar} alt={selectedUser.fullName}  />
            </div>
            {/* name status */}
            <div className='pl-4'>
                <h3 className=' font-semibold'>{selectedUser.fullName}</h3>
                <p>{onlineUsers.includes(selectedUser._id) ? "Online": "Offline" }</p>
            </div>
        </div>
        <button 
            className="btn btn-square bg-base-300 mr-1 " 
            onClick={() => setSelectedUser(null)}
        >X</button>
    </div>
  )
}
