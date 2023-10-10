const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const ROW = 15;
const COL = 10;
const SQ = 40;


function drawSquare(x, y, colorS = '#444444', colorF = '#ccc') {
    ctx.fillStyle = colorF;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

    ctx.strokeStyle = colorS;
    ctx.strokeRect(x * (SQ), y * (SQ), SQ, SQ);
}

for (let y = 0; y < ROW; y++) {
    ctx.lineWidth = 1;
    for (let x = 0; x < COL; x++) {
        drawSquare(x, y, 'black', 'white');
    }
}
const Icon = [
    // {
    //     l: function (x, y, color = 'red') {
    //         drawSquare(x, y, 'black', 'black');
    //         drawSquare(x, y - 1, 'black', color);
    //         drawSquare(x, y + 1, 'black', color);
    //         drawSquare(x + 1, y + 1, 'black', color);
    //         return [
    //             {
    //                 x: x,
    //                 y: y
    //             },
    //             {
    //                 x: x,
    //                 y: y - 1
    //             },
    //             {
    //                 x: x,
    //                 y: y + 1
    //             },
    //             {
    //                 x: x + 1,
    //                 y: y + 1
    //             },
    //
    //         ]
    //     }
    // },
    // {
    //     l: function (x, y, color = 'green') {
    //         drawSquare(x, y, 'black', 'black');
    //         drawSquare(x, y - 1, 'black', color);
    //         drawSquare(x, y + 1, 'black', color);
    //         drawSquare(x + 1, y, 'black', color);
    //         return [
    //             {
    //                 x: x,
    //                 y: y
    //             },
    //             {
    //                 x: x,
    //                 y: y - 1
    //             },
    //             {
    //                 x: x,
    //                 y: y + 1
    //             },
    //             {
    //                 x: x + 1,
    //                 y: y
    //             },
    //
    //         ]
    //     }
    // },
    // {
    //     l: function (x, y, color = 'blue') {
    //         drawSquare(x, y, 'black', 'black');
    //         drawSquare(x + 1, y, 'black', color);
    //         drawSquare(x, y + 1, 'black', color);
    //         drawSquare(x + 1, y + 1, 'black', color);
    //         return [
    //             {
    //                 x: x,
    //                 y: y
    //             },
    //             {
    //                 x: x + 1,
    //                 y: y
    //             },
    //             {
    //                 x: x,
    //                 y: y + 1
    //             },
    //             {
    //                 x: x + 1,
    //                 y: y + 1
    //             },
    //
    //         ]
    //     }
    // },
    // {
    //     l: function (x, y, color = 'yellow') {
    //         drawSquare(x, y, 'black', 'black');
    //         drawSquare(x + 1, y, 'black', color);
    //         drawSquare(x, y + 1, 'black', color);
    //         drawSquare(x + 1, y - 1, 'black', color);
    //         return [
    //             {
    //                 x: x,
    //                 y: y
    //             },
    //             {
    //                 x: x + 1,
    //                 y: y
    //             },
    //             {
    //                 x: x,
    //                 y: y + 1
    //             },
    //             {
    //                 x: x + 1,
    //                 y: y - 1
    //             },
    //
    //         ]
    //     }
    // },
    {
        l: function (x, y, color = 'blue') {
            ctx.lineWidth = 1;
            drawSquare(x, y, 'black', color);
            return [
                {
                    x: x,
                    y: y
                },
            ]
        }
    },
    {
        l: function (x, y, color = 'green') {
            ctx.lineWidth = 1;
            drawSquare(x, y, 'black', color);
            drawSquare(x + 1, y, 'black', 'black');
            // drawSquare(x, y-1, 'black', 'black');
            return [
                {
                    x: x,
                    y: y
                },
                {
                    x: x + 1,
                    y: y
                },
                // {
                //     x: x,
                //     y: y-1
                // },

            ]
        }
    },

];

function clearOldRect(oldRect) {
    ctx.lineWidth = 1;
    oldRect.forEach(function (rect, index) {
        ctx.clearRect(rect.x * SQ, rect.y * SQ, SQ, SQ);
        drawSquare(rect.x, rect.y, 'black', 'white');
    });
}

canvas.tabIndex = 1;
// Icon[3].l(2,2);
// console.log(Math.floor(Math.random() * Icon.length));
let x = 4;
let y = -2;
let sideL = true;
let sideR = true;
let index = (Math.floor(Math.random() * Icon.length));
let points = [
    [
        {
            x: -100,
            y: -100
        }
    ]
];


function checkSide() {
    let status = 'side0';
    let sideR=false;
    let sideL=false;
    points.forEach((point) => {
        point.forEach((value) => {
            console.log('x: '+value.x+' y: '+value.y);
            if (value.y === y) {
                if (value.x - 1 === x) {
                    // console.log('ở sát bên trái ô x:'+value.x+' y:'+value.y);
                    status = 'sideL';
                    sideL=true;
                }
                if (value.x + 1 === x) {
                    // console.log('ở sát bên phải ô x:'+value.x+' y:'+value.y);
                    status = 'sideR';
                    sideR=true;
                }
            }
            if (y + 1 >= ROW) {
                status = '';
            }
            if ((value.x === x) && value.y - 1 === y) {
                status = '';
            }

        });
    });
    if(sideR&&sideL){
        status='side||';
    }

    return status;
}

canvas.addEventListener('keydown', function vip(e) {

    if (checkSide()!=='') {
        if (checkSide() === 'side0') {
            if (e.keyCode === 37) {
                move('left');
                return;
            }
            if (e.keyCode === 39) {
                move('right');
                return;
            }
        }
        if (checkSide() === 'sideL') {
            if (e.keyCode === 37) {
                move('left');
                return;
            }
        }
        if (checkSide() === 'sideR') {
            if (e.keyCode === 39) {
                move('right');
                return;
            }
        }

        if (e.keyCode === 38) {
            move('up');
        }
        if (e.keyCode === 40) {
            move('down');
        }
        if (e.keyCode === 13) {
            console.log(checkSide());
        }

    } else{
        points.push(Icon[index].l(x, y));
        y = -2;
        index = (Math.floor(Math.random() * Icon.length));
    }

});

function move(value) {
    clearOldRect(Icon[index].l(x, y));
    if (value === 'left') {
        --x
    }
    if (value === 'right') {
        ++x;
    }
    if (value === 'up') {
        --y;
    }
    if (value === 'down') {
        ++y;
    }
    Icon[index].l(x, y);
}



