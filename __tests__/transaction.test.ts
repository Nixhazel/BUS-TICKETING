import request from "supertest";
import app from "../src/app";
import {Transaction} from "../src/models/Transaction";
import { User } from "../src/models/User";

describe("Transactions Controller", () => {

	const testUser = {
		username: "testuser",
		password: "password123",
		balance: 50.0
	};

	const testTransaction = {
		userId: "1234", 
		type: "credit",
		amount: 50.0
	};

	it("should get user transactions", async () => {
		
		const createdUser = await User.create(testUser);

		
		testTransaction.userId = createdUser.id;
		await Transaction.create(testTransaction);

		const response = await request(app)
			.get(`/api/v1/transactions/transactions/${createdUser.id}`)
			.set(
				"Authorization",
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NmU5MjZmMC05MTEwLTQwYjctYWI0My1hNWYxMjJkNTIyODQiLCJpYXQiOjE2OTkzNTQ4ODR9.gHAWf9QtoSdrSk4rXoL4-mKLe3CJ7ZXE-iO7DEHGQZA"
			);

		expect(response.status).toBe(201);
		expect(response.body.success).toBe(true);
		expect(response.body.message).toBe("Transactions retrieved successfully");
		expect(response.body.data.transactions.length).toBe(1);
	});

	it("should send credit to another user", async () => {
		
		const sender = await User.create(testUser);
		const receiver = await User.create({
			username: "receiveruser",
			password: "receiverpassword"
		});

		const creditAmount = 10.0;

		const response = await request(app)
			.post("/api/v1/transactions/send-credit")
			.set(
				"Authorization",
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NmU5MjZmMC05MTEwLTQwYjctYWI0My1hNWYxMjJkNTIyODQiLCJpYXQiOjE2OTkzNTQ4ODR9.gHAWf9QtoSdrSk4rXoL4-mKLe3CJ7ZXE-iO7DEHGQZA"
			)
			.send({
				senderId: sender.id,
				receiverId: receiver.id,
				amount: creditAmount
			});

		expect(response.status).toBe(201);
		expect(response.body.success).toBe(true);
		expect(response.body.message).toBe("Credit sent successfully");

		const updatedReceiver = await User.findByPk(receiver.id);

		expect(updatedReceiver!.balance).toBe(receiver.balance + creditAmount);
	});
});
