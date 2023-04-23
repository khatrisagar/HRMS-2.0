import express from 'express';
const router =  express.Router()

// leave routes
import {getLeaveApplicationController,postLeaveApplicationController} from '../../controllers/employee/leaveApplication.controller';

router.get('/leave-Application', getLeaveApplicationController)
router.post('/leave-Application', postLeaveApplicationController)

// checkin  routes 
import { postCheckInController,postCheckOutController } from '../../controllers/employee/checkIn.controller';

router.post('/check-in',postCheckInController)

export = router