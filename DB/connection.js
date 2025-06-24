import mongoose from "mongoose";


const connectDB = async () => {
    return await mongoose.connect(`mongodb://127.0.0.1:27017/sarahac40online`).then(res=>{
        console.log(`DB connected ....`);
    }).catch(err=>{
        console.log(`fail to connectDB.....${err}`);
    })
}

export default connectDB