import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import authRoutes from './routes/auth.route.js'
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/posts.route.js'
import likeRoutes from './routes/like.route.js'
import commentRoutes from './routes/comment.route.js'


const app = express();
const port = process.env.PORT;


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}
));
app.use(express.json());
app.use(cookieParser())

// route calls

app.use('/api/auth', authRoutes)
app.use("/api/posts", postRoutes);
app.use("/api/likes",likeRoutes)
app.use('/api/comments',commentRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Reporting from port: ${port}`);
    connectDB()
});

console.log(process.env.PORT);
