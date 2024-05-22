import mongoose from "mongoose";

export async function ConnectDB (){
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        const connection = mongoose.connection

        connection.on("Connected", ()=>{
            console.log("DB connection successfull")
        })

        connection.on("error", (error)=>{
            console.log("DB connection facing some issues " + error)
            process.exit()
        })

    } catch (error) {
        console.log("Something went wrong in connection")
        console.log(error)
    }
}