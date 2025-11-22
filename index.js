import express from "express";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import session from "express-session";
import { fileURLToPath } from "url";
import { avatar } from "./data.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app=express();
const port=3000;


// const dataStore = async()=>{
//     await mongoose.connect("mongodb://127.0.0.1:27017/userData");
//     const userSchema = mongoose.Schema({
//         username:{
//             type: String,
//             required: true,
//             unique: true
//         },
//         password:{
//             type: String,
//             required: true
//         },
//         avatar_name: String
//     })
//     const user = mongoose.model("user",userSchema);
//     const newUser = new user({
//         username: "nandana",
//         password: "0803",
//         avatar_name: "default"
//     })
//     await newUser.save();
// }
// dataStore();

let userSchema;
let user;
let plotSchema;
let plots;

app.use(express.urlencoded({extended:true}));
app.use(
  session({
    secret: "123Why123",
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
        if (req.session.errorTry){
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


/*-----------------Below Part of Progream that needs Mongodb -----------------*/ 
//Setting up Mongodb 
mongoose.connect("mongodb://127.0.0.1:27017/userData")
.then(async ()=>{
    userSchema = new mongoose.Schema({
        username:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        avatar_name: String
    })
    user = mongoose.model("user",userSchema);
    plotSchema = new mongoose.Schema({
        userName: String,
        plotCount: Number,
        plots: [
            {
                plotID:String,
                plotName: String,
                country: String,
                state: String,
                district: String,
                crop: String
            }
        ]
    })
    plots = mongoose.model("plots",plotSchema);
})
//Setting up Pages
.then(()=>{

app.post("/login",async (req,res)=>{
    const userData =await user.find();
    const  { username , password } = req.body;
    req.session.user= userData.filter((val)=>{
        return val.username===username && val.password==password;
    })[0]
    console.log("username : "+username + "| password: " + password);
    if (req.session.user){
        req.session.errorTry=0;
        res.redirect(`/${username}`);
    }
    else{
        req.session.errorTry=1;
        res.redirect("/login");
    }

})

app.get("/:username",async (req,res)=>{
    if (req.session.user && req.session.user.username===req.params.username){
        const userData =await user.find();
        const username=req.session.user.username;
        req.session.user= userData.filter((val)=>{
            return val.username===username;
        })[0]
        let data=fs.readFileSync(path.join(__dirname,"constfiles/dashboard/dashboard.html"));
        const allUserPlots = await plots.find()
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

app.post("/:username/avatar-change",async (req,res)=>{
    console.log(req.body.avatar);
    await user.updateOne({username:req.session.user.username},{$set:{avatar_name:req.body.avatar}});
    res.redirect(`/${req.session.user.userName}`);
})
})
/*-----------------Above Part of Progream that needs Mongodb -----------------*/ 


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