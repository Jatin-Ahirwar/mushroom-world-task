// import { ConnectDB } from "@/dbConfig/dbConfig";
// import Task from "@/models/taskModel";
// import User from "@/models/userModel";
// import { NextResponse } from "next/server";

// ConnectDB();

// export async function POST(request) {
//     try {   
//         const reqBody = await request.json();
//         const { TaskID , UserID } = reqBody;
        
//         const task = await Task.findByIdAndDelete(TaskID);
//         if (!task) {
//             return new NextResponse(JSON.stringify({ error: "Task not found" }), { status: 404 });
//         }
        
//         const user = await User.findById(UserID);
//         if (!user) {
//             return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 });
//         }
        
//         await User.deleteOne(
//             { _id: userid },
//             { $pull: { tasks: task._id } }
//         );

//         await task.save()

//         return new NextResponse(JSON.stringify({ success: true }), { status: 201 });

//     } catch (error) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }

import { ConnectDB } from "@/dbConfig/dbConfig";
import Task from "@/models/taskModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

ConnectDB();

export async function POST(request) {
    try {   
        const reqBody = await request.json();
        const { TaskID , UserID } = reqBody;
        
        // Find and delete the task
        const task = await Task.findById(TaskID);
        if (!task) {
            return new NextResponse(JSON.stringify({ error: "Task not found" }), { status: 404 });
        }
        
        await task.deleteOne();

        // Find and update the user
        const user = await User.findById(UserID);
        if (!user) {
            return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 });
        }
        
        // Remove the TaskID from the user's tasks array
        await User.findOneAndUpdate(
            { _id: UserID },
            { $pull: { tasks: TaskID } }
        );
        
        return new NextResponse(JSON.stringify({ success: true }), { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
