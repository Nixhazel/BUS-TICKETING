import express, { Request, Response, NextFunction } from "express";
import { logIn, register } from '../controller/user';
const router = express.Router();


router.post("/register", register);
router.post("/login", logIn);

export default router;
