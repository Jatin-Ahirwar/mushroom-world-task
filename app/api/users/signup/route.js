import { ConnectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest , NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { sendToken } from "@/utils/sendToken";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

ConnectDB()
const Max_Age = 60 * 60 * 24 * 30


export async function POST(req,res) {
    
    try {   
    
        const reqBody = await req.json();
        const { email, password } = reqBody;

        console.log(email,password);

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({ error: "User already exist with this email address" }, { status: 400 });
        }

        const NewUser = await new User({
            email,
            password
        }).save()

        const secret = process.env.JWT_SECRET

        const token = sign({
            email    
        },
        secret,
        {
            expiresIn:Max_Age
        }
        )

        const seralized = serialize("OutSideJWT" , token ,{
            httpOnly:true, 
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge:Max_Age, 
            path:"/"
        })

        const response = {
            message:"Signup Success",
            token
        }
        return new NextResponse(JSON.stringify(response),{
            status:201,
            headers:{ 'Set-Cookie' : seralized},
        })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}