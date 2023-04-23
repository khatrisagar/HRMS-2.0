import express, {NextFunction, Request, Response} from "express"
import whereCondition from "../../helper/whereCondition"
import findData  from "../../services/Other/find.service";
import selectData from "../../services/CRUD/select.service";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const getLoginController =  (req:Request,res: Response, next: NextFunction): any=>{
        const userData = res.locals.userData
        res.json({message:"login routes"})
}

export const postLoginController =async (req:Request, res: Response) => {
    try{
        const { userEmail, userPassword } = req.body;

        const whereCon:any = whereCondition(
            ['email'],    // where condition column name array
            [`${userEmail}`]    // where condition column values
        );

        const verifyUserExist = await findData(
            "hrms_employee", // find query table name
            ["email"],   // find query column name array
            whereCon     // find query where condition
        )

        if (!verifyUserExist.result) {
          res.json({ err: "User Not Exist" });
        } 
        else{
            const userData = await selectData(
                "hrms_employee", // select query table name
                ['emp_id','email', 'password', 'isActivate', 'isDeleted', 'isAdmin'],  // select query column name array
                whereCon
            )
            
            const employeeId = userData[0].emp_id
            const encryptedPassword =  userData[0].password
            const authenticateUser =  await bcrypt.compare(userPassword,encryptedPassword);

            if(authenticateUser){
                const userAuthToken =  jwt.sign({employeeId,userEmail},process.env.TOKEN_KEY!)
                res.json({hrms_at: userAuthToken})
            }
            else{
                res.json({ err: "Invalid Email or Password" });
            }
        }
    }
    catch(err){
        res.json({ err: "Something went Wrong" });
    }
}