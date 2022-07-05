const exp = require("express");
const app = exp();
const userapp = require("./Apis/userapi");

require("dotenv").config();

const mongoose = require("mongoose");
const path = require("path");

// connect express server with react
app.use(exp.static(path.join(__dirname, "./build")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("database is connected successfully"))
  .catch((err) => console.log("err is", err));

app.use("/user", userapp);

//dealing with page refresh
app.use("*", (request, response) => {
  response.sendFile(path.join(__dirname, "./build/index.html"));
});

const port = process.env.PORT;
app.listen(port, () => console.log(`server is running on port ${port}`));
