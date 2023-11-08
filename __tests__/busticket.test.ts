import request from "supertest";
import app from "../src/app";
import {BusTicket} from "../src/models/BusTicket";
import { User } from "../src/models/User";

describe("Bus Ticket Controller", () => {

	const testUser = {
		username: "testuser12345",
		password: "password123",
		balance: 100.0
	};
   
	it("should get user balance", async () => {
		
      const createdUser = await User.create(testUser);
      
		const response = await request(app)
			.get(`/api/v1/ticket/balance/${createdUser.id}`)
			.set(
				"Authorization",
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NmU5MjZmMC05MTEwLTQwYjctYWI0My1hNWYxMjJkNTIyODQiLCJpYXQiOjE2OTkzNTQ4ODR9.gHAWf9QtoSdrSk4rXoL4-mKLe3CJ7ZXE-iO7DEHGQZA"
			);

		expect(response.status).toBe(201);
		expect(response.body.success).toBe(true);
		expect(response.body.message).toBe("Balance retrieved successfully");
		expect(response.body.data.balance).toBe(testUser.balance);
	});

   it("should buy a bus ticket", async () => {
      
      const createdUser = await User.create(testUser);

		const ticketPrice = 20.0;

		const response = await request(app)
			.post("/api/v1/ticket/buy")
			.set(
				"Authorization",
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NmU5MjZmMC05MTEwLTQwYjctYWI0My1hNWYxMjJkNTIyODQiLCJpYXQiOjE2OTkzNTQ4ODR9.gHAWf9QtoSdrSk4rXoL4-mKLe3CJ7ZXE-iO7DEHGQZA"
			)
			.send({ userId: createdUser.id, ticketPrice });

		expect(response.status).toBe(201);
		expect(response.body.success).toBe(true);
		expect(response.body.message).toBe("Ticket purchased successfully");

      const updatedUser = await User.findByPk(createdUser.id);
      
		expect(updatedUser!.balance).toBe(testUser.balance - ticketPrice);

		const newTicket = await BusTicket.findOne({
			where: { userId: createdUser.id }
		});
		expect(newTicket).not.toBeNull();
	});

   it("should credit a user account", async () => {
      
      const createdUser = await User.create(testUser);

		const creditAmount = 30.0;

		const response = await request(app)
			.post("/api/v1/ticket/credit")
			.set(
				"Authorization",
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NmU5MjZmMC05MTEwLTQwYjctYWI0My1hNWYxMjJkNTIyODQiLCJpYXQiOjE2OTkzNTQ4ODR9.gHAWf9QtoSdrSk4rXoL4-mKLe3CJ7ZXE-iO7DEHGQZA"
			)
			.send({ userId: createdUser.id, amount: creditAmount });

		expect(response.status).toBe(201);
		expect(response.body.success).toBe(true);
		expect(response.body.message).toBe("Account credited successfully");


		const updatedUser = await User.findByPk(createdUser.id);
		expect(updatedUser!.balance).toBe(testUser.balance + creditAmount);
	});
});
