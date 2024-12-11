import React, { useState } from 'react'
import { User, Mail, LockKeyhole, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

export const SignLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });
 
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (formData.fullName.trim().length < 1) {
      return toast.error("Vui lòng nhập họ tên!");
    }
    if (formData.email.trim().length < 1) {
      return toast.error("Vui lòng nhập email!");
    }
    if (formData.email.length < 1 || !/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Vui lòng nhập một email hợp lệ!");
    }

    if (formData.password.length < 6) {
      return toast.error("Vui lòng nhập từ 6 kí tự trở lên!");
    }
    return true
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidate = validateForm();
    if (isValidate === true) {
      const isComplete = await signup(formData);
      // console.log(isComplete)
      if (isComplete) {
        navigate('/')
      }
    }
  }
  
  return (
    <>
        <div className="min-h-screen grid lg:grid-cols-2 justify-center">
          {/* left */}
          <div className="flex flex-col justify-center items-center p-6 sm:p-12">
            <div className="w-full max-w-md space-y-8">
              {/* Form */}
              <form onSubmit={handleSubmit} className=" space-y-5 rounded-lg  mt-4 p-3" style={{ boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                <div className="form-control">
                  <label htmlFor="fullName" className='label'>
                    <span className="label-text font-medium">Full Name</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className='size-5 text-base-content/40' />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      className="input input-bordered w-full pl-10"
                      placeholder='Lê Văn A '
                      required
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label htmlFor="Email" className='label'>
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className='size-5 text-base-content/40' />
                    </div>
                    <input
                      type="email"
                      name="Email"
                      className="input input-bordered w-full pl-10"
                      placeholder='VanA123@gmail.com'
                      required
                      autoComplete="email"
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label htmlFor="password" className='label'>
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockKeyhole className='size-5 text-base-content/40' />
                    </div>
                    <input
                      type="password"
                      name="password"
                      className="input input-bordered w-full pl-10"
                      placeholder='*****'
                      required
                      autoComplete="current-password"
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </div>
                <button type='submit' className='btn btn-primary w-full text-white' disabled={isSigningUp}>
                  {isSigningUp ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Tạo tài khoản"
                  )}
                </button>
                <div className="  flex  justify-center">
                  <p className='text-base-content/40 pr-1'>Đăng nhập nếu bạn có tài khoản?</p>
                  <span>
                    <Link to={"/login"} className="text-blue-400">Sign in</Link>
                  </span>
                </div>
              </form>

            </div>
          </div>

          {/* rigth */}
          <div className="w-full flex flex-col justify-center items-center p-6 sm:p-12">
            <div className="text-center mb-8 max-w-md">
              <div className=" flex flex-col items-center justify-center">
                <div >
                  <img src="https://th.bing.com/th/id/R.7ed88e34422ab9fa2554f689c642870a?rik=fTBYLe8Dy23TTw&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fxcg%2fLdk%2fxcgLdknai.png&ehk=AWio1emyK6gBrMn53Cjn3KN%2f81kK%2bgJ1D3WJDPP3RDc%3d&risl=&pid=ImgRaw&r=0" alt="logo" style={{ width: "150px", height: "150px" }} />
                </div>
                <h1 className='text-2xl font-bold mt-2'>Tạo tài khoản chat</h1>
                <p className='text-base-content/60'>Bắt đầu với tài khoản miễn phí của bạn</p>

                <h3 className='text-xl font-semibold'> Tham gia cộng đồng của chúng tôi. Kết nối với bạn bè, chia sẻ khoảnh khắc và giữ liên lạc với những người thân yêu.</h3>

              </div>
            </div>
          </div>
        </div>
      
    </>
  )
}
