import { Sequelize } from "sequelize-typescript";
import { BusTicket } from '../models/BusTicket';
import { Transaction } from '../models/Transaction';
import { User } from '../models/User';

const sequelize = new Sequelize({
	database: process.env.DB_NAME,
	dialect: "mysql",
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	models: [BusTicket, Transaction, User]
});

export default sequelize;
