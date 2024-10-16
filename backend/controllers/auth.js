const User=require("../models/User")
const Otp =require("../models/otp")
const otpGenerator=require("otp-generator")
exports.sendOtp=async(req,res)=> {
    try {
        const {email}=req.body;

        // check if user already exists
        const existingUser=await User.findOne({email:email});
        if(existingUser) {
            return res.status(401).json({
                success:false,
                message:"user already exist please got to log in page"
            });
        }
        //generate otp
        var otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });

        // check if this otp is unique or not ie. already in db or not
        const result=await Otp.findOne({otp:otp});
        while(result) {
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });
            const result=await Otp.findOne({otp:otp});
        }
        const otpBody=await Otp.create({
            email,
            otp
        })
        return res.status(200).json({
            success:true,
            message:"otp sent successfully",
            otp,
            data:otpBody 
        });
        
    }catch(e) {
        res.status(500).json({
            success:false,
            message:e.message
        });
    }
}