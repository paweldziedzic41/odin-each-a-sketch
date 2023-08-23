function printGrids(gridSize){
    const container = document.querySelector(".container-grid");
    
    gridStyle(gridSize, container);
    extraButtons(container);

    for (i = 1; i <= gridSize; i++){
        for (j = 1; j <= gridSize; j++){
            const gridDiv = document.createElement("div");
            gridDiv.style.gridColumn = i +"/"+ i;
            gridDiv.style.gridRow = j +"/" + j;
            gridDiv.draggable = "true";
            container.appendChild(gridDiv);
            gridDiv.addEventListener("click", () => color(gridDiv));
            gridDiv.addEventListener("dragover", () => color(gridDiv));
        }
    }


    function color(gridDiv){
        const rainbowBtn = document.querySelector(".rainbow-grid-color");
        const colorBtn = document.querySelector(".custom-grid-color");
        if (rainbowBtn.id === "active"){ 
            const rgb = getRgbNumbers();
            gridDiv.style.backgroundColor = "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";
        }else if (colorBtn.id === "active") gridDiv.style.backgroundColor = colorBtn.value;
        else gridDiv.style.backgroundColor = "white";
    }   

    function getRgbNumbers(){
        numbersArray = [0,0,0];
        numbersArray.forEach((number, index, array) => {
            array[index] = Math.floor(Math.random()*255);
        });
        return numbersArray;
    }
}

function extraButtons(container){
    const rainbowBtn = document.querySelector(".rainbow-grid-color");
    const clearGridBtn = document.querySelector(".clear-grid");
    const customBtn = document.querySelector(".custom-grid-color")
    const eraserBtn = document.querySelector(".eraser")
    
    rainbowBtn.id = "";
    customBtn.id = "active";
    eraserBtn.id = "";

    clearGridBtn.addEventListener("click", () => {
        const grids = container.querySelectorAll("div");
        grids.forEach((grid) => {
            grid.style.backgroundColor = "white";
        })
    }) 
    rainbowBtn.addEventListener("click", () => {
        rainbowBtn.id = "active";
        customBtn.id = "";
        eraserBtn.id = "";
    })
    customBtn.addEventListener("click", () => {
        rainbowBtn.id = "";
        customBtn.id = "active";
        eraserBtn.id = "";
    })
    eraserBtn.addEventListener("click", () => {
        rainbowBtn.id = "";
        customBtn.id = "";
        eraserBtn.id = "active";
    })
    
}

function gridStyle(gridSize, container){
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat("+gridSize+",auto);";
    container.style.gridTemplateRows = "repeat("+gridSize+",auto);";
}

function deleteGrids(){
    const container = document.querySelector(".container-grid");
    while (container.firstChild){
        container.removeChild(container.firstChild);
    } 
}

function getGridSize(){
    const parameters = document.querySelector(".container-parameters");
    let gridRange = document.querySelector(".grid-size");
    let gridRangeValue = document.createElement("p");
    gridRangeValue.textContent = gridRange.value + " x " + gridRange.value;
    parameters.appendChild(gridRangeValue);

      gridRange.addEventListener("mousemove", () => {
        gridRangeValue.textContent = gridRange.value + " x " + gridRange.value;
        parameters.appendChild(gridRangeValue);
      });
      gridRange.addEventListener("mouseup", () => {
        deleteGrids();
        printGrids(gridRange.value); 
      });
}

printGrids(16);
getGridSize();


