import express from 'express';
const router =  express.Router()

import { getSignUpController,postSignUpController } from '../../controllers/signup/signup.controller'

router.get('/',getSignUpController)
router.post('/',postSignUpController)




export = router