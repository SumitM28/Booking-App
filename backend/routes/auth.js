import { Router } from "express";
import { login, register } from "../controllers/auth.js";

const router=Router();

// register route
router.post('/register',register)

// login route
router.post('/login',login)
export default router; 