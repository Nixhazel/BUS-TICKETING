# BUS-TICKETING

Welcome to the Bus Ticketing Platform, a modern and efficient system for managing bus ticketing operations. Our platform provides a seamless experience for users to create accounts, purchase bus tickets, and manage their travel expenses. Powered by Express.js, Node.js, and MySQL, this application offers a robust and secure environment for both users and administrators.

## Features

User Registration: Users can easily create accounts with just a few clicks.

Ticket Purchase: Purchase bus tickets directly through your account.

Account Credit: Add funds to your account securely for hassle-free ticket purchases.

Balance Tracking: Keep an eye on your account balance and transaction history.

Transaction History: Access detailed transaction records and filter by date/time period.

Send Credit: Share credit with friends and family directly from your account.

Our application provides a user-friendly interface and efficient backend processes to make bus ticketing quick and convenient. Whether you're a regular commuter or an occasional traveler, our platform has you covered.

## Prerequisites

- Node.js (v14 or later)
- MySQL database

## Installation

1. Clone the repository: 

    git clone https://github.com/Nixhazel/BUS-TICKETING.git

2. Navigate to the project directory:

   cd BUS-TICKETING

3. Install project dependencies:

   npm install

## Configuration

1. Create a `.env` file in the project root directory. Use `.env.example` as a template and provide the necessary environment variables. For example:

DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_NAME=your-database
JWT_SECRET=your-secret-key

Replace `your-username`, `your-password`, `your-database`, and `your-secret-key` with your actual configuration.

2. Configure your database connection settings in the project configuration files.

## Database Setup

1. Enter your Database config details in the config files 

2. Create the database schema by running migrations:

npx sequelize db:migrate

3. Optionally, seed the database with initial data (if required):

npx sequelize db:seed:all

## Usage

1. Start the development server:

   npm run dev

to start watching with tsc:

   npm start

in another terminal

Your application should now be running at [http://localhost:3000](http://localhost:3000).

2. Use Postman or a similar tool to test the API endpoints. You can import the provided Postman collection for testing.

## API Documentation

For detailed API documentation, refer to the Postman collection available at [Postman Documentation Link](https://documenter.getpostman.com/view/13123089/2s9YXh5hTN).

## Testing

To run the tests, use the following command:

npm test
