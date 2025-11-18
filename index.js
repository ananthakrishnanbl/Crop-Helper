const express = require("express");
const path=require("path");
const fs=require("fs")
const app=express();
const port=3000;
let errorTry=0;
let user;
const userData=require("./data.js");

app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"constfiles/home/home.html"));
})
app.get("/home/home.css",(req,res)=>{
    res.sendFile(path.join(__dirname,"constfiles/home/home.css"));
})
app.get("/home/home.js",(req,res)=>{
    res.sendFile(path.join(__dirname,"constfiles/home/home.js"));
})

app.get("/login",(req,res)=>{
    const data=fs.readFileSync(path.join(__dirname,"constfiles/login/login.html"));
    if (errorTry){
        res.send(data.toString().replace("false","true"));
    }
    else{
        res.send(data.toString());
    }
})
app.get("/login/login.css",(req,res)=>{
    res.sendFile(path.join(__dirname,"constfiles/login/login.css"));
})
app.get("/login/login.js",(req,res)=>{
    res.sendFile(path.join(__dirname,"constfiles/login/login.js"));
})

app.post("/login",(req,res)=>{
    const  { username , password } = req.body;
    user= userData.filter((val)=>{
        return val.username===username && val.password==password;
    })[0]
    if (user){
        errorTry=0;
        res.redirect(`/${user.username}`);
    }
    else{
        errorTry++;
        res.redirect("/login");
    }
})

app.get("/create-account",(req,res)=>{
    res.send("This Page is under construction")
})

app.get("/:username",(req,res)=>{
    if (user && user.username===req.params.username){
        res.send("This page is under construction");
    }
    else{
        res.redirect("/login");
    }
})

app.listen(port,()=>{
    console.log(port);
})