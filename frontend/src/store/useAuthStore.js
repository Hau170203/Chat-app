import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";


const BASE_URL = "http://localhost:3001";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,


    CheckAuth: async () =>{
        try {
            const res = await axiosInstance.get("/auth/detail-user");
            set({authUser: res.data});
            get().connectSocket();
        } catch (error) {
            // console.log("Error in checkAuth: ", error)
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },
    signup: async (data) => {
        try {
            set({isSigningUp: true});
            const res = await axiosInstance.post('/auth/signup',data);
            set({authUser: res.data});
            toast.success("Tạo tài khoản thành công");
            get().connectSocket();
            return true
        } catch (error) {
            toast.error(error);
            console.log(error);
            return false
        } finally {
            set({isSigningUp: false});
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({authUser: null});
            get().disConnectSoket();
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message)
        }
    },
    login: async (data) => {
        try {
            set({isLoggingIng: true})
            const res = await axiosInstance.post('/auth/login', data);
            toast.success("Đăng nhập tài khoản thành công!")
            set({authUser: res.data });
            get().connectSocket();
            return true
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
            return false
        } finally {
            set({isLoggingIng: false})
        }
    },
    updateProfile: async (data) => {
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({authUser: res.data});
            // console.log(res.data)
            toast.success("Cập nhật thành công ")
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        } finally {
            set({isUpdatingProfile: false});
        }
    },
    connectSocket: () => {
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id
            }
        });
        socket.connect();

        set({socket: socket});

        socket.on("getOnlineUser", (userId) => {
            set({onlineUsers: userId})
        })
    },
    disConnectSoket: () => {
        if(get().socket?.connected ) get().socket?.disConnectSoket();
    }
  }));