import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from '../models/User';
// import User from "../../models/DBmodels/userModel";

const saltRounds = parseInt(process.env.SALT_ROUNDS || "");
const secret = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response) => {
   try {
		const { username, password } = req.body;
		const existingUser = await User.findOne({ where: { username } });
		if (existingUser) {
			return res
				.status(409)
				.send({ message: "Username already in use", success: false });
		}

		
		const token = jwt.sign({ username: username }, secret, { expiresIn: "1d" });
		const salt = await bcrypt.genSaltSync(saltRounds);
		const hashedPassword = await bcrypt.hashSync(password, salt);

		const newUser = await User.create({
			username,
			password: hashedPassword
		});

		return res.status(201).send({
			success: true,
			path: req.url,
			message: `New user created successfully`,
			data: { userId: newUser.id, token }
		});
	} catch (error) {
		res.status(500).send({
			status: "error",
			error: error,
			path: req.url,
			message: "Something went wrong creating user",
			success: false
		});
	}
};


export const logIn = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ where: { username } });

		if (!user) {
			return res.status(401).send({
				success: false,
				path: req.url,
				message: "User dose not exist"
			});
		}

		const isMatch = await bcrypt.compareSync(password, user.password);
		if (!isMatch) {
			return res.status(401).send({
				success: false,
				path: req.url,
				message: "Invalid Password"
			});
		}

		const token = jwt.sign({ userId: user.id }, secret);

		return res.status(200).send({
			success: true,
			message: "login successful",
			user,
			token
		});
	} catch (error) {
		res.status(500).send({
			error: error,
			path: req.url,
			message: "Something went wrong Loging in",
			success: false
		});
	}
};
