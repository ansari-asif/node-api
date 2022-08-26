const express  = require('express')
require('./db/config');
const user=require('./db/User');

const app=express()
app.use(express.json());
app.get("/register",(req,res)=>{
    res.send(req.body);
});

app.listen(5000);