const nodemailer=require("nodemailer");
require("dotenv").config();
const mailSender=async (email,title,body)=> {
    console.log("reciep",email,title,body)
    try {
        let mailTransporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth: {
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        });
        let info =await mailTransporter.sendMail({
            from:"DFS-BFS-GRAPH-TRAVERSE",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        });
        return info;
    }catch(e) {
        console.log("error in mail sender function",e);
    }
}

module.exports=mailSender;