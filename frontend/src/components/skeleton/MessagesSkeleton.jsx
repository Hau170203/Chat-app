
export const MessagesSkeleton = () => {
    const Messeges = Array(15).fill(null);

  return (
    <div className="h-[82%] overflow-y-auto overflow-hidden border-b-2 ">
        {Messeges.map((_, index) => (
            <div 
                key={index}
                className={` chat ${index % 2 == 0 ? "chat-start" : "chat-end"}`} >
                <div className="chat-image avatar">
                    <div className="size-8 rounded-full">
                        <div className="skeleton w-full h-full rounded-full"/>
                    </div>
                </div>
                <div className="chat-bubble bg-transparent p-0">
                    <div className="skeleton h-7 w-[200px]" />
                </div>
            </div>
        ))}
    </div>
  )
}
