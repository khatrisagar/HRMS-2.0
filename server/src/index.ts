import express, {Request, Response} from "express"
import dotenv from "dotenv"
dotenv.config()
const app = express()
const PORT =  process.env.PORT || 9999
import conn from './config/dbConnection'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcryptjs'
import cors from 'cors'

app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json())


// signup and login routes

import loginRoute from './routes/login/login.routes'
app.use('/login', loginRoute)

import signUpRoute from './routes/signup/signup.routes'
app.use('/signup', signUpRoute)



// authentication routes
import auth from "./middlewares/loginAuth"
app.use(auth)

// employee dashboard routes

import dashboardRoute from './routes/employee/dashboard.routes'
app.use('/dashboard', dashboardRoute)


// admin routes

import adminDashboardRoute from './routes/admin/dashboard.routes'
app.use('/admin', adminDashboardRoute)




// employee routes

import employeeDashboardRoute from './routes/employee/dashboard.routes' 








// app.get('/', (req: Request, res: Response) => {
//     conn.query(`select * from hrms_employee`, function (err:Error,data: {}){

//         res.send(data)
//     })
// })


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})