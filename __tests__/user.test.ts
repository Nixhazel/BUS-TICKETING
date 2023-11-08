import request from "supertest";
import app from "../src/app";

describe("User Controller", () => {
	// make sure to use a new user everytime esle the test will fail because user already exist
	const testUser = {
		username: "testuser123456",
		password: "password123",
	};

	it("should register a new user", async () => {
		const response = await request(app).post("/api/v1/users/register").send({
			username: testUser.username,
			password: testUser.password
		});

		expect(response.status).toBe(201);
		expect(response.body.data.userId).toBeDefined();
		expect(response.body.data.token).toBeDefined();
	});

	it("should log in and return a JWT token", async () => {
		const response = await request(app).post("/api/v1/users/login").send({
			username: testUser.username,
			password: testUser.password
		});

		expect(response.status).toBe(200);
		expect(response.body.token).toBeDefined();
	});

});
