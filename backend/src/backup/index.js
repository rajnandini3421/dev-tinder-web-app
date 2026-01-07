const express = require("express");
const app = express();
const connectDB = require("./config/database");

connectDB()
  .then((success) => {
    console.log("DB Connected Successfully", success);
    app.listen(3001, () => {
      console.log("App is listening to APIS");
    });
  })
  .catch((e) => {
    console.log("Error in connection", e);
  });

// postman://auth/callback?code=97f0898142088a2a99d696265416b7a49791e833149ff0fbbf042f8ce13279f1
app.get(
  "/profile",
  (req, res, next) => {
    let AuthToken = "xyz";
    let isAuthorized = AuthToken === "xyz";
    if (isAuthorized) {
      //  next()
      res.send({ firstName: "Rajnandnini", lastName: "Hajare" });
    } else {
      res.status(401).send("UnAuthorized");
    }
  },
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    next();
  },
  (req, res) => {
    res.send({ firstName: "Nandini", lastName: "Hajare" });
  }
);

app.post("/profile", (req, res) => {
  res.send("Profile created successfully!");
});

app.patch("/profile", (req, res) => {
  res.send("Profile updated successfully!");
});

app.delete("/profile", (req, res) => {
  res.send("User deleted Successfully!");
});

app.use("/", (req, res) => {
  res.send("Welcome in Node JS Server");
});
