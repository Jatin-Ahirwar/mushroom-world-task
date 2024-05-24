// import { ConnectDB } from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";


// const Max_Age = 60 * 60 * 24 * 30;

// export async function POST(request) {
//     await ConnectDB();

//     const token = request.cookies.get('OutSideJWT')?.value;

//     if (!token || typeof token !== 'string') {
//         return NextResponse.json({ error: 'Sign in to access the resource.' }, { status: 401 });
//     }

//     try {
//         const secret = process.env.JWT_SECRET;
//         const decoded = jwt.verify(token, secret);

//         const user = await User.findById(decoded.id).populate("tasks").select('-password'); // Exclude password

//         if (!user) {
//             return NextResponse.json({ error: "User not found" }, { status: 404 });
//         }

//         return NextResponse.json({ success: true, user }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
//     }
// }


import { ConnectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

ConnectDB();

const secret = process.env.JWT_SECRET;
const Max_Age = 60 * 60 * 24 * 30;

async function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error) {
        console.error("Error verifying token:", error);
        return null;
    }
}

export async function POST(request) {
    const token = request.cookies.get('OutSideJWT')?.value;

    if (!token || typeof token !== 'string') {
        return NextResponse.json({ error: 'Sign in to access the resource.' }, { status: 401 });
    }

    try {
        const decodedToken = await verifyToken(token);

        if (!decodedToken || !decodedToken.email) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const userEmail = decodedToken.email;
        const user = await User.findOne({ email: userEmail }).populate("tasks").select('-password');

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // console.log("User found:", user);

        return NextResponse.json({ success: true, user }, { status: 200 });

    } catch (error) {
        console.error("Error accessing user route:", error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
