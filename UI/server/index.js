const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user_model");
const jwt = require("jsonwebtoken");

dotenv.config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_ACCESS, () => {
  console.log("Database Connected");
});

app.post("/api/register", async (req, res) => {
  console.log(req.body);

  try {
    const user = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      quote: req.body.quote,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", err });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
    if(user){
      console.log(req.body)
      const token = jwt.sign({
        email: user.email,
        password: user.password,
      }, process.env.JWT_SECRET, { expiresIn: "1h" })
      console.log(token)
      return res.json({ status: "ok", user:true , token });
    }else{
      return res.json({status: "error" ,user:false});
    }

});

app.get("/api/login", async (req, res) => {

  const token = req.headers['x-access-token'];
try{
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const email = decoded.email;
  const user = await User.findOne({email: email})
  return {status: "ok", quote: user.quote}
}
catch(err){
  console.log(err)
  res.json({status:'error',error:'invalid email'})
}

});


app.get("/api/dashboard", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    res.json({ status: "ok", quote: user.quote });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error });
  }
});

app.post("/api/dashboard", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    const user = await User.updateOne(
{
  email: email,
},
{
  quote: req.body.quote,
}

      // { email: email },
      // { $set: { quote: req.body.quote } }
    );
    return { status: "ok", quote: user.quote };
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error });
  }
});


app.listen(4000, () => {
  console.log("Example app listening on port 4000!");
});
