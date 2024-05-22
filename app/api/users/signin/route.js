import { ConnectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt, { sign } from "jsonwebtoken"
import { serialize } from "cookie";

ConnectDB()
const Max_Age = 60 * 60 * 24 * 30

export async function POST(request) {
    try {   
        const reqBody = await request.json();
        const { email, password } = reqBody;

        console.log(email,password);

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({ error: "User not found with this email address" }, { status: 400 });
        }
        
        const validPassword = await bcryptjs.compare(password, user.password )    
        
        if(!validPassword){
            return NextResponse.json({ error: "wrong credentials" }, { status: 400 });
        }
        
        const secret = process.env.JWT_SECRET

        const token = sign({
            email,
            id:user._id
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
            message:"Logged in successfully",
            success:true,
            token,
        }

        return new NextResponse(JSON.stringify(response),{
            status:201,
            headers:{ 'Set-Cookie' : seralized},
        })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}