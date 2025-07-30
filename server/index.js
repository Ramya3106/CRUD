const express = require("express");
const cors = require("cors");
const Users = require("./sample.json");
const fs = require("fs");
const app = express();
app.use(express.json());
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
  let filteredUsers = Users.filter((User) => User.id !== id);
  fs.writeFile("./sample.json", JSON.stringify(filteredUsers), (err, data) => {
    return res.json(filteredUsers);
  });
});

//Add New User
app.post("/Users", (req, res) => {
  let { name, age, city } = req.body;
  if (!name || !age || !city) {
    res.status(400).send({ message: "All Fields Required" });
  }
  return res.json({ message: "User detail added success" });
  let id = Data.now();
  Users.push({ id, name, age, city });
});

app.listen(port, (err) => {
  console.log(`App is running in port ${port}`);
});
