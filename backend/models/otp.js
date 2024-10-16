const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema=new mongoose.Schema({
    otp: {
        type:String,
        reqired:true
    },
    email: {
        type:String,
        trim:true,
        required:true
    },
    createdAt: {
        type:Date,
        default:Date.now(),
        expire:5*60*1000
    }
});

// function for email send
const emailVerification=async(email,otp)=> {
    try {
        const mailResponse=await mailSender(email,"verification email from DFS-BFS-GRAPH-TRAVERSE",otp);
        return mailResponse;

    }catch(e) {
        console.log("error while sending verification email in pre middleware",e);
    }
}
otpSchema.pre("save",async function(next) {
    await emailVerification(this.email,this.otp);
    next();
});

module.exports=mongoose.model("Otp",otpSchema);