let activeColor = "#000000";
let borderColor = activeColor;
let colorBackup = "#000000";
let hexCharacters = ["0","1","2","3","4","5","6","7","8","9", "A", "B", "C", "D", "E", "F"];
let isRainbowActive = false;
console.log(hexCharacters);
//"gainsboro";


const gridContainer = document.querySelector(".grid-container");
const clearBtn = document.querySelector(".clear");
const eraserBtn = document.querySelector(".eraser");
const colorPicker = document.querySelector("#color-pick");
const singleColorBtn = document.querySelector(".single-color");
const rainbowBtn = document.querySelector(".rainbow");




//gridContainer.addEventListener('click', paint);
clearBtn.addEventListener('click', clear);
colorPicker.addEventListener('change', updateColor);
eraserBtn.addEventListener('click', erase);
singleColorBtn.addEventListener('click', singleColor);
rainbowBtn.addEventListener('click', ()=>{
    isRainbowActive = true;
} );



function singleColor(){
    isRainbowActive = false;
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
    activeColor = "white";
    borderColor = "gainsboro";
    //colorPicker.value = "#FFFFFF"
}






function updateColor(e){
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
}





function paint(e){
    if(isRainbowActive){
        hexNum = randomColor();
        e.target.style.backgroundColor = hexNum
        e.target.style.borderBottom = `1px solid ${hexNum}`;
        e.target.style.borderRight = `1px solid ${hexNum}`;
        console.log("rainbow is active");
    }else{

        e.target.style.backgroundColor = activeColor;
        e.target.style.borderBottom = `1px solid ${borderColor}`;
        e.target.style.borderRight = `1px solid ${borderColor}`;
    }

}

function paintOnHover(e){
    if (e.buttons > 0){
        if(isRainbowActive){
            hexNum = randomColor();
            e.target.style.backgroundColor = hexNum
            e.target.style.borderBottom = `1px solid ${hexNum}`;
            e.target.style.borderRight = `1px solid ${hexNum}`;
            console.log("rainbow is active");
        }else{
    
            e.target.style.backgroundColor = activeColor;
            e.target.style.borderBottom = `1px solid ${borderColor}`;
            e.target.style.borderRight = `1px solid ${borderColor}`;
        }
    }
    

}






function clear(){

    gridItems.forEach(elem => {
    
        elem.setAttribute('style', 'background-color: white');

    });
    updateColor();
    
}






makeGrid(20,20);

const gridItems = document.querySelectorAll(".grid-cells");

gridItems.forEach(elem=>{
    elem.addEventListener('mousedown', paint);
    elem.addEventListener('mouseenter', paintOnHover);
})

//apretar boton borrar y que borre
//como borrar?
//Pinto de blanco el backgroun