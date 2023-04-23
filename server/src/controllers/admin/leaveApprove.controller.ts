import express, {Request, Response} from "express"
import updateData from "../../services/CRUD/update.service"
import whereCondition from "../../helper/whereCondition"

const getLeaveApproveController = (req:Request,res:Response)=>{
    try{
        
    }
    catch(err){
        res.status(500).json({err:"Something went wrong"})
    }
}



const postLeaveApproveController = (req:Request,res:Response)=>{
    try{

        let updateCondation:any = whereCondition(
            ['leave_id'],
            [`${req.query.leaveId}`]
        )

        let leaveColumnArr = [`${req.query.field}`]
        let leaveValueArr = [`${req.query.fieldValue}`]

        updateData("leave_application", leaveColumnArr, leaveValueArr, updateCondation)

        res.json({success: "Leaves Approved Successfully"})
    }
    catch(err){
        res.status(500).json({err:"Something went wrong"})
    }
}


export {getLeaveApproveController, postLeaveApproveController}