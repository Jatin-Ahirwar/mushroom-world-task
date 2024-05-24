import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        require:true
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
},{timestamps:true})


const Task = mongoose.models.tasks || mongoose.model("tasks" , taskSchema)

export default Task