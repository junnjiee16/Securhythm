const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const User = require('./models/user_model');

dotenv.config()

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_ACCESS,()=>{
    console.log("Database Connected")
})



app.post('/api/register', async (req, res) => {
    console.log(req.body)

    try{
        const user = await User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            quote: req.body.quote
        })
        res.json({status:"ok"})
    }catch(err){
        console.log(err)
        res.json({status:"error",err})
    }
} );

app.get('/api/login', async (req, res) => {
        await User.findOne({
            email: req.body.email,
            password: req.body.password
        })
        if(user){
            res.json({status: 'success'});
        }
        else{
            res.json({status: 'error', error:'Incorrect email or password'});
        }

} );



app.get('/hello', (req, res) => {``
    res.send('Hello World!');
});

app.listen(4000, () => {
    console.log('Example app listening on port 4000!');
}
);

