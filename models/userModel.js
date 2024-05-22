import mongoose from "mongoose";
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']        
    },
    password:{
        type:String,
        require:[true , "Password is required"],
    },
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tasks"
    }],


},{timestamps:true})

userSchema.pre("save" , function(){
    let salt = bcryptjs.genSaltSync(10);
    this.password = bcryptjs.hashSync(this.password , salt)
})

userSchema.methods.comparepassword = function(password){
    return bcryptjs.compareSync(password, this.password)
}

userSchema.methods.getjwttoken = function (){
    return  jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}


const User = mongoose.models.users || mongoose.model("users" , userSchema)

export default User