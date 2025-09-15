import mongoose from "mongoose";


export const connectionToDb = async() => {
     try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Successfully connected to the Database');
     }catch(e){
        console.error('Failed to connect to the database - ' , e.message);
     }
}
