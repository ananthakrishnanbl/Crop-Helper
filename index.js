import express from "express";
import path from "path";
import fs from "fs";
import session from "express-session";
import { fileURLToPath } from "url";
import { userData , allUserPlots, avatar } from "./data.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app=express();
const port=3000;
let errorTry=0;

app.use(express.urlencoded({extended:true}));
app.use(
  session({
    secret: "123Why123",     // change this
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: null
    },
  })
);

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
    if (!req.session.user){
        if (errorTry){
            res.send(data.toString().replace("false","true"));
        }
        else{
            res.send(data.toString());
        }
    }
    else{
        res.redirect(`/${req.session.user.username}`);
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
    req.session.user= userData.filter((val)=>{
        return val.username===username && val.password==password;
    })[0]
    console.log("username : "+username + "| password: " + password);
    if (req.session.user){
        errorTry=0;
        res.redirect(`/${username}`);
    }
    else{
        errorTry++;
        res.redirect("/login");
    }
})

app.get("/create-account",(req,res)=>{
    res.send("This Page is under construction")
})

app.get("/logout",(req,res)=>{
    if (req.session.user){
        req.session.destroy();
        res.redirect("/");
    }
    else{
        res.redirect("/login");
    }
})

app.get("/avatar.css",(req,res)=>{
    res.sendFile(path.join(__dirname,"constfiles/avatar/avatar.css"));
})
app.get("/avatar.js",(req,res)=>{
    res.sendFile(path.join(__dirname,"constfiles/avatar/avatar.js"));
})
app.get("/dashboard.css",(req,res)=>{
    res.sendFile(path.join(__dirname,"constfiles/dashboard/dashboard.css"));
})
app.get("/dashboard.js",(req,res)=>{
    res.sendFile(path.join(__dirname,"constfiles/dashboard/dashboard.js"));
})
app.get("/:username",(req,res)=>{
    if (req.session.user && req.session.user.username===req.params.username){
        let data=fs.readFileSync(path.join(__dirname,"constfiles/dashboard/dashboard.html"));
        req.session.userPlot = allUserPlots.filter((val)=>{
            return val.userName===req.session.user.username;
        })[0];
        data = data.toString().replace("DATA",JSON.stringify(req.session.user));
        data=data.replace("10101",req.session.userPlot.plotCount);
        data=data.replaceAll("301",req.session.user.username);
        data=data.replace("USERPLOTS",JSON.stringify(req.session.userPlot.plots));
        data=data.replace("AVATARDATA",JSON.stringify(avatar));
        res.send(data);
    }
    else{
        res.redirect("/login");
    }
})
app.get("/:username/chatbot",(req,res)=>{
    if (req.session.user && req.session.user.username===req.params.username){
        res.send(req.session.user.username);
    }
    else{
        res.redirect("/login")
    }
})
app.get("/:username/avatar-change",(req,res)=>{
    if (req.session.user && req.session.user.username===req.params.username){
        let data=fs.readFileSync(path.join(__dirname,"constfiles/avatar/avatar.html"));
        data = data.toString().replace("DATA",JSON.stringify(req.session.user));
        data=data.replaceAll("301",req.session.user.username);
        data=data.replace("AVATARDATA",JSON.stringify(avatar));
        res.send(data);
    }
    else{
        res.redirect("/login");
    }
})

app.listen(port,()=>{
    console.log(port);
})