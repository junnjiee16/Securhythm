const express = require("express");
const router = express.Router();

const signUpTemplateCopy = require("../models/signup_models");

router.post("/signup", (request, response) => {
  console.log("rest");
  const signedUpUser = new signUpTemplateCopy({
    email: request.body.email,
    username: request.body.username,
    password: request.body.password,
  });
  signedUpUser
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.json({status: "error", error: 'Duplicate email'});
    });
});


router.post('/api/login', async (req, res) => {
  const user = await User.findOne({ 
  email: req.body.email,
  password:req.body.password, })
  if (user){
    return res.json({ status:'ok',user:true})
  }
  res.json({ status:'ok'})
})

    
module.exports = router;
