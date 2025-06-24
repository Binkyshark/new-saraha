import connectDB from '../DB/connection.js'
import userRouter from './modules/user/user.router.js'
import authRouter from  './modules/auth/auth.router.js'
import messageRouter from './modules/user/message/message.router.js';

const bootstrap = (app, express) => {

    app.use(express.json());
    
    app.use("/auth", authRouter)
    app.use("/user", userRouter)
    app.use("/message", messageRouter);
    app.get('/', (req, res) => res.send('hello world'))
  
    
    connectDB()
}

export default bootstrap

