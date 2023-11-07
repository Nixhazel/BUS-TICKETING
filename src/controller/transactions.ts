import { Request, Response } from "express";
import { Transaction } from "../models/Transaction";
import { User } from '../models/User';

export const getTransactions = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;

		const transactions = await Transaction.findAll({ where: { userId } });

		if (transactions.length === 0) {
			return res
				.status(404)
				.send({
					message: "No transactions found for this user",
					success: false
				});
      }
      
      return res.status(201).send({
				success: true,
				path: req.url,
				message: `Transactions retrieved successfully`,
				data: { transactions }
			});
	} catch (error) {
		res.status(500).send({
			status: "error",
			error: error,
			path: req.url,
			message: "Failed to fetch transactions ",
			success: false
		});
	}
};

export const sendCredit = async (req: Request, res: Response) => {
   try {
      const { senderId, receiverId, amount } = req.body;

			
			const sender: any = await User.findByPk(senderId);
			const receiver = await User.findByPk(receiverId);

			if (!sender || !receiver) {
				return res
					.status(404)
					.send({ message: "User not found", success: false });
			}

			if (sender.balance < amount) {
				return res
					.status(400)
					.send({ message: "Insufficient balance", success: false });
			}

			const senderUpdatedBalance = sender.balance - amount;
			await sender.update({ balance: senderUpdatedBalance });

			const receiverUpdatedBalance = receiver.balance + amount;
			await receiver.update({ balance: receiverUpdatedBalance });

			await Transaction.create({
				userId: senderId,
				type: "debit",
				amount
			});

			await Transaction.create({
				userId: receiverId,
				type: "credit",
				amount
			});

      return res.status(201).send({
				success: true,
				path: req.url,
				message: "Credit sent successfully"
			});
   } catch (error) {
      res.status(500).send({
				status: "error",
				error: error,
				path: req.url,
				message: "Credit sending failed",
				success: false
			});
   }
};
