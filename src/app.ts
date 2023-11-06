import createError, { HttpError } from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import * as dotenv from "dotenv";
import { strict as assert } from "assert";
import { load } from "ts-dotenv";
dotenv.config();
import sequelize from "./config/config"

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

const app = express();

// DotEnv variable types
const env = load({
	DB_USERNAME: String,
	DB_PASSWORD: String,
	DB_HOST: String,
	DB_PORT: String,
	DB_NAME: String,
	JWT_SECRET: String,
	SALT_ROUNDS: Number
});

const url = process.env.MONGO_URL as string;

assert.ok(env.DB_USERNAME === process.env.DB_USERNAME);
assert.ok(env.DB_PASSWORD === process.env.DB_PASSWORD);
assert.ok(env.DB_HOST === process.env.DB_HOST);
assert.ok(env.DB_NAME === process.env.DB_NAME);
assert.ok(env.JWT_SECRET === process.env.JWT_SECRET);

// DataBase connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();


// view engine setup
app.set("views", path.join(__dirname, "../", "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", indexRouter);
app.use("/api/v1/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
	next(createError(404));
});

// error handler
app.use(function (
	err: HttpError,
	req: Request,
	res: Response,
	next: NextFunction
) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

export default app;
