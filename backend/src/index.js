const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRoutes = require("./routes/user");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRoutes);
connectDB()
  .then((success) => {
    console.log("DB Connected Successfully", success);
    app.listen(5000, () => {
      console.log("App is listening to APIS");
    });
  })
  .catch((e) => {
    console.log("Error in connection", e);
  });

app.post("/users", async (req, res) => {
  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    skills: req.body.skills,
  });
  try {
    if (req.body.skills.length > 5) {
      throw new Error("Error: Skills cannot be more than 5");
    } else {
      await user.save();
      res.send("User Created Successfully!");
    }
  } catch (err) {
    res.status(400).send("Error in creating user" + err);
  }
});

app.get("/users", userAuth, async (req, res) => {
  try {
    const Users = await User.find({}); // Get all users
    res.json(Users);
  } catch (err) {
    res.status(500).send("Error in fetching users" + err);
  }
});

app.delete("/users/:id", userAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(500).send("Error in deleting user" + err);
  }
});

app.patch("/users/:id", userAuth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(500).send("Error in updating user" + err);
  }
});
