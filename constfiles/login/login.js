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