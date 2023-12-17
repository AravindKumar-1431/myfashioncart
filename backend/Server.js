const express = require("express");
const mongoose = require("mongoose");
const usersignup = require("./models/usersignup");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://aravindpatel549:0dtdZ7gO91HNsMCJ@cluster0fashioncart.mzf430z.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("db connected"));

app.get("/", (req, res) => {
  return res.send("helloworld");
});

app.post("/signup", async (req, res) => {
  try {
    const { fullname, email, password, confrimpassword } = req.body;
    const exist = await usersignup.findOne({ email });
    if (exist) {
      return res.status(400).send("user already exist");
    }
    if (password != confrimpassword) {
      return res.status(403).send("password not matched");
    }
    let newuser = new usersignup({
      fullname,
      email,
      password,
      confrimpassword,
    });
    newuser.save();
    return res.status(200).send("user registered successfully");
  } catch (err) {
    console.log(err);
    return res.status(404).send("server error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await usersignup.findOne({ email });
    if (!exist) {
      return res.status(400).send("user not found");
    }
    if (exist.password != password) {
      return res.status(403).send("enter vaild password");
    }
    let payload = {
      user: {
        id: exist.id,
      },
    };
    jwt.sign(payload, "jwtPassword", { expiresIn: 36000000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token: token });
      // let newUser = new usersignup({ email, password });
      // newUser.save();

      // return res.status(200).send("user logined successfully");
    });
  } catch (err) {
    console.log(err);
    return res.status(404).send("server error");
  }
});

app.get("/alluser", async (req, res) => {
  try {
    let allusers = await usersignup.find();
    return res.json(allusers);
  } catch (err) {
    console.log(err);
    return res.status(404).send("server error");
  }
});
app.listen(5000, () => {
  console.log("server running");
});
