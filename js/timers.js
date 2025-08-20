var timer_id500 = null;
var timer_id20 = null;
var play_mode = 0;
var game_state = false;
var stop_flag = false;
var star_pos = 0, star_temp = 0;
var base_time = 500;
var key_flags = {
    a : 0,
    d : 0,
    left : 0,
    right : 0,
};
document.getElementById("start-button1").onclick = (ev) => {
    start_game(1, 1);
};
document.getElementById("start-button2").onclick = (ev) => {
    start_game(2, 1);
};
function start_game(mode, bformat){
    play_mode = mode;
    // document.getElementById("score-container").innerText = "0";
    clearInterval(timer_id500);
    clearInterval(timer_id20);
    if(bformat === 1){
        initialize();
    }else if(bformat === 0){
        Tile_Format();
    }
    gameManager();
    timer_id500 = setInterval(timerEvent500, base_time);
    timer_id20 = setInterval(timerEvent20, 20);
    game_state = true;
    stop_flag = false;
}
function timerEvent500(){
    if(stop_flag) return;
    red.x++;
    if(hit_test_red()){
        red.x--;
        mount_red_block();
        get_next_red_block();
        send_check_red();
        drawRedNext();
        drawRedPlayer();
        GameOverCheck();
    }else
        drawRedPlayer();
    if(play_mode === 2){
        blue.x++;
        if(hit_test_blue()){
            blue.x--;
            mount_blue_block();
            get_next_blue_block();
            send_check_blue();
            drawBlueNext();
            drawBluePlayer();
            GameOverCheck();
        }else
            drawBluePlayer();
    }
}
function timerEvent20(){
    if(stop_flag) return;
    if(key_flags.a > 0){
        key_flags.a++;
    }
    if(key_flags.d > 0){
        key_flags.d++;
    }
    if(key_flags.a > 10){
        while(!hit_test_red()){
            red.y--;
        }
        red.y++;
        drawRedPlayer();
    }
    if(key_flags.d > 10){
        while(!hit_test_red()){
            red.y++;
        }
        red.y--;
        drawRedPlayer();
    }
    if(key_flags.left > 0){
        key_flags.left++;
    }
    if(key_flags.right > 0){
        key_flags.right++;
    }
    if(key_flags.left > 10){
        while(!hit_test_blue()){
            blue.y--;
        }
        blue.y++;
        drawBluePlayer();
    }
    if(key_flags.right > 10){
        while(!hit_test_blue()){
            blue.y++;
        }
        blue.y--;
        drawBluePlayer();
    }
    let flag = false;
    for(let k = 0; k < 5; k++){
        if(red.send_pos[k] > 0){
            flag = true;
            red.send_pos[k]+=10;
        }
        if(red.send_pos[k] > 500){
            red.sent_line += red.send_cnt[k];
            for(let i = 0; i < 20 - red.send_cnt[k]; i++){
                for(let j = 0; j < 10; j++){
                    blue.tile[i][j] = blue.tile[i+red.send_cnt[k]][j];
                }
            }
            for(let i = 0; i < red.send_cnt[k]; i++){
                for(let j = 0; j < 10; j++){
                    blue.tile[20-red.send_cnt[k]+i][j] = red.send_arr[k][i][j] > 0 ? red.send_arr[k][i][j] : 0;
                }
            }
            if(red.sent_line > 19 && play_mode === 1){
                red.sent_line = 0;
                red.score++;
                for(let i = 0; i < 20; i++){
                    for(let j = 0; j < 10; j++){
                        blue.tile[i][j] = 0;
                    }
                }
            }
            red.send_pos[k] = 0;
            red.send_cnt[k] = 0;
            get_next_blue_block();
            drawBlueNext();
            drawBluePlayer();
            drawRedNext();
            drawRedPlayer();
        }
        ////////////////////////////
        
        if(blue.send_pos[k] < 500){
            flag = true;
            blue.send_pos[k]-=10;
        }
        if(blue.send_pos[k] < 0){
            blue.sent_line += blue.send_cnt[k];
            for(let i = 0; i < 20 - blue.send_cnt[k]; i++){
                for(let j = 0; j < 10; j++){
                    red.tile[i][j] = red.tile[i+blue.send_cnt[k]][j];
                }
            }
            for(let i = 0; i < blue.send_cnt[k]; i++){
                for(let j = 0; j < 10; j++){
                    red.tile[20-blue.send_cnt[k]+i][j] = blue.send_arr[k][i][j] > 0 ? blue.send_arr[k][i][j] : 0;
                }
            }
            blue.send_pos[k] = 500;
            blue.send_cnt[k] = 0;
            get_next_red_block();
            drawRedNext();
            drawRedPlayer();
            drawBlueNext();
            drawBluePlayer();
        }
    }
    if(flag){
        drawSendTiles();
    }
    star_temp += 1;
    if(star_temp > 10){
        star_temp = 0;
        star_pos = (star_pos + 1) % 8;
        if(star_pos === 0){
            clearInterval(timer_id500);
            base_time -= 2;
            timer_id500 = setInterval(timerEvent500, base_time);
        }
        drawRedStar();
        drawBlueStar();
    }
}