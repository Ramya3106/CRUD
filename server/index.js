const express = require("express");
const cors = require("cors");
const Users = require("./sample.json");
const app = express();
const port = 8000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
//Display All user
app.get("/Users", (req, res) => {
  return res.json(Users);
});

//Delete User Detail
app.delete("/Users/:id", (req, res) => {
  let id = Number(req.params.id);
  let filteredUsers = Users.filter((Users) => User.id !== id);
});

app.listen(port, (err) => {
  console.log(`App is running in port ${port}`);
});
