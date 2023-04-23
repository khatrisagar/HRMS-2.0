import express, { Request, Response } from "express";
import  findData  from "../../services/Other/find.service";
import insertData from "../../services/CRUD/insert.service";
import whereCondition from "../../helper/whereCondition";
import bcrypt from "bcryptjs";

export const getSignUpController = (req: Request, res: Response): any => {
  res.send("signup routes");
};

export const postSignUpController = async (req: Request, res: Response) => {
  try {
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

    if (verifyUserExist.result) {
      res.json({ err: "Email Already Exist" });
    } 
    else {
      const encryptedPassword = await bcrypt.hash(userPassword, 10); // pass and salt

      insertData(
        "hrms_employee",    // table name
        ["email", "password"],    // column name array
        [userEmail, encryptedPassword]   // column values array
      );
      res.json({message:"User Registered Successfully"})
    }

    
  } catch (err) {
    res.json({ err: "Something went Wrong" });
  }
};
