import { NextResponse } from "next/server";


exports.sendToken = (User,statuscode,res) =>{
    const token = User.getjwttoken()

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE *24 * 60 * 60 * 1000
        ),
        httpOnly:true,
        secure:true
    }
    Response
    .cookie.set("token",token,options)
    .json({ success: true , id: User._id , token } , {status: statuscode})
}


