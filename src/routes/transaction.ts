import express from "express";
import { getTransactions, sendCredit } from '../controller/transactions';
import { authenticate } from '../middleware/auth';
const router = express.Router();


router.get("/transactions/:userId", authenticate, getTransactions);
router.post("/send-credit", authenticate, sendCredit);

export default router;
