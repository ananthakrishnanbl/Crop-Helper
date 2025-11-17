const express = require("express");
const path=require("path");
const app=express();
const port=3000;

app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"constfiles/home/home.html"));
})

app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"constfiles/login/login.html"));
})

app.get("/login/login.css",(req,res)=>{
    res.sendFile(path.join(__dirname,"constfiles/login/login.css"));
})
app.get("/login/login.js",(req,res)=>{
    res.sendFile(path.join(__dirname,"constfiles/login/login.js"));
})

app.post("/login",(req,res)=>{
    const  { username , password } = req.body;
    console.log("username :"+ username);
    console.log("password :"+ password);
    res.redirect("/login");
})

app.listen(port,()=>{
    console.log(port);
})