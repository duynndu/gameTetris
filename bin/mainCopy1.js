const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const ROW = 15;
const COL = 10;
const SQ = 40;
let p = 2;// chỉnh độ giãn cách giữa các ô
ctx.lineWidth = 3;
canvas.tabIndex = 1;

const opacity = 0.7;
const gridColor = 'rgba(1,7,70,0.4)';

let grid =
    {
        x: 0,
        y: 0,
        shape: []
    }

for (let i = 0; i < ROW; i++) {
    grid.shape[i] = [];
    for (let j = 0; j < COL; j++) {
        grid.shape[i][j] = 0;
    }
}
let colors = grid;

const drawSquare = (x, y, colorS = '#444444', colorF = '#ccc', type = 'create') => {
    ctx.strokeStyle = colorS;
    ctx.fillStyle = colorF;
    if (type === 'create') {
        ctx.fillRect(x * SQ + p, y * SQ + p, SQ - (p * 2), SQ - (p * 2));
        ctx.strokeRect(x * SQ + p, y * SQ + p, SQ - (p * 2), SQ - (p * 2));
    }
    if (type === 'remove') {
        ctx.clearRect(x * SQ - 1, y * SQ - 1, SQ + 2, SQ + 2);
        ctx.strokeRect(x * SQ + p, y * SQ + p, SQ - (p * 2), SQ - (p * 2));
        ctx.fillRect(x * SQ + p, y * SQ + p, SQ - (p * 2), SQ - (p * 2));
    }
    if (type === 'delete') {
        ctx.clearRect(x * SQ - 1, y * SQ - 1, SQ + 2, SQ + 2);
    }
};

function drawBlock(block, x, y, type = 'create') {
    block.x = x;
    block.y = y;
    let status = {
        isNotSideBt: true,
        isNotSideL: true,
        isNotSideR: true
    };

    block.shape.forEach(function (row, y) {
        row.forEach(function (col, x) {
            if (type === 'create') {
                if (col === 1) {
                    grid.shape[block.y + y][block.x + x] = 1;
                    drawSquare(block.x + x, block.y + y, 'white', block.color);
                    // check chạm block đáy và đáy
                    if (block.y + y + 1 === ROW) {
                        status.isNotSideBt = false;
                        return;
                    }
                    if (grid.shape[block.y + y + 1][block.x + x] === 1) {
                        status.isNotSideBt = false;
                    }
                    // check chạm block bên trái
                    if (x === 0) {
                        if (block.x + x - 1 < 0) {
                            status.isNotSideL = false;
                            return;
                        }
                        if (grid.shape[block.y + y][block.x + x - 1]) {
                            status.isNotSideL = false;
                        }
                    }
                    // check chạm block bên phải
                    if (block.x + x + 1 === COL) {
                        status.isNotSideR = false;
                        return;
                    }
                    if (grid.shape[block.y + y][block.x + x + 1] === 1) {
                        status.isNotSideR = false;
                    }
                }


            }
            if (type === 'remove') {
                if (col === 1) {
                    grid.shape[block.y + y][block.x + x] = 0;
                    drawSquare(block.x + x, block.y + y, 'transparent', gridColor, 'remove');
                    // drawSquare(block.x + x, block.y + y, 'white', gridColor);
                }
            }
            if (type === 'grid') {
                if (col === 0) {
                    drawSquare(block.x + x, block.y + y, 'transparent', gridColor, 'delete');
                    drawSquare(block.x + x, block.y + y, 'transparent', gridColor);
                }
            }
        });
    });
    return status
}

function isColor(block) {
    let pattern = /^#.{6}/
}

const Icon = [
    {
        x: 4,
        y: 0,
        shape: [
            [1, 0, 0],
            [1, 1, 1]
        ],
        color: '#3F47CD'
    },
    {
        x: 4,
        y: 0,
        shape: [
            [0, 0, 1],
            [1, 1, 1]
        ],
        color: '#FF7E26'
    },
    {
        x: 4,
        y: 0,
        shape: [
            [1, 1],
            [1, 1]
        ],
        color: '#FFCA0F'
    },
    {
        x: 4,
        y: 0,
        shape: [
            [0, 1, 1],
            [1, 1, 0]
        ],
        color: '#1FB44A'
    },
    {
        x: 4,
        y: 0,
        shape: [
            [0, 1, 0],
            [1, 1, 1]
        ],
        color: '#A14AA2'
    },
    {
        x: 4,
        y: 0,
        shape: [
            [1, 1, 0],
            [0, 1, 1]
        ],
        color: '#EC2423'
    },
    {
        x: 4,
        y: 0,
        shape: [
            [1, 1, 1, 1]
        ],
        color: '#00A2E8'
    },

];

drawBlock(grid, 0, 0, 'grid');
let blockSide = '';
let index = Math.floor(Math.random() * Icon.length);
document.addEventListener('keydown', function (e) {
    x = Icon[index].x;
    y = Icon[index].y;
    // drawBlock(grid, 0, 0, 'grid');
    clearLine(grid);
    if (blockSide.isNotSideBt && blockSide.isNotSideL && blockSide.isNotSideR) {
        if (e.keyCode === 37) {
            move('left', x, y);
        }
        if (e.keyCode === 39) {
            move('right', x, y);
        }
    }
    if (blockSide.isNotSideR === false) {
        if (e.keyCode === 37) {
            move('left', x, y);
        }
    }
    if (blockSide.isNotSideL === false) {
        if (e.keyCode === 39) {
            move('right', x, y);
        }
    }
    if (e.keyCode === 38) {
        move('up', x, y);
    }
    if (e.keyCode === 40) {
        move('down', x, y);
    }
    if (blockSide.isNotSideBt === false) {
        index = Math.floor(Math.random() * Icon.length);
        Icon[index].x = 4;
        Icon[index].y = 0;
    }
});


function move(value, x, y) {
    drawBlock(grid, 0, 0, 'grid');
    drawBlock(Icon[index], x, y, 'remove');
    console.log(grid.shape);
    if (value === 'left') {
        --x
    }
    if (value === 'right') {
        ++x;
    }
    if (value === 'up') {
        // --y;
        Icon[index].shape = rotate(Icon[index]);
    }
    if (value === 'down') {
        ++y;
    }
    blockSide = drawBlock(Icon[index], x, y);
    // drawBlock(grid, 0, 0, 'grid');
    console.log(blockSide);
}

function rotate(block) {
    let newShape = [];
    for (let i = 0; i < block.shape[0].length; i++) {
        newShape[i] = [];
        for (let j = 0; j < block.shape.length; j++) {
            newShape[i][j] = block.shape[j][i];
        }
    }
    return newShape.reverse();
}

function clearLine(grid) {
    grid.shape.forEach((row, y) => {
        let count = 0;
        row.forEach((col, x) => {
            if (col === 1) {
                count++;
            }
        });
        if (count === 10) {
            grid.shape[y] = row.map((value, index) => value = 0);
            drawBlock(grid, 0, 0, 'grid');
        }
    });
}







