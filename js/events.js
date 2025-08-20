document.onkeydown = function(event){
    if(event.key !== 'F5')
        event.preventDefault();
    if(event.key === '1' && document.getElementById("win-div").style.display === "none"){
        start_game(1, 1);
    }else if(event.key === '2' && document.getElementById("win-div").style.display === "none"){
        start_game(2, 1);
    }
    if(!game_state) return;
    if(event.key === 'p' || event.key === 'P'){
        stop_flag = !stop_flag;
    }
    if(stop_flag) return;
    if(event.key === 'a' || event.key === 'A'){
        key_flags.d = 0;
        key_flags.a++;
        red.y--;
        if(hit_test_red()){
            red.y++;
        }
        drawRedPlayer();
    }else if(event.key === 'd' || event.key === 'D'){
        key_flags.a = 0;
        key_flags.d++;
        red.y++;
        if(hit_test_red()){
            red.y--;
        }
        drawRedPlayer();
    }else if(event.key === 'w' || event.key === 'W'){
        red.rotate = (red.rotate+1) % 4;
        if(hit_test_red()){
            red.rotate = (red.rotate+3) % 4;
        }
        drawRedPlayer();
    }else if(event.key === 's' || event.key === 'S'){
        red.rotate = (red.rotate+3) % 4;
        if(hit_test_red()){
            red.rotate = (red.rotate+1) % 4;
        }
        drawRedPlayer();
    }else if(event.key === ' ' || event.key === 'Shift' || event.key === 'Control'){
        key_flags.a = key_flags.d = 0;
        while(!hit_test_red()){
            red.x++;
        }
        red.x--;
        drawRedPlayer();
        mount_red_block();
        get_next_red_block();
        send_check_red();
        drawRedNext();
        drawRedPlayer(); 
        GameOverCheck();   
    }
    if(play_mode !== 2) return;
    if(event.key === 'ArrowLeft'){
        key_flags.right = 0;
        key_flags.left++;
        blue.y--;
        if(hit_test_blue()){
            blue.y++;
        }
        drawBluePlayer();
    }else if(event.key === 'ArrowRight'){
        key_flags.left = 0;
        key_flags.right++;
        blue.y++;
        if(hit_test_blue()){
            blue.y--;
        }
        drawBluePlayer();
    }else if(event.key === 'ArrowUp'){
        blue.rotate = (blue.rotate+1) % 4;
        if(hit_test_blue()){
            blue.rotate = (blue.rotate+3) % 4;
        }
        drawBluePlayer();
    }else if(event.key === 'ArrowDown'){
        blue.rotate = (blue.rotate+3) % 4;
        if(hit_test_blue()){
            blue.rotate = (blue.rotate+1) % 4;
        }
        drawBluePlayer();
    }else if(event.key === '0' || event.key === 'Enter'){
        key_flags.left = key_flags.right = 0;
        while(!hit_test_blue()){
            blue.x++;
        }
        blue.x--;
        drawBluePlayer();
        mount_blue_block();
        get_next_blue_block();
        send_check_blue();
        drawBlueNext();
        drawBluePlayer(); 
        GameOverCheck();   
    }
}
document.onkeyup = function(event){
    if(event.key === 'a'){
        key_flags.a = 0;
    }else if(event.key === 'd'){
        key_flags.d = 0;
    }else if(event.key === 'ArrowLeft'){
        key_flags.left = 0;
    }else if(event.key === 'ArrowRight'){
        key_flags.right = 0;
    }
}
document.getElementById("win-div").onclick = (ev) => {
    ev.target.style.display = "none";
    Tile_Format();
    start_game(play_mode, 0);
}