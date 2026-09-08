const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Customer Management API is running");
});

//get every customer
app.get("/api/customers", async (req, res) => {

  try {

    const [customers] = await db.query(
      "SELECT * FROM customers"
    );

    res.json(customers);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error fetching customers"
    });

  }

});


//get one customer
app.get("/api/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [customers] = await db.query(
      "SELECT * FROM customers WHERE id = ?",
      [id]
    );

    if (customers.length === 0) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.json(customers[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching customer"
    });
  }
});

//create new customer
app.post("/api/customers", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address
    } = req.body;

    // Check required fields
    if (!firstName || !lastName || !email || !phoneNumber || !address) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address"
      });
    }

    const [result] = await db.query(
      `INSERT INTO customers
      (first_name, last_name, email, phone_number, address)
      VALUES (?, ?, ?, ?, ?)`,
      [
        firstName,
        lastName,
        email,
        phoneNumber,
        address
      ]
    );

    const [newCustomer] = await db.query(
      "SELECT * FROM customers WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json(newCustomer[0]);

  } catch (error) {
    console.error(error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "A customer with this email already exists"
      });
    }

    res.status(500).json({
      message: "Error creating customer"
    });
  }
});



//update customer
app.put("/api/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phoneNumber || !address) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address"
      });
    }

    // Check if customer exists
    const [existingCustomer] = await db.query(
      "SELECT * FROM customers WHERE id = ?",
      [id]
    );

    if (existingCustomer.length === 0) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    // Update customer
    await db.query(
      `UPDATE customers
       SET first_name = ?,
           last_name = ?,
           email = ?,
           phone_number = ?,
           address = ?
       WHERE id = ?`,
      [
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        id
      ]
    );

    // Get updated customer
    const [updatedCustomer] = await db.query(
      "SELECT * FROM customers WHERE id = ?",
      [id]
    );

    res.status(200).json(updatedCustomer[0]);

  } catch (error) {
    console.error(error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "A customer with this email already exists"
      });
    }

    res.status(500).json({
      message: "Error updating customer"
    });
  }
});


//delete a customer
app.delete("/api/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if customer exists
    const [existingCustomer] = await db.query(
      "SELECT * FROM customers WHERE id = ?",
      [id]
    );

    if (existingCustomer.length === 0) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    // Delete customer
    await db.query(
      "DELETE FROM customers WHERE id = ?",
      [id]
    );

    res.status(200).json({
      message: "Customer deleted successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error deleting customer"
    });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});