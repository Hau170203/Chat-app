import { Loader2, LockKeyhole, User } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const LoginPage = () => {
  const { isLoggingIng, login } = useAuthStore();
  const navigate = useNavigate();
  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: ""
  })
  const validateForm2 = () => {
    if (formDataLogin.email.trim().length < 1) {
      return toast.error("Vui lòng nhập email!");
    }
    if (formDataLogin.email.length < 1 || !/\S+@\S+\.\S+/.test(formDataLogin.email)) {
      return toast.error("Vui lòng nhập một email hợp lệ!");
    }

    if (formDataLogin.password.length < 6) {
      return toast.error("Vui lòng nhập từ 6 kí tự trở lên!");
    }
    return true
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const isCheck = validateForm2();
    if (isCheck) {
      const isComplete = await login(formDataLogin);
      if (isComplete) {
        navigate("/")
      }
    }
  }
  return (
    <div className="min-h-screen grid lg:grid-cols-2 justify-center">
      {/* left */}
      <div className="w-full flex flex-col justify-center items-center p-6 sm:p-12">
        <div >
          <img src="https://th.bing.com/th/id/R.7ed88e34422ab9fa2554f689c642870a?rik=fTBYLe8Dy23TTw&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fxcg%2fLdk%2fxcgLdknai.png&ehk=AWio1emyK6gBrMn53Cjn3KN%2f81kK%2bgJ1D3WJDPP3RDc%3d&risl=&pid=ImgRaw&r=0" alt="logo" style={{ width: "150px", height: "150px" }} />
        </div>
        <h1 className="text-2xl font-bold my-3">Đăng nhập</h1>
        <h3 className='text-xl font-semibold mb-1'>Chào mừng quay trở lại !</h3>
        <p className='text-lg '>Đăng nhập để tiếp tục cuộc trò chuyện và theo dõi tin nhắn của bạn.</p>
      </div>
      {/* right */}
      <div className=' flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-x-8'>
          <form className="rounded-lg space-y-5 mt-4 p-3" style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
            <div className="form-control">
              <label htmlFor="email" className='label '>
                <span className="label-text font-medium text-base">Email:</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
                  <User className='size-5 text-base-content/60' />
                </div>
                <input type="email"
                  name="email"
                  id="email"
                  className="w-full input input-bordered pl-10"
                  placeholder='ABC@gmail.com'
                  autoComplete='email'
                  required
                  value={formDataLogin.email}
                  onChange={e => setFormDataLogin({ ...formDataLogin, email: e.target.value })}
                />
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="password" className='label'>
                <span className="label-text font-medium" >Password:</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 top-0 left-0 flex items-center pl-3 pointer-events-none ">
                  <LockKeyhole className="size-5 text-base-content/60" />
                </div>
                <input type="password"
                  name="password"
                  id="password"
                  required
                  className="input input-bordered w-full pl-10"
                  autoComplete='current-password'
                  value={formDataLogin.password}
                  onChange={e => setFormDataLogin({ ...formDataLogin, password: e.target.value })}
                />
              </div>
            </div>
            <button type='submit' className='w-full btn btn-primary text-white' disabled={isLoggingIng} onClick={handleLogin}>
              {isLoggingIng ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Đăng nhập"
              )}
            </button>
            <div className="flex justify-center">
              <p>Đăng ký nếu bạn chưa có tài khoản </p>
              <Link to={'/signup'}  className="pl-1 text-blue-400">Đăng ký</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
