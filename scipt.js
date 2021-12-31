//values from DOM
const gridContainer = document.querySelector('.grid-container');
const changeGridButton = document.querySelector('.change-grid');
const clearGridButton = document.querySelector('.clear');
const alphaButton = document.querySelector('.alpha');

//values to set square sizes
const gridSize = +getComputedStyle(gridContainer).width.slice(0,3);
let numSquares = 16;
let useAlpha = false;

//attach event listners to buttons
changeGridButton.addEventListener('click', () =>{
    let newSize = prompt(`Enter new grid size (4->100). Current grid: ${numSquares}`);
    if(newSize > 100)
        numSquares = 100;
    else if( newSize < 4)
        numSquares = 4;
    else 
        numSquares = newSize;
    
    ResetGrid();
});

clearGridButton.addEventListener('click', ()=>ResetGrid());

alphaButton.addEventListener('click', ()=>{
    if(useAlpha)
        useAlpha = false;
    else
        useAlpha = true;
});


function activated(e)
{
    let rgba = getComputedStyle(e).getPropertyValue("background-color");
    let rgbarray= rgba.slice(5,rgba.length-1).split(",");
    let alpha = +rgbarray[3];
    
    if(useAlpha)
    {
        if(alpha <= 0.9)
        {
            alpha +=0.1;
            rgbarray[3] = `${alpha}`;
        }
    }
    else
        rgbarray[3] = '1.0';
        
    e.style.backgroundColor = `rgba(${rgbarray.toString()})`;
    
}

//size each square and add appropriate values
function MakeGrid(squares = numSquares, container = gridContainer){

    let squareSize = gridSize/numSquares;

    for (let i = 0; i < squares**2; i++)
    {
        let gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        gridSquare.classList.add('activated');
        gridSquare.setAttribute('style', `width: ${squareSize-2}px; height: ${squareSize-2}px;`);
        gridSquare.addEventListener('mouseenter', e=>activated(e.target));
        container.appendChild(gridSquare);
    }
}

//delete all children in the grid container
function ClearGrid(container = gridContainer)
{
    while(container.firstChild)
    {
        container.removeChild(container.firstChild);
    }  
    
}


function ResetGrid()
{
    ClearGrid();
    MakeGrid();
}

ResetGrid();