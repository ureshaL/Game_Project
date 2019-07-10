
const btnPlay = $('#play');

const line_1 = $('#line1');
const line_2 = $('#line2');
const line_3 = $('#line3');

// const line_speed = 1;

const car_1 = $('#car1');
const car_2 = $('#car2');
const car_3 = $('#car3');

const my_car = $('#car');

var move_up = false;
var move_down = false;
var move_left = false;
var move_right = false;

let game_over = false;
let gameHeight = $('.wrapper').height();

let step = 1;

// ---------------------------------Game Starts here------------------------------------------------------//

$(document).on('keydown', function (e) {
    if (game_over === false){
        var key = e.keyCode;
        if (key === 37 && move_left === false){
                move_left = requestAnimationFrame(left);
        }
    }
});

$(document).on('keyup', function (e) {
    if (game_over === false){
        var key = e.keyCode;
        if (key === 37){
            cancelAnimationFrame(move_left);
            move_left = false;
        }
    }  
});

function left(){
    if (game_over === false && parseInt(my_car.css('left')) > 0){
        my_car.css('left', parseInt(my_car.css('left')) -5);
        move_left = requestAnimationFrame(left);
    }
}

btnPlay.click(function () {
    btnPlay.fadeOut();
    processGame();
});


function processGame() {
    moveRoad();
    requestAnimationFrame(processGame);
}

// function moveRoad() {
//     line_down(line_1);
//     line_down(line_2);
//     line_down(line_3);
//
// }
//
// function line_down(line) {
//     var line_current_top = parseInt(line.css('top'));
//     if (line_current_top > gameHeight){
//         line_current_top = -300;
//     }
//     line.css('top',line_current_top + line_speed);
// }

let nextBar = null;

function moveRoad() {
    const line_1_top = parseInt(line_1.css('top'));
    const line_2_top = parseInt(line_2.css('top'));
    const line_3_top = parseInt(line_3.css('top'));
    const resetPos = -150;
    const gap = 150;

    if (line_1_top >= gameHeight) {
        nextBar = line_1;
    }else {
        line_1.css('top', line_1_top + step);
    }

    if (line_2_top >= gameHeight) {
        nextBar = line_2;
    } else {
        line_2.css('top', line_2_top + step);
    }

    if (line_3_top >= gameHeight) {
        nextBar = line_3;
    } else {
        line_3.css('top', line_3_top + step);
    }

    if (line_3_top === gap && nextBar !== null) {
        nextBar.css('top', resetPos);
    }
    if (line_2_top === gap && nextBar !== null) {
        nextBar.css('top', resetPos);
    }
    if (line_1_top === gap && nextBar !== null) {
        nextBar.css('top', resetPos);
    }
}