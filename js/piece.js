const tetrominoes = [
    [
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ],
    ],
    [
        [
            [1, 1],
            [1, 1],
        ],
    ],
    [
        [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0],
        ],
        [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0],
        ],
    ],
    [
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 1],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
        ],
    ],
    [
        [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0],
        ],
        [
            [0, 1, 0],
            [1, 1, 0],
            [1, 0, 0],
        ],
    ],
    [
        [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0],
        ],
        [
            [0, 1, 0],
            [0, 1, 1],
            [0, 1, 0],
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ],
        [
            [0, 1, 0],
            [1, 1, 0],
            [0, 1, 0],
        ],
    ],
    [
        [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 1],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ],
    ],
];
function get_tetrominoes(index, angle){
    let tet_temp = [];
    let tet_arr = [];
    tet_arr = tetrominoes[index][angle % tetrominoes[index].length];
    return tet_arr;
}
function hit_test_red(){
    let tile_arr = get_tetrominoes(red.type, red.rotate);
    for(let i = 0; i < tile_arr.length; i++){
        for(let j =  0; j < tile_arr.length; j++){
            if(tile_arr[i][j] === 1){
                if(red.x + i > 19){
                    return true;
                }
                if(red.y + j < 0){
                    return true;
                }
                if(red.y + j > 9){
                    return true;
                }
                if(red.tile[red.x+i][red.y+j] !== 0){
                    return true;
                }
            }
        }
    }
    return false;
}
function hit_test_blue(){
    let tile_arr = get_tetrominoes(blue.type, blue.rotate);
    for(let i = 0; i < tile_arr.length; i++){
        for(let j =  0; j < tile_arr.length; j++){
            if(tile_arr[i][j] === 1){
                if(blue.x + i > 19){
                    return true;
                }
                if(blue.y + j < 0){
                    return true;
                }
                if(blue.y + j > 9){
                    return true;
                }
                if(blue.tile[blue.x+i][blue.y+j] !== 0){
                    return true;
                }
            }
        }
    }
    return false;
}
function get_next_red_block(){
    red.x = 0;
    red.y = 4;
    red.rotate =  0;
    red.type = red.next;
    red.next = Math.floor(Math.random()*7);
    if(red.type === 6) red.y--;
}
function get_next_blue_block(){
    blue.x = 0;
    blue.y = 4;
    blue.rotate =  0;
    blue.type = blue.next;
    blue.next = Math.floor(Math.random()*7);
    if(blue.type === 6) blue.y--;
}
function mount_red_block(){
    let tile_arr = get_tetrominoes(red.type, red.rotate);
    for(let i = 0; i < 20; i++){
        for(let j = 0; j < 10; j++){
            red.prev_tile[i][j] = red.tile[i][j];
        }
    }
    for(let i = 0; i < tile_arr.length; i++){
        for(let j = 0; j < tile_arr.length; j++){
            if(tile_arr[i][j] === 1 && red.x+i >= 0){
                red.tile[red.x+i][red.y+j] = 1;
            }
        }
    }
}
function mount_blue_block(){
    let tile_arr = get_tetrominoes(blue.type, blue.rotate);
    for(let i = 0; i < 20; i++){
        for(let j = 0; j < 10; j++){
            blue.prev_tile[i][j] = blue.tile[i][j];
        }
    }
    for(let i = 0; i < tile_arr.length; i++){
        for(let j = 0; j < tile_arr.length; j++){
            if(tile_arr[i][j] === 1 && blue.x+i >= 0){
                blue.tile[blue.x+i][blue.y+j] = 2;
            }
        }
    }
}
function send_check_red(){
    let cnt = 0;
    let arr = [];
    for(let i = 0; i < 20; i++){
        let flag = true;
        for(let j = 0; j < 10; j++){
            if(red.tile[i][j] === 0){
                flag = false;
                break;
            }
        }
        if(flag){
            cnt++;
            arr.push(i);
        }
    }
    if(cnt >= 2){
        let pos = 0;
        while(red.send_pos[pos] !== 0) pos++;
        red.send_cnt[pos] = cnt;
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 10; j++){
                red.send_arr[pos][i][j] = 0;
            }
        }
        for(let k = 0; k < arr.length; k++){
            for(let j = 0; j < 10; j++){
                red.tile[0][j] = 0;
                red.send_arr[pos][k][j] = red.prev_tile[arr[k]][j];
            }
        }
        red.send_pos[pos]++;
    }
    for(let k = 0; k < arr.length; k++){
        for(let i = arr[k]; i > 0; i--){
            for(let j = 0; j < 10; j++){
                red.tile[i][j] = red.tile[i-1][j];
            }
        }
    }
}
function send_check_blue(){
    let cnt = 0;
    let arr = [];
    for(let i = 0; i < 20; i++){
        let flag = true;
        for(let j = 0; j < 10; j++){
            if(blue.tile[i][j] === 0){
                flag = false;
                break;
            }
        }
        if(flag){
            cnt++;
            arr.push(i);
        }
    }
    if(cnt >= 2){
        let pos = 0;
        while(blue.send_pos[pos] !== 500) pos++;
        blue.send_cnt[pos] = cnt;
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 10; j++){
                blue.send_arr[pos][i][j] = 0;
            }
        }
        for(let k = 0; k < arr.length; k++){
            for(let j = 0; j < 10; j++){
                blue.tile[0][j] = 0;
                blue.send_arr[pos][k][j] = blue.prev_tile[arr[k]][j];
            }
        }
        blue.send_pos[pos]--;
    }
    for(let k = 0; k < arr.length; k++){
        for(let i = arr[k]; i > 0; i--){
            for(let j = 0; j < 10; j++){
                blue.tile[i][j] = blue.tile[i-1][j];
            }
        }
    }
}
function GameOverCheck(){
    for(let i = 0; i < 10; i++){
        if(red.tile[0][i] !== 0 || red.tile[1][i] !== 0){
            game_state = false;
            clearInterval(timer_id20);
            clearInterval(timer_id500);
            document.getElementById("win-div").style.display = "block";
            if(play_mode === 1){
                document.getElementById("win-div").style.backgroundImage = "url('./image/gameover.jpg')";
            }else if(play_mode === 2){
                document.getElementById("win-div").style.backgroundImage = "url('./image/bluewin.jpg')";
            }
            if(red.score > 0){
                red.score--;
            }else blue.score++;
            break;
        }
        if(play_mode === 2){
            if(blue.tile[0][i] !== 0 || blue.tile[1][i] !== 0){
                game_state = false;
                clearInterval(timer_id20);
                
//    background-image: url("../image/fail.png");
                clearInterval(timer_id500);
                document.getElementById("win-div").style.backgroundImage = "url('./image/redwin.jpg')";
                document.getElementById("win-div").style.display = "block";
                if(blue.score > 0){
                    blue.score--;
                }else red.score++;
                break;
            }
        }
    }
}