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

console.log(userNames);

input[0].addEventListener("keydown",(e)=>{
    e.preventDefault()
    if ((e.keyCode >=65 && e.keyCode <=90) || (e.key==="_") || (e.keyCode >= 49 && e.keyCode<=57)){
        input[0].value=input[0].value + e.key.toLowerCase();
        // checkvalidity();
    }
    else if(e.key==="Backspace"){
        input[0].value=input[0].value.slice(0,-1);
        // checkvalidity();
    }
})