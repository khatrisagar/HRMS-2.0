import nodemailer from 'nodemailer';
import executeQuery from '../services/Other/queryExecuter.service';




let OTP:number | undefined;
let userEmail:string;

const sendForgotPasswordEmail = async(rew:Request,res:Response) =>{
    // OTP =  Math.floor(Math.random()*10000);
 


    sendMail(userEmail)
    OTP = undefined ;
}




const sendMail  = async(userEmail:string)=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    })

    let mailInfo = {
        from: `"HRMS" <process.env.email>`,
        to: userEmail,
        subject: 'Welcome to HRMS',
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid
        #EEE
        ">
        <a href="" style="font-size:1.4em;color:
        #00466A
        ;text-decoration:none;font-weight:600">Your Brand</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing our Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
        <h2 style="background:
        #00466A
        ;margin: 0 auto;width: max-content;padding: 0 10px;color:
        #FFF
        ;border-radius: 4px;">${OTP}</h2>
        <p style="font-size:0.9em;">Regards,<br />EsparkBiz</p>
        <hr style="border:none;border-top:1px solid
        #EEE
        " />
        </div>
        </div>`
    }

    transporter.sendMail(mailInfo, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent successfully');
        }
    })
}

export = sendForgotPasswordEmail