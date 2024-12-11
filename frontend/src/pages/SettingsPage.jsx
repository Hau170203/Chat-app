import { useThemeStore } from "../store/useThemeStore"
import { Themes } from "../themes"
import logo from "../assets/user.jpg"
import { Send } from "lucide-react"

const dataMess = [
  { id: 1, message: "Hello", isSend: false },
  { id: 2, message: "Hi", isSend: true }
]

export const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <>
      <div className=" sm:container mx-auto mt-19 px-3 pt-20">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Theme</h1>
          <p className="text-base ">Chọn chủ đề cho giao diện trò chuyện của bạn</p>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {Themes.map(t => (
            <button
              key={t}
              className={`py-2
                      ${theme === t ? "bg-base-300" : "hover:bg-base-300/70"}`}
              onClick={() => setTheme(t)}
            >
              <div className=" relative w-full h-10 rounded-md overflow-hidden border " data-theme={t}>
                <div className=" absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="bg-primary"></div>
                  <div className="bg-secondary"></div>
                  <div className="bg-accent"></div>
                  <div className="bg-neutral"></div>
                </div>
              </div>
              <div>{t}</div>
            </button>

          ))}
        </div>
        {/* review chat */}
        <div className=" min-w-[200px] rounded-2xl ">
          <h3 className="text-xl font-bold">Review</h3>
          <div className="bg-base-200">
            <div className="flex justify-center items-center py-5">
              <div className="w-[450px] border rounded-xl pt-4 bg-base-300">
                {/* header */}
                <div className="flex items-center border-b pb-1 pl-2">
                  {/* avatar */}
                  <div className="size-9 rounded-full overflow-hidden border ">
                    <img src={logo} alt="" />
                  </div>
                  <div className="pl-4">
                    <h4 className="text-base font-medium">Văn Hậu</h4>
                    <p className="text-sm">Online</p>
                  </div>
                </div>
                {/* chat */}
                <div className="p-3">
                  {dataMess.map(item => (
                    <div
                      key={item.id}
                      className={`flex 
                            ${item.isSend ? "justify-end" : "justify-start"}
                          `}
                    >
                      <div
                        className={` p-3 rounded-md
                                ${item.isSend ? "bg-primary text-primary-content" : "bg-base-200"}`}>
                        <p className="text-sm">{item.message}</p>
                        <p className="text-[10px]">12.00 PM</p>
                      </div>
                    </div>
                  ))}

                </div>
                <div className="border-t py-3">
                  <div className="flex px-2 items-center">
                    <input type="text" placeholder="Nhập...." className="h-8 input input-bordered hover:input-bordered bg-base-200 flex flex-1 mr-3" readOnly/>
                    <button className="h-[35px] w-[35px]  bg-primary flex justify-center items-center rounded-xl">
                      <Send />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
