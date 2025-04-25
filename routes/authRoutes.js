import express from "express"
import { registerController, testController, loginController } from "../controllers/authController.js";
import { isAdmin, requirSigIn } from "../middleware/authMiddleware.js";

// router object 
const router = express.Router()

// register || post method 
router.post("/register", registerController)
//login controller|| post method 
router.post("/login", loginController)

// test controller 
router.get("/test", requirSigIn, isAdmin, testController)
export default router