let activeColor = "#000000";
let borderColor = activeColor;
//"gainsboro";


const gridContainer = document.querySelector(".grid-container");
const clearBtn = document.querySelector(".clear");
const eraser = document.querySelector(".eraser");
const colorPicker = document.querySelector("#color-pick");



//gridContainer.addEventListener('click', paint);
clearBtn.addEventListener('click', clear);
colorPicker.addEventListener('change', updateColor);
eraser.addEventListener('click', erase);

function erase(){
    activeColor = "white";
    borderColor = "gainsboro";
    colorPicker.value = "#FFFFFF"
}






function updateColor(e){
    activeColor = e.target.value;
    borderColor = e.target.value;
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
    
    e.target.style.backgroundColor = activeColor;
   
    e.target.style.borderBottom = `1px solid ${borderColor}`;
    e.target.style.borderRight = `1px solid ${borderColor}`;
    
    

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
    elem.addEventListener('click', paint);
})

//apretar boton borrar y que borre
//como borrar?
//Pinto de blanco el backgroun