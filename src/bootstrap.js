import connectDB from '../DB/connection.js'
import userRouter from './modules/user/user.router.js'
import authRouter from  './modules/auth/auth.router.js'
import messageRouter from './modules/user/message/message.router.js';

const bootstrap = (app, express) => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/auth", authRouter)
    app.use("/user", userRouter)
    app.use("/message", messageRouter);
    app.get('/', (req, res) => res.send('hello world'))
    app.use("/api/v1/message", messageRouter);
    // Global error handler
app.use((err, req, res, next) => {
  console.error("💥 ERROR:", err); // يظهر تفاصيل الخطأ في التيرمنال
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message || err
  });
});

    
    connectDB()
}

export default bootstrap

