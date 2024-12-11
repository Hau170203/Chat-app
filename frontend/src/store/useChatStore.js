import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSendMessage: false,

    getUsers: async () => {
        set({isUsersLoading: true});
        
        try {
            const res = await axiosInstance.get("/messages/list-user");
            set({users: res.data});
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        } finally{
            set({isUsersLoading: false})
        }
    },

    getMessages: async (userId) => {
        set({isMessagesLoading: true});

        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data})
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally{
            set({isMessagesLoading: false})
        }
    },
    sendMessage: async (messageData) => {
        const {selectedUser, messages} = get();
        set({isSendMessage: true});
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({messages: [...messages, res.data]})
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isSendMessage: false});
        }
    },
    subscribeToMessage: () => {
        const { selectedUser } = get();

        if(!selectedUser)  return;
        const socket = useAuthStore.getState().socket;
        socket.on("newMessage",(newMessage) => {
            const isSendFromSelectUser = selectedUser._id === newMessage.senderId;
            if(!isSendFromSelectUser) return;
            set({messages: [...get().messages, newMessage]});
        })
    },
    unSubscribeFromMessage: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },
    setSelectedUser: (user) => set({selectedUser: user})
}))