import express from 'express';
const router = express.Router();

const singUpTemplateCopy = require('../models/SignUpModels');


router.post('/signup',(request,response)=>{
    const signedUpUser = new signUpTemplateCopy({
        email:request.body.email,
        username:request.body.username,
        password:request.body.password
    })
    signedUpUser.save()
    .then(data=>{
        response.json(data)
    })
    .catch(error=>{
        response.json(error)
    })
})
module.exports = router;