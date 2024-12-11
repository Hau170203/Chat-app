import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore"
import { ChatInput } from "./ChatInput";
import { HeaderChat } from "./HeaderChat";
import { MessagesSkeleton } from "./skeleton/MessagesSkeleton";
import moment from "moment";
import user from "../assets/user.jpg"
import r from "../assets/R.png"

export const Chat = () => {
    const { messages, getMessages, selectedUser, isMessagesLoading, subscribeToMessage, unSubscribeFromMessage } = useChatStore();
    const { authUser} = useAuthStore();
    const messageEndRef = useRef(null);

    useEffect(() => {
        getMessages(selectedUser._id);
        subscribeToMessage();

        return () => {
            unSubscribeFromMessage()
        }
    }, [getMessages, selectedUser._id,subscribeToMessage, unSubscribeFromMessage])

    useEffect(() => {
        if(messages && messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth"});
        }
    },[messages])
    if (isMessagesLoading) return (
        <div className="w-full h-full ">
            <HeaderChat />
            <MessagesSkeleton />
            <ChatInput />
        </div>
    )
    return (
        <>
            <div className="w-full flex flex-col">
                <HeaderChat />
                <div className="flex-1 overflow-y-auto pb-2">
                    {messages.map((item, index)=> (
                            <div
                                key={index}
                                className={`chat
                                ${item.senderId === authUser._id ? "chat-end" : "chat-start"}
                                `}
                                ref={messageEndRef}
                            >
                                <div className="chat-image avatar">
                                    <div className="size-10 rounded-full">
                                        <img src={item.senderId === authUser._id ? authUser.profilePic || r : selectedUser.profile || user}
                                            alt="anh" />
                                    </div>
                                </div>
                                <div className=" chat-header">
                                    <time className="text-sm opacity-60" >{moment(item.createdAt).format("HH:mm DD/MM/YYYY")}</time>
                                </div>
                                <div className="chat-bubble space-y-1">
                                    {item.image && (
                                        <img src={item.image} alt="anh" />
                                    )}
                                    {item.text && (
                                        <>
                                            <p>{item.text}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                    ))}
                </div>
                <ChatInput />
            </div>
        </>
    )
}
