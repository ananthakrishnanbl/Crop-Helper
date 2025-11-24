const plotBox=document.querySelector(".plotdetails");

document.querySelector(".avatar").style.backgroundImage=`url("${avatar[userData.avatar_name]}")`;

userPlots.forEach((val,index)=>{
    const newElement = document.createElement("div");
    newElement.classList.add("plot");
    newElement.classList.add(`plot${index}`);
    plotBox.append(newElement);
    const newNameBox = document.createElement("div");
    newNameBox.classList.add("name-box");
    newNameBox.innerText=val.plotName==="NOTSET"?`PLOT${index+1}`:val.plotName;
    newElement.append(newNameBox);
    const newDataBox = document.createElement("div");
    const crop = val.crop===""?"<a href=''>ADD CROP<a>":val.crop;
    newDataBox.classList.add("data-box");
    newDataBox.innerHTML=`<p> COUNTRY : ${val.country}</p><p> STATE : ${val.state}</p><p> DISTRICT : ${val.district }</p><p> CROP : ${crop }</p>`
    newElement.append(newDataBox);
})

document.querySelector(".name").innerText=userData.username;
document.title=userData.username;

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

document.querySelector(".addplot").addEventListener("click",()=>{
    navigator.geolocation.getCurrentPosition(location, error);
    async function location(position){
        document.querySelector(".lat-input").value=position.coords.latitude;
        document.querySelector(".lon-input").value=position.coords.longitude;
        url=`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`;
        const response =await fetch(url); 
        const data= await response.json();
        document.querySelector(".state-input").value=data.address.state;
        document.querySelector(".district-input").value=data.address.state_district;
    }
    function error(){
        console.log("Location Access Denied")
    }
    document.querySelector(".addplot-form").style.display="inline-block";
})

const close = ()=>{
    document.querySelector(".addplot-form").style.display="none";
}

document.querySelector(".close").addEventListener("click",close);
document.querySelector(".cancel").addEventListener("click",close);