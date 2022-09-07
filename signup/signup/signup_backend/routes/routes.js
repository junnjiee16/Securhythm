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
      response.json(error);
    });
});
module.exports = router;
