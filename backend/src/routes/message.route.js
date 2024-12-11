import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { detailMessage, getListUser, sendMessage } from '../controller/message.controller.js';

const router = express.Router();

router.get('/list-user', protectRoute, getListUser);
router.get("/:id", protectRoute, detailMessage);

router.post("/send/:id", protectRoute, sendMessage);
export default router;