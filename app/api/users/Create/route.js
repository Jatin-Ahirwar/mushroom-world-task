import { ConnectDB } from "@/dbConfig/dbConfig";
import Task from "@/models/taskModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

ConnectDB()

export async function POST(request){
    try {
        const reqBody = await request.json();
        const { title , description , id } = reqBody;
        console.log( title , description , id )

        if (!id || !title || !description){
            return NextResponse.json({ error: "Oops some field is missing" }, { status: 500 });
        }

        const user = await User.findById(id);
        if (!user) {
            return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        const task = new Task({ 
            user: id,
            title,
            description 
        });
        await task.save();

        // user.tasks.push(task._id);
        await User.updateOne(
            { _id: id },
            { $push: { tasks: task._id } }
        );
        // await user.save();

        return new NextResponse(JSON.stringify({ success: true, task }), { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}