let gridSize = 20;
let activeColor = "#000000";
let borderColor = activeColor;
let colorBackup = "#000000";
let hexCharacters = ["0","1","2","3","4","5","6","7","8","9", "A", "B", "C", "D", "E", "F"];
let isRainbowActive = false;
let isShadowActive = false;
let isLightActive = false;
let isSingleColorActive = true;
console.log(hexCharacters);
//"gainsboro";


const gridContainer = document.querySelector(".grid-container");
const clearBtn = document.querySelector(".clear");
const eraserBtn = document.querySelector(".eraser");
const colorPicker = document.querySelector("#color-pick");
const singleColorBtn = document.querySelector(".single-color");
const rainbowBtn = document.querySelector(".rainbow");
const shadowBtn = document.querySelector(".shadow");
const lightBtn = document.querySelector(".light");
const inputRange = document.querySelector("#inputRange");
const rangeValue = document.querySelector(".range-value");

console.log(rangeValue);
console.log(rangeValue.textContent);



//gridContainer.addEventListener('click', paint);
clearBtn.addEventListener('click', clear);
colorPicker.addEventListener('change', updateColor);
eraserBtn.addEventListener('click', erase);
singleColorBtn.addEventListener('click', singleColor);
rainbowBtn.addEventListener('click', activateRainbowMode);
shadowBtn.addEventListener('click', activateShadowMode);
lightBtn.addEventListener('click', activateLightMode);


//Function to convert rgb to hex

let rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`;

inputRange.addEventListener('input', ()=>{
    
    rangeValue.textContent = `${inputRange.value} x ${inputRange.value}`;
})


function activateRainbowMode(){
    isRainbowActive = true;
    isShadowActive = false;
    isLightActive = false;
    isSingleColorActive = false;
    
}
function activateShadowMode(){
    isRainbowActive = false;
    isShadowActive = true;
    isLightActive = false;
    isSingleColorActive = false;
    
}
function activateLightMode(){
    isRainbowActive = false;
    isShadowActive = false;
    isLightActive = true;
    isSingleColorActive = false;

    
}


function singleColor(){
    isSingleColorActive = true;
    isRainbowActive = false;
    isShadowActive = false;
    isLightActive = false;
    activeColor = colorBackup;
    borderColor = colorBackup;
}





function randomColor(){
    let hexNum = "#";
    let index;
    let num;
    for(let i = 0; i<6;i++){
        index = randomNum();
        num = hexCharacters[index];
        hexNum+= num;
    }
    
    return hexNum;
    
}


function randomNum() {
    return Math.floor(Math.random() * 16);
  }

function erase(){
    isRainbowActive = false;
    isShadowActive = false;
    isLightActive = false;
    isSingleColorActive = true;
    activeColor = "white";
    borderColor = "gainsboro";
    //colorPicker.value = "#FFFFFF"
}






function updateColor(e){
    isSingleColorActive = true;
    isRainbowActive = false;
    isShadowActive = false;
    isLightActive = false;
    activeColor = e.target.value;
    borderColor = e.target.value;
    colorBackup = e.target.value;
    console.log(e.target.value);
}


function makeGrid(rows, columns){
    gridContainer.style.setProperty("--grid-rows", rows);
    gridContainer.style.setProperty("--grid-columns", columns);
        for(let i=0; i< (rows*columns);i++){

            let cell = document.createElement("div");
            cell.setAttribute('draggable', 'false');
            gridContainer.appendChild(cell).className = "grid-cells gray-border";
        
        };

        console.log(gridSize);
}

function paintOnHover(e){
    if (e.buttons > 0){

        
        if(isRainbowActive){
            hexNum = randomColor();
            e.target.style.backgroundColor = hexNum
            e.target.style.borderBottom = `1px solid ${hexNum}`;
            e.target.style.borderRight = `1px solid ${hexNum}`;
            console.log("rainbow is active");

        }else if(isShadowActive){
            //Verify if are trying to use shadow on an epty cell 
            //shadow works only in colored cells
            if (e.target.style.backgroundColor==""){
                isShadowActive = false;
                if(!(isSingleColorActive && isRainbowActive && isShadowActive && isLightActive)) isShadowActive = true;

            } else{
                let color = rgba2hex(e.target.style.backgroundColor.toString()); //Convert the rgb to hex
                color = adjustBrightness(color, 10);
                e.target.style.backgroundColor = color;
                e.target.style.borderBottom = `1px solid ${color}`;
                e.target.style.borderRight = `1px solid ${color}`;
            }

            

        }else if(isLightActive){

            if (e.target.style.backgroundColor==""){
                isLightActive = false;
                if(!(isSingleColorActive && isRainbowActive && isShadowActive && isLightActive)) isLightActive = true;

            } else{

                console.log("light is active");
                let color = rgba2hex(e.target.style.backgroundColor.toString()); //Convert the rgb to hex
                color = adjustBrightness(color, -10);
                e.target.style.backgroundColor = color;
                e.target.style.borderBottom = `1px solid ${color}`;
                e.target.style.borderRight = `1px solid ${color}`;
            }


        } else if (isSingleColorActive) {
            //Paint with single color 
            e.target.style.backgroundColor = activeColor;
            e.target.style.borderBottom = `1px solid ${borderColor}`;
            e.target.style.borderRight = `1px solid ${borderColor}`;
            console.log(e.target.style.backgroundColor);
        }
    }
    

}

function adjustBrightness(col, amt) {
    console.log(col);
    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var R = parseInt(col.substring(0,2),16);
    var G = parseInt(col.substring(2,4),16);
    var B = parseInt(col.substring(4,6),16);

    // to make the colour less bright than the input
    // change the following three "+" symbols to "-"
    R = R - amt;
    G = G - amt;
    B = B - amt;

    if (R > 255) R = 255;
    else if (R < 0) R = 0;

    if (G > 255) G = 255;
    else if (G < 0) G = 0;

    if (B > 255) B = 255;
    else if (B < 0) B = 0;

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return (usePound?"#":"") + RR + GG + BB;

}





function clear(){

    gridItems.forEach(elem => {
    
        elem.setAttribute('style', 'background-color: white');

    });
   
    updateColor();
    
}






makeGrid(20,20);

let gridItems = document.querySelectorAll(".grid-cells");

gridItems.forEach(elem=>{
    elem.addEventListener('mousedown', paintOnHover);
    elem.addEventListener('mouseenter', paintOnHover);
});

inputRange.addEventListener('change', ()=>{
    
    gridSize = inputRange.value;

    removeElementsByClass("grid-cells");
    
    makeGrid(gridSize, gridSize);
    
    let newGridCells = document.querySelectorAll(".grid-cells");
    console.log(newGridCells);
    console.log(gridItems);
    newGridCells.forEach(elem=>{
        elem.addEventListener('mousedown', paintOnHover);
        elem.addEventListener('mouseenter', paintOnHover);
    });
    
})

function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}



//apretar boton borrar y que borre
//como borrar?
//Pinto de blanco el backgroun