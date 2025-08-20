var stair = 1000;
var stair_flag = [];
for(let i = 0; i <= stair; i++) stair_flag[i] = 0;
stair_flag[0] = 1;
stair_flag[1] = 1;
stair_flag[2] = 2;
stair_flag[3] = 4;
console.log(stair_flag);
function stair_cnt(cnt){
    if(stair_flag[cnt] !== 0) return;
    if(stair_flag[cnt-1] !== 0);
    else stair_cnt(cnt-1);
    if(stair_flag[cnt-2] !== 0);
    else stair_cnt(cnt-2);
    if(stair_flag[cnt-3] !== 0);
    else stair_cnt(cnt-3);
    stair_flag[cnt] = stair_flag[cnt-1] + stair_flag[cnt-2] + stair_flag[cnt-3];
}
stair_cnt(stair);
console.log(stair_flag[stair]);
console.log(stair_flag);
/*function go_upstair(str, cnt){
    if(cnt > stair) return;
    if(cnt === stair){
        console.log(str.slice(0, str.length-3) + " = " + stair);
        return;
    }
    go_upstair(str + "1 + ", cnt + 1);
    go_upstair(str + "2 + ", cnt + 2);
    go_upstair(str + "3 + ", cnt + 3);
}*/
//go_upstair("", 0);