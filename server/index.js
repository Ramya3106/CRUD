const express = require("express");
const cors = require("cors");
const Users = require("./sample.json");
const fs = require("fs");
const app = express();
app.use(express.json());
const port = 8000;

app.use(
  cors({
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    origin: "*",
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
  let id = Date.now();
  Users.push({ id, name, age, city });

  fs.writeFile("./sample.json", JSON.stringify(Users), (err, data) => {
    return res.json({ message: "User detail added success" });
  });
});

//Update User
app.patch("/Users/:id", (req, res) => {
  let id = Number(req.params.id);
  let { name, age, city } = req.body;
  if (!name || !age || !city) {
    res.status(400).send({ message: "All Fields Required" });
  }

  let index = Users.findIndex((User) => User.id == id);

  Users.splice(index, 1, { ...req.body });

  fs.writeFile("./sample.json", JSON.stringify(Users), (err, data) => {
    return res.json({ message: "User detail updated success" });
  });
});

app.listen(port, (err) => {
  console.log(`App is running in port ${port}`);
});
