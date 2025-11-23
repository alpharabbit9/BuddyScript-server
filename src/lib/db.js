import mongoose from "mongoose";

export const connectDB  = async() =>{

    try {
        
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected : ", conn.connection.host)
    } catch (error) {

        console.error("Error in Connecting to DB", error);
        process.exit(1); //1 stands for failure , 0 stands for success
        
    }
}