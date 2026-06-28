const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

// Mock database
const users = [];

// Register
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 100);

    users.push({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "Registration failed",
    });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    res.json({
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).json({
      error: "Login failed",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});