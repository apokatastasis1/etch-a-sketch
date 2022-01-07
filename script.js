const gridContainer = document.querySelector(".grid-container");
const eraser = document.querySelector(".eraser");
const activeColor = "#000000";
let clearGrid;



function makeGrid(rows, columns){
    gridContainer.style.setProperty("--grid-rows", rows);
    gridContainer.style.setProperty("--grid-columns", columns);
    for(let i=0; i< (rows*columns);i++){
    let cell = document.createElement("div");
    gridContainer.appendChild(cell).className = "grid-cells";

    };
}

gridContainer.addEventListener('click', (e)=> {
    
    console.log(e.target);
    e.target.style.backgroundColor = activeColor;
    e.target.style.border = `1px solid ${activeColor}`;
    
    console.log(e);
})



eraser.addEventListener('click', erase);



function erase(){

    gridItems.forEach(elem => {
    
        elem.setAttribute('style', 'background-color: white');

    });
    
}




makeGrid(20,20);

const gridItems = document.querySelectorAll(".grid-cells");
//apretar boton borrar y que borre
//como borrar?
//Pinto de blanco el backgroun