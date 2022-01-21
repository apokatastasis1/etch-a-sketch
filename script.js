

let gridSize = 20;
let activeColor = "#000000";
let borderColor = activeColor;
let colorBackup = "#000000";
let hexCharacters = ["0","1","2","3","4","5","6","7","8","9", "A", "B", "C", "D", "E", "F"];
let isRainbowActive = false;
let isShadowActive = false;
let isLightActive = false;
let isSingleColorActive = true;
let wasGridModified = false;
let isToggleGridActive = true;
let isSeasonCOlorActive = false;
let isButtonPressed = false;

//Spring 0-7 Summer 8-15 Fall 16-23 WInter 24-31
let colors = ["c6d7b9", "afd297", "88c5a1", "e0e293", "5e8d5a","f6b9ad","e1a18e","ee6f68", //spring
            "e2f4c7", "eae374", "f9d62e", "fdb863", "ff9750", "fc913a", "ff4d4d", "ff6b51", //summer
            "243236", "3e5258",  "606c38", "283618", "d06f1e", "dda15e", "bc6c25", "47281a", //fall
            "99afe4", "567ac5", "2859a6", "e9e8ef", "c9ccde", "a5abd0", "444484", "7b7c97"]; //winter




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
const gridLinesBtn = document.querySelector(".toggle-grid");
const saveBtn = document.querySelector(".save-image");
const seasonsColors = document.querySelectorAll(".color");
const buttons = document.querySelectorAll(".btn");



clearBtn.addEventListener('click', customizeGrid);
colorPicker.addEventListener('change', updateColor);
eraserBtn.addEventListener('click', erase);
singleColorBtn.addEventListener('click', singleColor);
rainbowBtn.addEventListener('click', activateRainbowMode);
shadowBtn.addEventListener('click', activateShadowMode);
lightBtn.addEventListener('click', activateLightMode);
inputRange.addEventListener('change', customizeGrid);
gridLinesBtn.addEventListener('click', toggleCustomGridLInes);





function toggleCustomGridLInes(){
    
    if(!isToggleGridActive){
        let newCells = document.querySelectorAll(".grid-cells"); 
        let lastColumnCells = document.querySelectorAll(`.grid-cells:nth-child(${gridSize}n)`);
        
        newCells.forEach(elem=> {

            elem.style.borderBottom = `1px solid gainsboro`;
            elem.style.borderRight = `1px solid gainsboro`;

        });
        lastColumnCells.forEach(elem=> elem.style.borderRight = "none");

        for(let i=newCells.length-gridSize; i<newCells.length;i++){
            newCells[i].style.borderBottom = "none";
        }



        isToggleGridActive = true;

    }else if (isToggleGridActive){

        let newCells = document.querySelectorAll(".grid-cells"); 
        newCells.forEach(elem=> elem.style.border = "none");
        isToggleGridActive = false;
    } 
    
}


//Add event listeners to all button minus the clear, toggle grid and save button
for(let i=1;i<buttons.length-2;i++){

    buttons[i].addEventListener('click', colorPressButton);
}


//color the pressed button on the left pannel
function colorPressButton(e){
    if (isButtonPressed){
        for(let i=1;i<buttons.length-2;i++){
            buttons[i].classList.remove('pressed');
        }
        e.target.classList.toggle('pressed');
        isButtonPressed = false;
    }  else{
        
        e.target.classList.toggle('pressed');
    }

    isButtonPressed = true;

}



//Scale the selected season color and de-escale it when selecting another color.
seasonsColors.forEach(color=> color.addEventListener('click', (e)=>{
    let colorPicked = document.querySelectorAll(".scale-color");
    if (isSeasonCOlorActive){
        colorPicked.forEach(color =>color.classList.toggle('scale-color'));
        e.target.classList.toggle('scale-color');
        isSeasonCOlorActive = false;
        buttons.forEach(btn=>btn.classList.remove("pressed"));

    }  else{
        
        e.target.classList.toggle('scale-color');
        buttons.forEach(btn=>btn.classList.remove("pressed"));
    }

    isSeasonCOlorActive = true;

    toggleBooleans();
    activeColor = e.target.style.backgroundColor;

}));



//If you selected a season color and then press a button on the left panel, this will resize
//the previously selected season color so it doesn't look like it's selected anymore

function resizePickedColors(){
    let pickedColor = document.querySelector(".scale-color");
    if(pickedColor) pickedColor.classList.toggle('scale-color');
}





//Fill the season colors with the colors in the array
//Spring 0-7 Summer 8-15 Fall 16-23 WInter 24-31

for(let i=0;i<colors.length;i++){
    
    seasonsColors[i].style.backgroundColor = "#" + colors[i];
        
}

makeGrid(20,20);

let lastColumnCells = document.querySelectorAll(`.grid-cells:nth-child(${gridSize}n)`);

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
    resizePickedColors();

    
}
function activateShadowMode(){
    isRainbowActive = false;
    isShadowActive = true;
    isLightActive = false;
    isSingleColorActive = false;
    resizePickedColors();
    
}
function activateLightMode(){
    isRainbowActive = false;
    isShadowActive = false;
    isLightActive = true;
    isSingleColorActive = false;
    resizePickedColors();

    
}


function singleColor(){
    isSingleColorActive = true;
    isRainbowActive = false;
    isShadowActive = false;
    isLightActive = false;
    activeColor = colorBackup;
    borderColor = colorBackup;
    resizePickedColors();
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
    resizePickedColors();
    
}


//Activates single color mode
function toggleBooleans(){
    isSingleColorActive = true;
    isRainbowActive = false;
    isShadowActive = false;
    isLightActive = false;

}




function updateColor(e){
    toggleBooleans();
    activeColor = e.target.value;
    borderColor = e.target.value;
    colorBackup = e.target.value;
    
}


function makeGrid(rows, columns){
    
    buttons[2].classList.toggle("pressed");
    isButtonPressed = true;


    let cellWIdth = gridContainer.offsetWidth/rows; //grid container size(px) / number of rows
    gridContainer.style.gridTemplateColumns = `repeat(${columns}, ${cellWIdth}px)  `;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, ${cellWIdth}px) `;


    for(let i=0; i< (rows*columns);i++){

        let cell = document.createElement("div");
        cell.setAttribute('draggable', 'false');
        gridContainer.appendChild(cell).className = "grid-cells gray-border";
    
    };

        
}


function paintOnHover(e){
    if (e.buttons > 0){

        
        if(isRainbowActive){
            hexNum = randomColor();
            e.target.style.backgroundColor = hexNum
            

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
                
            }


        } else if (isSingleColorActive) {
            //Paint with single color 
            e.target.style.backgroundColor = activeColor;
            
        }
    }
    

}

function adjustBrightness(col, amt) {
    
    let usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    let R = parseInt(col.substring(0,2),16);
    let G = parseInt(col.substring(2,4),16);
    let B = parseInt(col.substring(4,6),16);

    
    R = R - amt;
    G = G - amt;
    B = B - amt;

    if (R > 255) R = 255;
    else if (R < 0) R = 0;

    if (G > 255) G = 255;
    else if (G < 0) G = 0;

    if (B > 255) B = 255;
    else if (B < 0) B = 0;

    let RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    let GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    let BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return (usePound?"#":"") + RR + GG + BB;

}

let gridItems = document.querySelectorAll(".grid-cells");

gridItems.forEach(elem=>{
    elem.addEventListener('mousedown', paintOnHover);
    elem.addEventListener('mouseenter', paintOnHover);
});



function customizeGrid(){

    //unpressed the buttons
    buttons.forEach(btn=>btn.classList.remove("pressed"));
    
    resizePickedColors();


    wasGridModified = true;
    
    gridSize = inputRange.value;
    let newGridCells;
    let lastColumnCells;

    //To make a new grid, it's necessary to remove the old cells
    removeElementsByClass("grid-cells");
    makeGrid(gridSize, gridSize);
       

    //select the new cells and deletes borders of the last columns and rows        
    newGridCells = document.querySelectorAll(".grid-cells");
    lastColumnCells = document.querySelectorAll(`.grid-cells:nth-child(${gridSize}n)`);
        //deletes right border
    lastColumnCells.forEach(elem =>{
    elem.style.borderRight = "none";
    
    });

     //deletes bottom border
    for(let i=newGridCells.length-gridSize; i<newGridCells.length;i++){
        console.log("hola");
        console.log(newGridCells);
        newGridCells[i].style.borderBottom = "none";
    }
    
     //attach event listeners to the new cells

    newGridCells.forEach(elem=>{
        elem.addEventListener('mousedown', paintOnHover);
        elem.addEventListener('mouseenter', paintOnHover);
    });
    
    toggleBooleans();
    activeColor = colorBackup;
    borderColor = colorBackup; 

}



function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}


//deletes de right border from the cells of the last column

lastColumnCells.forEach(elem =>{
    elem.style.borderRight = "none";
    
});


//deletes border bottom to the last row
for(let i=gridItems.length-gridSize; i<gridItems.length;i++){
    gridItems[i].style.borderBottom = "none";
}



//Save the drawing

saveBtn.addEventListener('click', ()=>{
    domtoimage.toBlob(document.getElementById('grid'))
    .then(function (blob) {
        window.saveAs(blob, 'my-drawing.png');
    });

});



    

