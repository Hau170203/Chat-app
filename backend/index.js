import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './src/routes/auth.route.js'
import messageRoute from './src/routes/message.route.js'
import { connectDB } from './src/lib/connectdb.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { app, server } from './src/lib/socket.js';


dotenv.config();

const port = process.env.PORT;

// connect mongoDB

connectDB();
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" })); // Tăng giới hạn body lên 10MB
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/api/auth', authRoute);
app.use('/api/messages', messageRoute)
server.listen(port, () => {
    console.log(`Server is running on port ${port} `)
});