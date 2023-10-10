const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const ROW = 18;
const COL = 10;
const SQ = 40;
let scores=[];
let score = 0;
let scoreOfARow = 10;
let scoreElement = document.querySelector(".score");

canvas.setAttribute('width', COL * SQ);
canvas.setAttribute('height', ROW * SQ);
let p = 2;// chỉnh độ giãn cách giữa các ô
ctx.lineWidth = 3;
canvas.tabIndex = 1;

const opacity = 0.7;
const gridColor = 'rgba(1,7,70,0.4)';

let grid =
    {
        x: 0,
        y: 0,
        shape: [],
        color: gridColor
    }

for (let i = 0; i < ROW; i++) {
    grid.shape[i] = [];
    for (let j = 0; j < COL; j++) {
        grid.shape[i][j] = gridColor;
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

//drawn shape

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
                if (col !== gridColor) {
                    grid.shape[block.y + y][block.x + x] = block.color;
                    drawSquare(block.x + x, block.y + y, 'white', block.color);
                    // check chạm block đáy và đáy
                    if (block.y + y + 1 === ROW) {
                        status.isNotSideBt = false
                        return;
                    }
                    if (grid.shape[block.y + y + 1][block.x + x] !== gridColor) {
                        status.isNotSideBt = false;
                    }
                    // check chạm block bên trái
                    if (x === 0) {
                        if (block.x + x - 1 < 0) {
                            status.isNotSideL = false;
                            return;
                        }
                        if (grid.shape[block.y + y][block.x + x - 1] !== gridColor) {
                            status.isNotSideL = false;
                        }
                    }
                    // check chạm block bên phải
                    if (block.x + x + 1 === COL) {
                        status.isNotSideR = false;
                        return;
                    }
                    if (grid.shape[block.y + y][block.x + x + 1] !== gridColor) {
                        status.isNotSideR = false;
                    }
                }
            }
            if (type === 'remove') {
                if (col !== gridColor) {
                    grid.shape[block.y + y][block.x + x] = gridColor;
                    drawSquare(block.x + x, block.y + y, 'transparent', gridColor, 'remove');
                }
            }
        });
    });
    return status
}

let x = 4;
let y = 0;

const Icons = [
    {
        x: x,
        y: y,
        shape: [
            [1, 0, 0],
            [1, 1, 1]
        ],
        color: '#3F47CD'
    },
    {
        x: x,
        y: y,
        shape: [
            [0, 0, 1],
            [1, 1, 1]
        ],
        color: '#FF7E26'
    },
    {
        x: x,
        y: y,
        shape: [
            [1, 1],
            [1, 1]
        ],
        color: '#FFCA0F'
    },
    {
        x: x,
        y: y,
        shape: [
            [0, 1, 0],
            [1, 1, 1]
        ],
        color: '#A14AA2'
    },
    {
        x: x,
        y: y,
        shape: [
            [0, 1, 1],
            [1, 1, 0]
        ],
        color: '#1FB44A'
    },
    {
        x: x,
        y: y,
        shape: [
            [1, 1, 0],
            [0, 1, 1]
        ],
        color: '#EC2423'
    },
    {
        x: x,
        y: y,
        shape: [
            [1, 1, 1, 1]
        ],
        color: '#00A2E8'
    },

];
let index = Math.floor(Math.random() * Icons.length);

Icons.forEach((Icon, index) => {
    Icon.shape.forEach((row, y) => {
        row.forEach((col, x) => {
            if (col === 1) {
                Icons[index].shape[y][x] = Icon.color
            } else {
                Icons[index].shape[y][x] = gridColor;
            }
        })
    });
})
function updateGrid(block,type=0){
    block.shape.forEach((row, y) => {
        row.forEach((col, x) => {
            if(type===0){
                drawSquare(block.x + x, block.y + y, 'transparent', block.color, 'delete');
                drawSquare(block.x + x, block.y + y, 'transparent', col);
                if(col!==gridColor){
                    drawSquare(block.x + x, block.y + y, 'white', col);
                }
            }else {
                drawSquare(block.x + x, block.y + y, 'transparent', block.color, 'delete');
                drawSquare(block.x + x, block.y + y, 'transparent', gridColor);
                grid.shape[y][x]=gridColor
            }
        });
    });

}

updateGrid(grid)
let blockSide = '';
let handleMove=function (e) {
    x = Icons[index].x;
    y = Icons[index].y;

    if (blockSide.isNotSideL && blockSide.isNotSideR) {
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

    }
    // resetIndex();
}
document.addEventListener('keydown', handleMove);
let moveDown=setInterval(()=>{
    move('down');
},1000);
function resetIndex() {
    if (blockSide.isNotSideBt === false) {
        index = Math.floor(Math.random() * Icons.length);
        Icons[index].x = 4;
        Icons[index].y = 0;
        clearLine(grid);
        if(checkLose()){
            srcClickToPlay();
            scores.push(score);
            document.removeEventListener('keydown',handleMove);
            canvas.addEventListener('click',handleClickToPlay);
            alert('bạn đã thua');
            clearInterval(moveDown);
        }else {
            canvas.removeEventListener('click',handleClickToPlay);
        }
    }
}
function move(value, x, y) {
    x = Icons[index].x;
    y = Icons[index].y;
    updateGrid(grid)
    drawBlock(Icons[index], x, y, 'remove');
    if (value === 'up') {
        let outSide = checkOutSide(Icons[index], x, y);
        Icons[index].shape = rotate(Icons[index]);
        if (outSide > 0) {
            x -= outSide;
        }
    }
    if (value === 'left') {
        --x
    }
    if (value === 'right') {
        ++x;
    }
    if (value === 'down') {
        ++y;
    }
    blockSide = drawBlock(Icons[index], x, y);
    // console.log(grid.shape);
    resetIndex();
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
            if (col !== gridColor) {
                count++;
            }
        });
        if (count === 10) {
            scoreElement.innerHTML = 'Score: ' + `${score += scoreOfARow}`;
            grid.shape[y] = row.map((value, index) => value = gridColor);
            const moveItem = grid.shape.splice(y, 1)[0];
            // grid.shape.unshift(moveItem);
            grid.shape.splice(0, 0, moveItem);
            updateGrid(grid);
        }
    });
}

function checkLose(){
    let status=false;
    grid.shape[3].forEach((value)=>{
        if(value!==gridColor){
            status=true;
        }
    });
    return status
}

function checkOutSide(block, x, y) {
    let outSide = '';
    block.shape.forEach((row, y) => {
        row.forEach((col, x) => {
            outSide = rotate(block)[0].length + block.x - COL;
        });
    });
    return outSide;
}


//replay if game loses
let img=new Image();
img.src='./replay.webp';
let handleClickToPlay=function (e){
    // console.log(checkHoverClickToPlay(e));
    if(checkHoverClickToPlay(e)){
        document.addEventListener('keydown', handleMove);
        updateGrid(grid,1);
        score=0;
        scoreElement.innerHTML = 'Score: ' + score;
    }
}
let checkHoverClickToPlay=function (e){
    let status=false;
    let w=100;
    let h=100;
    let x=COL*SQ/2-w/2
    let y=SQ*3+260
    if(e.offsetX>=x&&e.offsetX<=x+w){
        if(e.offsetY>=y&&e.offsetY<=y+h){
            status=true;
        }
    }
    return status;
}
function srcClickToPlay(){
    let w=100;
    let h=100;
    let x=COL*SQ/2-w/2
    let y=SQ*3+260
    ctx.fillStyle='rgba(0,0,0,0.7)';
    ctx.fillRect(0,SQ*3,COL*SQ,ROW*SQ);
    ctx.drawImage(img,x,y,w,h);
}











