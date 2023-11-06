import express, { Request, Response, NextFunction } from "express";
import { test } from '../controller/user';
const router = express.Router();

/* GET home page. */
router.get("/", test);

export default router;
