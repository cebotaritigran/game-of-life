

let currentGrid = [];
let nextGrid = [];

let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let container = document.querySelector('.container');



let rows = 250;
let cols = 250;
let alive = 1;
let dead = 0;
let generation = 0;


function createGridSystem() {



    for (let x = 0; x < rows; x++) {
        currentGrid[x] = []
        for (let y = 0; y < cols; y++) {
            currentGrid[x][y] = Math.floor(Math.random() * (1 - 0 + 1) + 0);
        }
    }
    // console.log(currentGrid);
    // currentGrid[4][4] = 1;
    // console.log(checkNeighbor(4, 4))
    // console.log(currentGrid[4][4])
    drawGridToHTML(currentGrid)
    updateGrid(currentGrid);
}

function drawGridToHTML(grid) {
    if (container.innerHTML.trim() === "") {
        for (let x = 0; x < rows; x++) {
            for (let y = 0; y < cols; y++) {
                let box = document.createElement('div');
                box.classList.add('box');
                container.appendChild(box);
                box.setAttribute("id", x + "-" + y)
            }
        }
    }

    let boxes = document.querySelectorAll('.box')
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            let index = x * cols + y;
            if (grid[x][y] == 1) {
                boxes[index].classList.add('alive');
            } else {
                boxes[index].classList.remove('alive');
            }
        }
    }

}

function updateGrid(grid) {
    nextGrid = currentGrid.map(row => [...row]);
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            let neighbors = checkNeighbor(x, y)
            if (currentGrid[x][y] === 1) {
                if (neighbors < 2 || neighbors > 3) {
                    nextGrid[x][y] = 0; // dies
                }
            } else {
                if (neighbors === 3) {
                    nextGrid[x][y] = 1; // becomes alive
                }
            }
        }
    }

    currentGrid = nextGrid;
    drawGridToHTML(currentGrid);

}

// given coordinate of a cell, checking for neighbors
function checkNeighbor(x, y) {
    let count = 0;
    // y - 1 = West
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            if (dx == 0 && dy == 0) continue;
            let nx = x + dx;
            let ny = y + dy;
            if (nx >= 0 && ny >= 0 && nx < rows && ny < cols) {
                if (currentGrid[nx][ny] === 1) {
                    count++;
                }
            }

        }

    }

    return count;
}
createGridSystem();

// function update() {

//     updateGrid();
//     requestAnimationFrame(update);
// }

// update();

setInterval(updateGrid, 20)


