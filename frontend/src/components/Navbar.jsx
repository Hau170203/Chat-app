import { LogOut, Settings, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { useEffect } from "react"
import logo from "../assets/R.png"

export const Navbar = () => {
    
    const {logout, authUser, CheckAuth} = useAuthStore();
    const navigate = useNavigate();
    useEffect(() =>{
        CheckAuth();
    },[]);

    const handleLogOut = () => {
        logout();
        navigate('/login')
    }
  return (
    <header
        className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-50 backdrop-blur-lg bg-base-100/80 shadow-md"
        >
        <div className=" mx- px-4 h-16">
            <div className="flex items-center justify-between h-full">
                <div className="flex items-center gap-8">
                    <Link to={'/'} className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex justify-center items-center">
                        <img src={logo} alt="logo"  />
                        </div>
                        <h1 className="text-lg font-bold">Chat</h1>
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <Link to={'/settings'}  className="btn btn-sm gap-2 transition-colors">
                        <Settings className="w-4 h-4"/>
                        <span className="hidden sm:inline">Settings</span>
                    </Link>
                    {authUser && (
                        <>
                            <Link to={"/profile"} className="btn btn-sm gap-2" >
                            <User className="size-5"  />
                            <span className="hidden sm:inline">Profile</span>
                            </Link>
                            <button className="btn btn-sm gap-2" onClick={handleLogOut}>
                                <LogOut size={20} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    </header>
  )
}
