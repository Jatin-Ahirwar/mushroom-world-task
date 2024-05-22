import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";

exports.isAuthenticated = async (req,res,next)=>{
    try {
        const { token } = req.cookies;
        if(!token){
            return next(
                NextResponse.json("Please login with your account" , 401)
            )
        }
        const { id } = jwt.verify(token,process.env.JWT_SECRET)
        req.id = id;
        next()
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

