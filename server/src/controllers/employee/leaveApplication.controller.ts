import express, {Request, Response} from "express"
import whereCondition from "../../helper/whereCondition";
import findData from "../../services/Other/find.service";
import selectData from "../../services/CRUD/select.service";
import insertData from "../../services/CRUD/insert.service";

const getLeaveApplicationController =async (req:Request, res:Response) =>{

    try{
        const userData = res.locals.userData;
        // console.log(userData);

        const findUserWhereCondition:any = whereCondition(
            ['emp_id'],
            [`${userData.employeeId}`]
        )
        const leaveApplicationWhereCondition:any = whereCondition(
            ['fk_emp_id'],
            [`${userData.employeeId}`]
        )
   
        const verifyUserExist = await findData(
            "hrms_employee", // find query table name
            ["emp_id "],   // find query column name array
            findUserWhereCondition     // find query where condition
        )
        if (!verifyUserExist.result) {
            res.json({ err: "User Not Exist" });
        }
        else{
            const userData = await selectData(
                "leave_application",   // select query table name
                ["leave_id", "leave_date", "leave_type","is_halfday", "leave_reason", "is_cto_approved","is_hr_approved"],  // select query column name array
                leaveApplicationWhereCondition,   // select query where condition
            )

            var leavesObject  = {
                sLeave: 0,
                cLeave:0,
                pLeave: 0,
                upLeave:0
            }

            for(let x of userData){

                if(x.leave_type == 'SL' && x.is_hr_approved === 1){
                    if(x.is_halfday === 1){
                        leavesObject.sLeave+=0.5;
                    }
                    else if(x.is_halfday == 0){
                        leavesObject.sLeave+=1;
                    }
                }
                else if(x.leave_type == 'CL' && x.is_hr_approved === 1){
                    if(x.is_halfday == 1){
                        leavesObject.cLeave+=0.5;
                    }
                    else if(x.is_halfday == 0){
                        leavesObject.cLeave+=1;
                    }
                }
                else if(x.leave_type == 'PL' && x.is_hr_approved === 1){
                    if(x.is_halfday == 1){
                        leavesObject.pLeave+=0.5;
                    }
                    else if(x.is_halfday == 0){
                        leavesObject.pLeave+=1;
                    }
                }
                else if(x.leave_type == 'UPL' && x.is_hr_approved === 1){
                    if(x.is_halfday == 1){
                        leavesObject.upLeave+=0.5;
                    }
                    else if(x.is_halfday == 0){
                        leavesObject.upLeave+=1;
                    }
                }
            }


            res.json({userData: leavesObject})
        } 
    }
    catch(err){
       res.json({ err: "Something went Wrong" });

    }
}  

const postLeaveApplicationController =async (req:Request, res:Response) =>{
    try{
        const userData = res.locals.userData;

        const leaveApplicationColumnArr = ["fk_emp_id","leave_date","leave_reason","leave_type","is_halfday"]
        const leaveApplicationDataObject = [`${userData.employeeId}`,`${req.body.leave_date}`,`${req.body.leave_reason}`,`${req.body.leave_type}`,`${req.body.is_halfday}`]

        insertData(
            "leave_application",   // leave application table name
            leaveApplicationColumnArr, // leaveapplication column arr
            leaveApplicationDataObject, // leave appliction column value arr
        )

        res.json({success:"Leave Applied successfully"})
    }
    catch(err){
        res.json({ err: "Something went Wrong" });
    }
}


export {getLeaveApplicationController, postLeaveApplicationController}