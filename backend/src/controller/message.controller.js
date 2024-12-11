import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../model/message.model.js";
import User from "../model/user.model.js";

// [GET] /message/list-user
export const getListUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const listUser = await User.find({ _id: { $ne: userId } }).select(" -password");

        res.status(200).json(listUser)
    } catch (error) {
        console.log("Error Message controller ", error);
        res.status(500).json({ message: "ERROR SERVER" })
    }
}

// [GET] /message/:id
export const detailMessage = async (req, res) => {
    try {
        const userToId = req.params.id;
        const myId = req.user.id;

        // console.log(userToId);
        // console.log(myId);

        const listMessage = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToId },
                { senderId: userToId, receiverId: myId }
            ]
        });

        res.status(200).json(listMessage);
    } catch (error) {
        console.log("Error messager controller: ", error);
        req.status(500).json("ERROR SERVER");
    }
}

// [POST] /send/:id

export const sendMessage = async (req, res) => {
    try {
        const idReceiver = req.params.id;
        const idSender = req.user.id;
        const { text, image } = req.body;

        let imageCloud;
        if (image) {
            const uploadImage = await cloudinary.uploader.upload(image);
            imageCloud = uploadImage.secure_url;
        }

        const newMessage = new Message({
            senderId: idSender,
            receiverId: idReceiver,
            text: text,
            image: imageCloud
        });
        await newMessage.save();

        const receiverId = getReceiverSocketId(idReceiver);

        if(receiverId) {
            io.to(receiverId).emit("newMessage",newMessage);
        }


        res.status(200).json(newMessage)
    } catch (error) {
        console.log("Error Message controller", error);
        res.status(500).json("ERROR SERVER")
    }
}