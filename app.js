const express = require("express");
const app = express();
const sequelize = require("./SDatabase.js");
const Model = require("./sequlaize.js"); // Import the model
const cors = require("cors"); // Import the cors middleware
const { rejects } = require("assert");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(express.json({ extended: true }));

app.use(cors());

// app.post("/signup", async (req, res) => {
//   const { name, email, password } = req.body;

//   const existingUser = await Model.findAll({
//     where: {
//       email: email,
//     },
//   });

//   if (existingUser.length > 0) {
//     res.status(400).json("User with this email already exists.");
//   } else {
//     const newUser = await Model.create({ name, email, password });
//     res.status(201).json(newUser);
//   }
// });

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await Model.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json("User with this email already exists.");
    }

    // Hash the password before saving it to the database
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        return res.status(500).json("Error hashing the password.");
      }

      const newUser = await Model.create({
        name,
        email,
        password: hashedPassword,
      });
      res.status(201).json(newUser);
    });
  } catch (error) {
    res.status(500).json("Error creating the user.");
  }
});

// app.post("/signin", async (req, res) => {
//   const { Email, Password } = req.body;
//   const existingUser = await Model.findOne({
//     where: {
//       email: Email,
//       password: Password, // You should also check the password
//     },
//   });
//   console.log("existinguser" + existingUser);

//   if (existingUser) {
//     res.status(200).json("login successfully");
//   } else {
//     res.status(404).json("User does not exist");
//   }
// });

app.post("/signin", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    // Find the user by email
    const existingUser = await Model.findOne({
      where: {
        email: Email,
      },
    });

    if (!existingUser) {
      return res.status(404).json("User does not exist");
    }

    // Compare the entered password with the stored hashed password
    bcrypt.compare(Password, existingUser.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json("Invalid password");
      }
      console.log("Login successful");
      res.status(200).json("Login successful");
    });
  } catch (error) {
    res.status(500).json("Error signing in");
  }
});

sequelize
  .sync()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log("Database synchronization error:", err);
  });
