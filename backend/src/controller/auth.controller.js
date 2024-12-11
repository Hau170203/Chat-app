import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs"

// [POST] /api/auth/signup
export const signUp = async (req, res) => {
    try {
        const { email, fullName, password, profilePic } = req.body;

        if (!email || !fullName || !password) {
            return res.status(401).json({ message: "Vui lòng nhập đầy đủ thông tin" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Vui lòng nhập nhiều hơn 6 ký tự" });
        }

        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "email đã tồn tại" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email,
            fullName: fullName,
            password: hashedPassword,
            profilePic: profilePic
        });

        if (newUser) {
            generateToken(newUser.id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,

            })
        } else {
            res.status(400).json({ message: "Không tồn tại user data" })
        }
    } catch (error) {
        console.log("Error in sign up controller", error.message);
        res.status(500).json({ message: " server error" })
    }
}

// [POST] /api/auth/login
export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: "Tài khoản không tồn tại" });
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).json({ message: "Mật khẩu sai vui lòng nhập lại" });
        }


        generateToken(user.id, res);

        res.status(200).json({
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log("Error login controller: ", error.message);
        res.status(500).json({ message: " server error" });
    }
}


// [POST] /api/auth/logout
export const logOut = (req, res) => {
    try {
        res.cookie("jwtToken", "", { maxAge: 0 });
        res.status(200).json({ message: "LogOut thành công " })
    } catch (error) {
        console.log("Error logOut controller: ", error.message);
        res.status(500).json({ message: "server error" });
    }
}

// [PUT] /api/auth/update-profile
export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user.id;
        if(!profilePic) {
            return res.status(400).json({message: "Vui lòng tải ảnh"});
        }
        const uploadRes = await cloudinary.uploader.upload(profilePic);
        const userUpdate = await User.findByIdAndUpdate( { _id: userId }, {profilePic: uploadRes.secure_url},{new: true}).select("-password");
        res.status(200).json(userUpdate);
    } catch (error) {
        console.log("Error in update profile: ", error);
        res.status(500).json({message: "Server error"})
    }
}

// [GET] /api/auth/detai-user
export const detailUser = (req, res) => {
    try {
        const user = req.user;
        // console.log(user);
        res.status(200).json(user);
    } catch (error) {
        console.log(" Error detailUser controller", error);
        res.status(500).json({message: "ERROR SERVER"});
    }
}