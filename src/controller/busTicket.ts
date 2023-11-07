import { Request, Response } from "express";
import { Transaction } from "../models/Transaction";
import { User } from "../models/User";
import { BusTicket } from "../models/BusTicket";

export const getBalance = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;

		const user = await User.findByPk(userId);

		if (!user) {
			return res
				.status(404)
				.send({ message: "User not found", success: false });
		}

		const balance = user.balance;

		return res.status(201).send({
			success: true,
			path: req.url,
			message: `Balance retrieved successfully`,
			data: { balance }
		});
	} catch (error) {
		res.status(500).send({
			status: "error",
			error: error,
			path: req.url,
			message: "Failed to retrieve balance ",
			success: false
		});
	}
};

export const buyTicket = async (req: Request, res: Response) => {
	try {
		const { userId, ticketPrice } = req.body;

		const user: any = await User.findByPk(userId);
		if (!user) {
			return res
				.status(404)
				.send({ message: "User not found", success: false });
		}

		if (user.balance < ticketPrice) {
			return res
				.status(400)
				.send({ message: "Insufficient balance", success: false });
		}

		const updatedBalance = user.balance - ticketPrice;

		const newTicket = await BusTicket.create({ userId });

		await Transaction.create({
			userId,
			type: "debit",
			amount: ticketPrice
		});

		await user.update({ balance: updatedBalance });

		return res.status(201).send({
			success: true,
			path: req.url,
			message: "Ticket purchased successfully",
			data: {}
		});
	} catch (error) {
		res.status(500).send({
			status: "error",
			error: error,
			path: req.url,
			message: "Ticket purchase failed ",
			success: false
		});
	}
};

export const creditAccount = async (req: Request, res: Response) => {
	try {
		const { userId, amount } = req.body;

		const user = await User.findByPk(userId);

		if (!user) {
			return res
				.status(404)
				.send({ message: "User not found", success: false });
		}

		if (amount <= 0) {
			return res
				.status(400)
				.send({ message: "Invalid credit amount", success: false });
		}

		const updatedBalance = user.balance + amount;
		await user.update({ balance: updatedBalance });

		await Transaction.create({
			userId,
			type: "credit",
			amount
		});

		return res.status(201).send({
			success: true,
			path: req.url,
			message: "Account credited successfully",
			data: {}
		});
	} catch (error) {
		res.status(500).send({
			status: "error",
			error: error,
			path: req.url,
			message: "Credit operation failed",
			success: false
		});
	}
};
