import express from 'express';
const router =  express.Router()


import { getLoginController, postLoginController } from '../../controllers/login/login.controller'
import auth from '../../middlewares/loginAuth'

router.get('/' ,auth,getLoginController)
router.post('/',postLoginController)




export = router