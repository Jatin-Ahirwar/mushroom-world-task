import { ConnectDB } from "@/dbConfig/dbConfig";
import Task from "@/models/taskModel";
import { NextResponse } from "next/server";

ConnectDB();

export async function POST(request) {
    try {   
        const reqBody = await request.json();
        const { taskID, title, description } = reqBody;
        
        console.log(taskID, title, description);
        
        const task = await Task.findById(taskID);
        if (!task) {
            return new NextResponse(JSON.stringify({ error: "Task not found" }), { status: 404 });
        }

        // Update the title only if it's provided and non-empty
        if (title && title.trim().length > 0) {
            task.title = title;
        }
        
        // Update the description only if it's provided and non-empty
        if (description && description.trim().length > 0) {
            task.description = description;
        }

        await task.save();

        return new NextResponse(JSON.stringify({ success: true, task }), { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
