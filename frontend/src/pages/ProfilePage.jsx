import user from "../assets/user.jpg"
import { Camera, Mail, User, Watch } from "lucide-react"
import { useState } from "react";
import moment from "moment-timezone";
import { useAuthStore } from "../store/useAuthStore";


export const ProfilePage = () => {
  const {authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [dataImg, setDataImg] = useState(null)
  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async  () => {
      const base64Image = reader.result;
      setDataImg(base64Image);
      await updateProfile({profilePic: base64Image})
    }
  }
  const vietnamTime = moment(authUser.createdAt).tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY");

  return (
    <div className="h-screen flex justify-center items-center" >
      <div className='w-[670px] border mx-auto py-4 p-4 rounded-lg'>
        {/* header */}
        <div className="border-b-2 text-center pb-2">
          <h1 className='text-2xl font-bold'>Thông tin cá nhân</h1>
        </div>

        {/* avatar */}
        <div className="flex flex-col justify-center items-center space-y-2">
          <div className=" relative mt-5">
            <img src={dataImg ||authUser.profilePic || user} alt="" className="size-32 rounded-full object-cover border-2" />

            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 
                                bg-yellow-500 hover:scale-105 p-2 rounded-full 
                                cursor-pointer transition-all duration-200
                                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""} `}
            >
              <Camera className="w-5 h-5 text-base-400" />
              <input type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleChangeAvatar}
                disabled={isUpdatingProfile}
              //  onChange={handleImageUpload}
              //  disabled={isUploadProfile}
              />
            </label>
          </div>
          <p className="text-sm text-zinc-800 ">
            {isUpdatingProfile   ? "Uploading..." : "Tải ảnh đại diện"}
          </p>
        </div>
        {/* info */}

        <div className={"space-y-3"}>
          <div className=" flex">
            <User size={23}/>
            <label className="text-lg pl-2">Full Name: </label>
          </div>
          <div className="border-[2px] rounded-lg">
            <h3 className="text-lg font-semibold p-2 " >{authUser.fullName}</h3>
          </div>
          <div className="flex">
              <Mail />
              <label className="text-lg pl-2">Emai: </label>
          </div>
          <div className="border-[2px] rounded-lg">
            <h3 className="text-lg font-semibold p-2 " >{authUser.email}</h3>
          </div>
          <div className="flex">
              <Watch />
              <label className="text-lg pl-2">Ngày tạo: </label>
          </div>
          <div className="border-[2px] rounded-lg">
            <h3 className="text-lg font-semibold p-2 ">{vietnamTime}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
