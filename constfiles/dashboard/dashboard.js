const plotBox=document.querySelector(".plotdetails");
console.log(JSON.stringify(userPlots));

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
    const crop = val.crop==="toBeAdded"?"<a href=''>ADD CROP<a>":val.crop;
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