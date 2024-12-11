import jwt from "jsonwebtoken"
import User from "../model/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwtToken;
      
        if (!token) {
            return res.status(401).json({ message: "Không có token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Token không hợp lệ" });
        }

        const user = await User.findById(decoded.userId).select(" -password");

        if (!user) {
            return res.status(401).json({ message: "Không có tài khoản này" });
        };

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protectRoute middleware ", error.message);
        res.status(500).json({message: " server error"})
    }
}