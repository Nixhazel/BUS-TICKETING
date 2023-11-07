import express from "express";
import { buyTicket, creditAccount, getBalance } from '../controller/busTicket';
import { authenticate } from '../middleware/auth';
const router = express.Router();


router.post("/buy", authenticate, buyTicket);
router.get("/balance/:userId", authenticate, getBalance);
router.post("/credit", authenticate, creditAccount);

export default router;
