# Customer Management System

A full-stack Customer Management System that allows users to manage customer records through a modern web interface.

## Features

* View all customers
* Add a new customer
* View customer details
* Edit existing customer information
* Delete customers
* Search customers by name
* Search customers by email
* Search customers by phone number
* View date created and last updated
* Responsive user interface
* Customer data persistence using MySQL

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js

### Database

* MySQL

## Project Structure

```text
customer-management-system/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── database.sql
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   └── package.json
│
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Set up the database

Open MySQL Workbench and run:

```text
backend/database.sql
```

This will create the required database and customers table.

### 3. Configure environment variables

Navigate to the backend directory:

```bash
cd backend
```

Create a `.env` file based on `.env.example`.

Example:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=customer_management
DB_PORT=3306
```

### 4. Install backend dependencies

```bash
cd backend
npm install
```

### 5. Start the backend

```bash
npm run dev
```

The backend API should run on:

```text
http://localhost:5000
```

### 6. Install frontend dependencies

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

### 7. Start the frontend

```bash
npm run dev
```

The application should run on:

```text
http://localhost:5173
```

## API Endpoints

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| GET    | `/api/customers`     | Get all customers     |
| GET    | `/api/customers/:id` | Get a customer by ID  |
| POST   | `/api/customers`     | Create a new customer |
| PUT    | `/api/customers/:id` | Update a customer     |
| DELETE | `/api/customers/:id` | Delete a customer     |

## Customer Data

Each customer contains:

* First Name
* Last Name
* Email
* Phone Number
* Address
* Date Created
* Date Updated

## Author

Seth Nortey
