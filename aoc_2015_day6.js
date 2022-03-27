const SIZE = 1000;
const lightsGrid = Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));
const lineRegex = /^(turn\soff|toggle|turn\son)\s(\d+,\d+)\s.*\s(\d+,\d+)$/;

fetch("https://adventofcode.com/2015/day/6/input")
.then(res => res.text())
.then(data => parseInstructions(data))
.catch(err => console.error(err));

function parseInstructions(data) {
    let lines = data.split("\n").forEach((line) => {
        [_, operation, startCoords, endCoords] = line.match(lineRegex) || [];
        handleLightsGrid({operation, startCoords, endCoords});
    });

    let lit = lightsGrid.map((x) => {
        return x.reduce((start, y) => y > 0 ? ++start : start, 0);
    }).reduce((start, x) => start + x);
    console.log(lit);
}

function handleLightsGrid({operation, startCoords, endCoords}) {
    let [startRow, startCol] = startCoords?.split(",") || [],
        [endRow, endCol] = endCoords?.split(",") || [];

    // explicit conversion always
    for(let i = +startRow; i <= +endRow; i++) {
        for(let j = +startCol; j <= +endCol; j++) {
            if (operation === "turn off") lightsGrid[i][j] = 0;
            if (operation === "turn on") lightsGrid[i][j] = 1;
            if (operation === "toggle") lightsGrid[i][j] = lightsGrid[i][j] === 1 ? 0 : 1;
        }
    }
}

///////////////////////////// part 2 /////////////////////////////////

// const SIZE = 1000;
// const lightsGrid = Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));
// const lineRegex = /^(turn\soff|toggle|turn\son)\s(\d+,\d+)\s.*\s(\d+,\d+)$/;

// fetch("https://adventofcode.com/2015/day/6/input")
// .then(res => res.text())
// .then(data => parseInstructions(data))
// .catch(err => console.error(err));

// function parseInstructions(data) {
//     let lines = data.split("\n").forEach((line) => {
//         [_, operation, startCoords, endCoords] = line.match(lineRegex) || [];
//         handleLightsGrid({operation, startCoords, endCoords});
//     });

//     let lit = lightsGrid.map((x) => {
//         return x.reduce((start, y) => y > 0 ? start + y : start, 0);
//     }).reduce((start, x) => start + x);
//     console.log(lit);
// }

// function handleLightsGrid({operation, startCoords, endCoords}) {
//     let [startRow, startCol] = startCoords?.split(",") || [],
//         [endRow, endCol] = endCoords?.split(",") || [];

//     // explicit conversion always
//     for(let i = +startRow; i <= +endRow; i++) {
//         for(let j = +startCol; j <= +endCol; j++) {
//             if (operation === "turn off") lightsGrid[i][j] = --lightsGrid[i][j] < 0 ? 0 : lightsGrid[i][j];
//             if (operation === "turn on") lightsGrid[i][j] += 1; 
//             if (operation === "toggle") lightsGrid[i][j] += 2;
//         }
//     }
// } 
