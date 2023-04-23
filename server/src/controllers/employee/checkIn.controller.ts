import express, { Request, Response } from "express";
import whereCondition from "../../helper/whereCondition";
import findData from "../../services/Other/find.service";
import selectData from "../../services/CRUD/select.service";
import insertData from "../../services/CRUD/insert.service";
import moment from "moment";

const postCheckInController = async (req: Request, res: Response) => {
    try {
        const userData = res.locals.userData;
        const date = moment().format("YYYY-MM-DD HH:mm:ss");

        const checkInWhereCondition: string = whereCondition(
            ["fk_emp_id", "check_date"], // where condition column array
            [`${userData.employeeId}`, `${moment().format("YYYY-MM-DD")}`], // wherer condition column value array
            true // and true for combinig where condition
        );

        const isCheckInExist = await selectData(
            "check_system",
            ["check_system_id"],
            checkInWhereCondition
        );
        if (isCheckInExist.length > 0) {
            res.json({ message: "Already checkIn" });
        }
        else {
            insertData(
                "check_system",
                ["check_system_id", "check_date", "checkin_time"],
                [`${userData.employeeId}`, `${date}`, `${date}`]
            );
            res.json({ success: "CheckIn Success" });
        }

    } catch (err) {
        res.status(500).json({ err: "Something went Wrong" });
    }
};
const postCheckOutController = (req: Request, res: Response) => {
    try {
    } catch (err) {
        res.status(500).json({ err: "Something went Wrong" });
    }
};

export { postCheckInController, postCheckOutController };
