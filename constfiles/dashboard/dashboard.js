const plotBox=document.querySelector(".plotdetails");

userPlots.forEach((val,index)=>{
    const newElement = document.createElement("div");
    newElement.classList.add("plot");
    newElement.classList.add(`plot${index}`);
    newElement.innerText=JSON.stringify(val);
    plotBox.append(newElement);
})