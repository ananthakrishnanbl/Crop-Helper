import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { userData , allUserPlots } from "./data.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app=express();
const port=3000;
let errorTry=0;
let user;

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

app.get("/dashboard.css",(req,res)=>{
    res.sendFile(path.join(__dirname,"constfiles/dashboard/dashboard.css"));
})
app.get("/dashboard.js",(req,res)=>{
    res.sendFile(path.join(__dirname,"constfiles/dashboard/dashboard.js"));
})
app.get("/:username",(req,res)=>{
    if (user && user.username===req.params.username){
        let data=fs.readFileSync(path.join(__dirname,"constfiles/dashboard/dashboard.html"));
        const userPlot = allUserPlots.filter((val)=>{
            return val.userName===user.username;
        })[0];
        data = data.toString().replace("DATA",JSON.stringify(user));
        data=data.replace("10101",userPlot.plotCount)
        data=data.replace("USERPLOTS",JSON.stringify(userPlot.plots))
        res.send(data);
    }
    else{
        res.redirect("/login");
    }
})

app.listen(port,()=>{
    console.log(port);
})