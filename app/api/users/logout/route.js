import { ConnectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

// Ensure the database connection
ConnectDB();

export async function GET(request) {
    try {
        // Check if the user is already logged out
        const token = request.cookies.get("OutSideJWT");
        if (!token) {
            // If no token is found, prompt the user to sign in
            return NextResponse.json({ message: "Please sign in to access the resource" }, { status: 401 });
        }

        // Create a response object
        const response = NextResponse.json({
            message: "Logout successfully",
            success: true,
        });

        // Clear the token cookie
        response.cookies.set("OutSideJWT", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0),  // Set the expiry date to the past to invalidate the cookie
            path: "/",  // Ensure the cookie is cleared for the entire site
        });

        // Return the response
        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
