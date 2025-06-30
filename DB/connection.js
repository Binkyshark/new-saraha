import mongoose from "mongoose";


const connectDB = async () => {
     return await mongoose.connect(process.env.DB_URL).then(res=>{
        console.log(`DB connected ....`);
    }).catch(err=>{
        console.log(`fail to connectDB.....${err}`);
    })
}

export default connectDB