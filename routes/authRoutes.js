import express from "express"
import { registerController, loginController } from "../controllers/authController.js";
// router object 
const router = express.Router()

// register || post method 
router.post("/register", registerController)
//login controller|| post method 
router.post("/login", loginController)
export default router