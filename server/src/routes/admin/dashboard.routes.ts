import express from 'express';
const router =  express.Router()


import {getLeaveApproveController,postLeaveApproveController} from '../../controllers/admin/leaveApprove.controller';

router.get('/leaves', getLeaveApproveController)
router.post('/leaves', postLeaveApproveController)

export = router