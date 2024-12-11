import logo from "../assets/R.png"

export const NoChat = () => {
  return (
    <>
        <div className="w-full flex justify-center items-center">
            <div className="flex flex-col items-center">
                <div className="size-14">
                    <img src={logo} className="transition-transform animate-bounce duration-500 " alt="logo"/>
                </div>
                <div className="text-center">
                    <h1 className=" text-2xl font-bold">Chào mừng đến với Chat</h1>
                    <p className="text-base">Chọn một cuộc trò chuyên bên trái để bắt đầu trò chuyện</p>
                </div>
            </div>
        </div>
    </>
  )
}
