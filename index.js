const express  = require('express')
require('./db/config');
const user=require('./db/User');

const app=express()
app.use(express.json());
app.post("/register",async(req,res)=>{
    let user=new User(req.body)
    let result=await user.save();
    if (result) {
        jwt.sign({result},jwt_key,{expiresIn:"2h"},(err,token)=>{
            if (err) {
                res.send('something Went wrong');
            }
            res.send({result,auth:token})
        })
    }else{
        res.send({result:"something went wrong"})
    }
});

app.post("/login",async(req,res)=>{
    if (req.body.email && req.body.password) {        
        
        let user=await User.findOne(req.body).select("-password");
        if (user) {
            jwt.sign({user},jwt_key,{expiresIn:"2h"},(err,token)=>{
                if (err) {
                    res.send('something Went wrong');
                }
                res.send({user,auth:token})
            })
        }else{
            res.send({result: "No user found"})
        }
    }else{
        res.send({result: "Invalid Parameter"})
    }
});

app.listen(5000);
