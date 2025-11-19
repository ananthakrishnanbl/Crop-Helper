document.querySelector(".name").innerText=userData.username;
document.title=userData.username;

document.querySelector(".avatar").style.backgroundImage=`url("${avatar[userData.avatar_name]}")`;

const avatar_box=document.querySelector(".avatar-box");
Object.keys(avatar).forEach((val,i)=>{
    console.log(val);
    const avatar_image=document.createElement("div");
    avatar_image.classList.add("avatars");
    avatar_image.classList.add(`${val}`);
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
})