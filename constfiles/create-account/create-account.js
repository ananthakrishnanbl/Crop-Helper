const input=document.querySelectorAll("input");
const eye=document.querySelectorAll(".eye");

eye[0].addEventListener("click",()=>{
    if (eye[0].getAttribute("id")==="closed"){
        eye[0].innerHTML='<i class="fa-regular fa-eye"></i>'
        eye[0].setAttribute("id","open");
        input[1].setAttribute("type","text");
    }
    else{
        eye[0].innerHTML='<i class="fa-regular fa-eye-slash"></i>'
        eye[0].setAttribute("id","closed");
        input[1].setAttribute("type","password");
    }
})
eye[1].addEventListener("click",()=>{
    if (eye[1].getAttribute("id")==="closed"){
        eye[1].innerHTML='<i class="fa-regular fa-eye"></i>'
        eye[1].setAttribute("id","open");
        input[2].setAttribute("type","text");
    }
    else{
        eye[1].innerHTML='<i class="fa-regular fa-eye-slash"></i>'
        eye[1].setAttribute("id","closed");
        input[2].setAttribute("type","password");
    }
})

let userFlag=0;
let passFlag=0;
let rpassFlag=0;

input[0].addEventListener("click",(e)=>{
    const label=document.querySelector(".username");
    label.style.transform="translateY(-30px)";
    label.style.color="white";
})
input[0].addEventListener("blur",(e)=>{
    const label=document.querySelector(".username");
    if (e.target.value ==""){
        label.style.transform="translateY(0px)";
        label.style.color="#767272";
    }
})
input[1].addEventListener("click",(e)=>{
    const label=document.querySelector(".password");
    label.style.transform="translateY(-30px)";
    label.style.color="white";
})
input[1].addEventListener("blur",(e)=>{
    const label=document.querySelector(".password");
    if (e.target.value ==""){
        label.style.transform="translateY(0px)";
        label.style.color="#767272";
    }
})
input[2].addEventListener("click",(e)=>{
    const label=document.querySelector(".rpassword");
    label.style.transform="translateY(-30px)";
    label.style.color="white";
})
input[2].addEventListener("blur",(e)=>{
    const label=document.querySelector(".rpassword");
    if (e.target.value ==""){
        label.style.transform="translateY(0px)";
        label.style.color="#767272";
    }
})

function buttonCheck(){
    const button=document.querySelector("#submit");
    const ticks = document.querySelectorAll(".tick")
    const alerts = document.querySelectorAll(".alert");
    if (userFlag && passFlag && rpassFlag){
        alerts[0].style.display="none";
        alerts[1].style.display="none";
        alerts[2].style.display="none";
        button.disabled=false;
    }
    else{
        if (input[0].value.length>3){
            let i=0;
            if (!userFlag){
                alerts[0].style.display="flex";
                alerts[1].style.display="none";
                alerts[2].style.display="none";
            }
            else if (!passFlag){
                alerts[0].style.display="none";
                alerts[1].style.display="flex";
                alerts[2].style.display="none";
            }
            else{
                alerts[0].style.display="none";
                alerts[1].style.display="none";
                alerts[2].style.display="flex";
            }
        }
    }
}

function checkvalidity(){
    value=input[0].value;
    if (value.length>4){
        userFlag=1;
        userNames.forEach((val)=>{
            if (val.username===value){
                userFlag=0;
            }
        })
    }
    else{
        userFlag=0;
    }
    buttonCheck()
}

input[0].addEventListener("keydown",(e)=>{
    e.preventDefault()
    if (((e.keyCode >=65 && e.keyCode <=90) || (e.key==="_") || (e.keyCode >= 49 && e.keyCode<=57)) && !/[^a-zA-Z0-9_]/.test(e.key)){
        input[0].value=input[0].value + e.key.toLowerCase();
        checkvalidity();
    }
    else if(e.key==="Backspace"){
        input[0].value=input[0].value.slice(0,-1);
        checkvalidity();
    }
})

input[1].addEventListener("keydown",(e)=>{
    if (e.key===" "){
        e.preventDefault()
    }
    if (input[1].value.length>=4){
        passFlag=1;
        buttonCheck();
    }
    else{
        passFlag=0;
        buttonCheck();
    }
    if (input[1].value+e.key == input[2].value){
        rpassFlag=1;
        buttonCheck();
    }
    else{
        rpassFlag=0;
        buttonCheck();
    }
})
input[2].addEventListener("keydown",(e)=>{
    if (e.key===" "){
        e.preventDefault();
    }
    if (input[1].value == input[2].value+e.key){
        rpassFlag=1;
        buttonCheck();
    }
    else{
        rpassFlag=0;
        buttonCheck();
    }
})