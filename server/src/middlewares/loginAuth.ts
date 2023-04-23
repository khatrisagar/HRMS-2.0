import express, {Request, Response,NextFunction} from "express"
import jwt from 'jsonwebtoken'

const auth =  (req:Request,res:Response,next:NextFunction)=>{
    try{
    let token:any = req.headers.authorization || null
    token = token.split(' ')[1]

    if(token){
        try{
            const decodeJwtToken:any = jwt.verify(token, process.env.TOKEN_KEY!);
            if(decodeJwtToken){

                // for valid token
                res.locals.userData = decodeJwtToken
                next()
            }
        }
        catch(err){
            // invalid token error
            res.json({validUser:false,err:"Unauthenticated User"})
        }
    }
    else{
        res.json({validUser:false,err:"Unauthenticated User"})
    }
    
   }
   catch(err){
        // internal server error 
        res.status(200).json({validUser:false,err:"Unauthenticated User"})
   }
}

export = auth