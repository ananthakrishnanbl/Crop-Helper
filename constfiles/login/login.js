const input=document.querySelectorAll("input")

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
const check=()=>{
    let i=0;
    const pass=password.value;
    const usernameValue=user.value;
    if (pass && usernameValue){
        document.querySelector("#submit").disabled=false;
    }
    else{
        document.querySelector("#submit").disabled=true;
    }
}
// const check=()=>{
//     let i=0;
//     const pass=password.value;
//     console.log(pass);
//     hasSpace=/\s/.test(pass);
//     let hasupper=/[A-Z]/.test(pass);
//     let haslower=/[a-z]/.test(pass);
//     let hasnum=/[1-9]/.test(pass);
//     let haschar=/[^A-Za-z0-9\s]/.test(pass);
//     strength.forEach((val)=>{
//         val.classList.remove("yellow");
//     })
//     if (!hasSpace){
//         if (hasupper){
//             strength[i].classList.add("yellow");
//             i++;
//         }
//         if (haslower){
//             strength[i].classList.add("yellow");
//             i++;
//         }
//         if (hasnum){
//             strength[i].classList.add("yellow");
//             i++;
//         }
//         if (haschar){
//             strength[i].classList.add("yellow");
//             i++;
//         }
//     }
//     const usernameValue=user.value;
//     if (i==4 && usernameValue){
//         document.querySelector("#submit").disabled=false;
//     }
//     else{
//         document.querySelector("#submit").disabled=true;
//     }
// }
const user=input[0];
const password=input[1];
let hasSpace=false;
const strength=document.querySelectorAll(".strength");
password.addEventListener("keydown",check);
user.addEventListener("keydown",check);

const eye=document.querySelector("#eye");
eye.addEventListener("click",()=>{
    if (eye.getAttribute("class")=="closed"){
        eye.innerHTML='<i class="fa-regular fa-eye"></i>';
        eye.setAttribute("class","open");
        password.setAttribute("type","text");
    }
    else{
        eye.innerHTML='<i class="fa-regular fa-eye-slash"></i>';
        eye.setAttribute("class","closed");
        password.setAttribute("type","password");
    }
})