document.querySelector(".name").innerText=userData.username;
document.title=userData.username;

document.querySelector(".avatar").style.backgroundImage=`url("${avatar[userData.avatar_name]}")`;
document.querySelector(".avatar-image").style.backgroundImage=`url("${avatar[userData.avatar_name]}")`;
document.querySelector(".avatar-name").value=userData.avatar_name;

const avatar_box=document.querySelector(".avatar-box");
Object.keys(avatar).forEach((val,i)=>{
    const avatar_image=document.createElement("div");
    avatar_image.classList.add("avatars");
    avatar_image.classList.add(`${val}`);
    avatar_image.setAttribute("id",val);
    avatar_image.style.backgroundImage=`url("${avatar[val]}")`;
    avatar_box.append(avatar_image);
})
document.querySelector(`.${userData.avatar_name}`).style.border="2px white solid";

const avatar_images=document.querySelectorAll(".avatars");
avatar_images.forEach((val)=>{
    val.addEventListener("mouseover",(e)=>{
        avatar_images.forEach((val)=>{
            val.classList.add("easeout");
        })
        e.target.classList.remove("easeout");
    })
    val.addEventListener("mouseout",(e)=>{
        avatar_images.forEach((val)=>{
            val.classList.remove("easeout");
        })
    })
    val.addEventListener("click",(e)=>{
        const avatar_name = e.target.getAttribute("id");
        document.querySelector(".avatar-image").style.backgroundImage=`url("${avatar[avatar_name]}")`;
        document.querySelector(".avatar-name").value=avatar_name;
        document.querySelector(".form").style.display="inline-block";
    })
})

const setting=document.querySelector(".setting3");
const arrow=document.querySelector(".angle")
setting.addEventListener("click",(e)=>{
    if (setting.getAttribute("id")==="hidden"){
        document.querySelector(".hidden-settings").style.visibility="visible";
        document.querySelector(".hidden-settings").classList.add("appear");
        setting.setAttribute("id","visible");
        arrow.classList.add("angle-rotate");
    }
    else{
        document.querySelector(".hidden-settings").classList.remove("appear");
        setTimeout(()=>{
            document.querySelector(".hidden-settings").style.visibility="hidden";
        },1000);
        setting.setAttribute("id","hidden");
        arrow.classList.remove("angle-rotate");
    }
})

document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".avatar-name").value=userData.avatar_name;
    document.querySelector(".form").style.display="none";
})
document.querySelector(".no").addEventListener("click",()=>{
    document.querySelector(".avatar-name").value=userData.avatar_name;
    document.querySelector(".form").style.display="none";
})