var red = {
    x : 0,
    y : 0,
    type : 0,
    rotate : 0,
    next : 0,
    score : 0,
    tile : new Array(20),
    prev_tile : new Array(20),
    send_pos : new Array(5),
    send_cnt : new Array(5),
    send_arr : new Array(5),
    sent_line : 0,
}
var blue = {
    x : 0,
    y : 0,
    type : 0,
    rotate : 0,
    next : 0,
    score : 0,
    tile : new Array(20),
    prev_tile : new Array(20),
    send_pos : new Array(5),
    send_cnt : new Array(5),
    send_arr : new Array(5),
    sent_line : 0,
}
for(let i = 0; i < 20; i++){
    red.tile[i] = new Array(10);
    red.prev_tile[i] = new Array(10);
    blue.tile[i] = new Array(10);
    blue.prev_tile[i] = new Array(10);
    for(let j = 0; j < 10; j++){
        red.tile[i][j] = 0;
        blue.tile[i][j] = 0;
    }
}
for(let k = 0; k < 5; k++){
    red.send_pos[k] = 0;
    red.send_cnt[k] = 0;
    red.send_arr[k] = new Array(4);
    blue.send_pos[k] = 500;
    blue.send_cnt[k] = 0;
    blue.send_arr[k] = new Array(4);
    for(let i = 0; i < 4; i++){
        red.send_arr[k][i] = new Array(10);
        blue.send_arr[k][i] = new Array(10);
        for(let j = 0; j < 10; j++){
            red.send_arr[k][i][j] = 0;
            blue.send_arr[k][i][j] = 0;
        }
    }
}
var block = new Array(7);
for(let i = 0; i < 7; i++){
    block[i] = new Image();
    block[i].src = "image/block"+i+".png";
}
var star_img = new Array(2);
for(let i = 0; i < 2; i++){
    star_img[i] = new Image();
    star_img[i].src = "image/star" + i + ".png";
}
var gridCanvas1 = document.getElementById("grid-canvas1");
var gridCanvas2 = document.getElementById("grid-canvas2");
var nextCanvas1 = document.getElementById("next-canvas1");
var nextCanvas2 = document.getElementById("next-canvas2");
var sendCanvas = document.getElementById("send-canvas");
var starCanvas1 = document.getElementById("star-canvas1");
var starCanvas2 = document.getElementById("star-canvas2");

var gridContext1 = gridCanvas1.getContext('2d');
var gridContext2 = gridCanvas2.getContext('2d');
var nextContext1 = nextCanvas1.getContext('2d');
var nextContext2 = nextCanvas2.getContext('2d');
var sendContext = sendCanvas.getContext('2d');
var starContext1 = starCanvas1.getContext('2d');
var starContext2 = starCanvas2.getContext('2d');
function gameManager(){
    drawRedNext();
    drawRedPlayer();
    drawBlueNext();
    drawBluePlayer();
    drawSendTiles();
    // drawRedNext(nextCanvas1, nextContext1);
    // drawRedPlayer(gridCanvas1, gridContext1);
    // drawBluePlayer(gridCanvas2, gridContext2);
    // drawSendTiles(sendCanvas, sendContext);
}
function drawRedPlayer(){
    gridContext1.save();
    gridContext1.clearRect(0, 0, gridCanvas1.width, gridCanvas1.height);
    for(let i = 0; i < 20; i++){
        for(let j = 0; j < 10; j++){
            if(red.tile[i][j] > 0){
                gridContext1.drawImage(block[red.tile[i][j]-1], j*25, i*25, 25, 25);
            }
        }
    }
    let tile_arr = get_tetrominoes(red.type, red.rotate);
    for(let i = 0; i < tile_arr.length; i++){
        for(let j = 0; j < tile_arr.length; j++){
            if(tile_arr[i][j] === 1){
                gridContext1.drawImage(block[red.type], (red.y+j)*25, (red.x+i)*25, 25, 25);
            }
        }
    }
    gridContext1.restore();
}
function drawBluePlayer(){
    gridContext2.save();
    gridContext2.clearRect(0, 0, gridCanvas2.width, gridCanvas2.height);
    for(let i = 0; i < 20; i++){
        for(let j = 0; j < 10; j++){
            if(blue.tile[i][j] > 0){
                gridContext2.drawImage(block[blue.tile[i][j]-1], j*25, i*25, 25, 25);
            }
        }
    }
    if(play_mode === 2){
        let tile_arr = get_tetrominoes(blue.type, blue.rotate);
        for(let i = 0; i < tile_arr.length; i++){
            for(let j = 0; j < tile_arr.length; j++){
                if(tile_arr[i][j] === 1){
                    gridContext2.drawImage(block[blue.type], (blue.y+j)*25, (blue.x+i)*25, 25, 25);
                }
            }
        }
    }
    gridContext2.restore();
}
function drawRedNext(){
    nextContext1.save();
    nextContext1.clearRect(0, 0, nextCanvas1.width, nextCanvas1.height);
    let tile_arr = get_tetrominoes(red.next, 0);
    for(let i = 0; i < tile_arr.length; i++){
        for(let j = 0; j < tile_arr.length; j++){
            if(tile_arr[i][j] === 1){
                nextContext1.drawImage(block[red.next], 50-tile_arr.length*12+j*25, 50-tile_arr.length*12+i*25, 25, 25);
            }
        }
    }
    nextContext1.restore();
}
function drawBlueNext(){
    if(play_mode !== 2) return;
    nextContext2.save();
    nextContext2.clearRect(0, 0, nextCanvas2.width, nextCanvas2.height);
    let tile_arr = get_tetrominoes(blue.next, 0);
    for(let i = 0; i < tile_arr.length; i++){
        for(let j = 0; j < tile_arr.length; j++){
            if(tile_arr[i][j] === 1){
                nextContext2.drawImage(block[blue.next], 50-tile_arr.length*12+j*25, 50-tile_arr.length*12+i*25, 25, 25);
            }
        }
    }
    nextContext2.restore();
}
function drawSendTiles(){
    sendContext.save();
    sendContext.clearRect(0, 0, sendCanvas.width, sendCanvas.height);
    for(let k = 0; k < 5; k++){
        if(red.send_pos[k] > 0){
            for(let i = 0; i < red.send_cnt[k]; i++){
                for(let j = 0; j < 10; j++){
                    if(red.send_arr[k][i][j] > 0){
                        sendContext.drawImage(block[red.send_arr[k][i][j]-1], red.send_pos[k]+j*25, i*25, 25, 25);
                    }
                }
            }
        }
        if(blue.send_pos[k] < 500){
            for(let i = 0; i < blue.send_cnt[k]; i++){
                for(let j = 0; j < 10; j++){
                    if(blue.send_arr[k][i][j] > 0){
                        sendContext.drawImage(block[blue.send_arr[k][i][j]-1], blue.send_pos[k]+j*25, i*25, 25, 25);
                    }
                }
            }
        }
    }
    sendContext.restore();
}
function drawRedStar(){
    starContext1.save();
    starContext1.clearRect(0, 0, starCanvas1.width, starCanvas1.height);
    for(let i = 0; i < red.score; i++){
        //starContext1.drawImage(star_img[Math.floor(star_pos / 4)], 64 * (star_pos % 4), 0, 64, 64, 0, 500-64*i, 64, 64);
        starContext1.drawImage(star_img[Math.floor(star_pos / 4)], 64 * (star_pos % 4), 0, 64, 64, 0, 500 - 48*(i+1), 48, 48);
    }
    starContext1.restore();
}
function drawBlueStar(){
    starContext2.save();
    starContext2.clearRect(0, 0, starCanvas2.width, starCanvas2.height);
    for(let i = 0; i < blue.score; i++){
        //starContext1.drawImage(star_img[Math.floor(star_pos / 4)], 64 * (star_pos % 4), 0, 64, 64, 0, 500-64*i, 64, 64);
        starContext2.drawImage(star_img[Math.floor(star_pos / 4)], 64 * (star_pos % 4), 0, 64, 64, 0, 500 - 48*(i+1), 48, 48);
    }
    starContext2.restore();
}
function Tile_Format(){
    red.x = 0;
    red.y = 4;
    red.rotate =  0;
    red.type = Math.floor(Math.random()*7);
    red.next = Math.floor(Math.random()*7);
    red.sent_line = 0;
    if(red.type === 6) red.y--;
    blue.x = 0;
    blue.y = 4;
    blue.rotate =  0;
    blue.type = Math.floor(Math.random()*7);
    blue.next = Math.floor(Math.random()*7);
    blue.sent_line = 0;
    if(blue.type === 6) blue.y--;
    base_time = 500;
    for(let j = 0; j < 10; j++){
        for(let i = 0; i < 20-red.score-2; i++){
            red.tile[i][j] = 0;
        }
        for(let i = 20-red.score-2; i < 20; i++){
            red.tile[i][j] = 1;
        }
        for(let i = 0; i < 20; i++){
            blue.tile[i][j] = 0;
        }
    }
    if(play_mode === 2){
        for(let j = 0; j < 10; j++){
            for(let i = 20-blue.score-2; i < 20; i++){
                blue.tile[i][j] = 2;
            }
        }
        for(let i = 20-blue.score-2; i < 20; i++){
            blue.tile[i][Math.floor(Math.random()*10)] = 0;
        }
    }
    for(let i = 20-red.score-2; i < 20; i++){
        red.tile[i][Math.floor(Math.random()*10)] = 0;
    }
    for(let i = 0; i < 5; i++){
        red.send_pos[i] = 0;
        blue.send_pos[i] = 500;
    }
}
function initialize(){
    red.score = 0;
    blue.score = 0;
    Tile_Format();
}
setTimeout(() => {
    initialize();
    gameManager();
}, 100);
document.getElementById("win-div").style.display = "none";
