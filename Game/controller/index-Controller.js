
const btnPlay = $('#play');

const line_1 = $('#line1');
const line_2 = $('#line2');
const line_3 = $('#line3');

// const line_speed = 1;

const car_1 = $('#car1');
const car_2 = $('#car2');
const car_3 = $('#car3');

const my_car = $('#car');
const my_car_width = $('#car').width();
const my_car_height = $('#car').height();

var move_up = false;
var move_down = false;
var move_left = false;
var move_right = false;

let game_over = false;
let gameHeight = $('.wrapper').height();
let gameWidth = $('.wrapper').width();

let step = 1;

// ---------------------------------Game Starts here------------------------------------------------------//

$(document).on('keydown', function (e) {
    if (game_over === false){
        var key = e.keyCode;
        if (key === 37 && move_left === false){
                move_left = requestAnimationFrame(left);
        }else if (key === 39 && move_right === false){
            move_right = requestAnimationFrame(right);
        }else if (key === 38 && move_up === false){
            move_up = requestAnimationFrame(up);
        }else if (key === 40 && move_down === false){
            move_down = requestAnimationFrame(down);
        }
    }
});

$(document).on('keyup', function (e) {
    if (game_over === false){
        var key = e.keyCode;
        if (key === 37){
            cancelAnimationFrame(move_left);
            move_left = false;
        }else if (key === 39){
            cancelAnimationFrame(move_right);
            move_right = false;
        }else if (key === 38){
            cancelAnimationFrame(move_up);
            move_up = false;
        }else if (key === 40){
            cancelAnimationFrame(move_down);
            move_down = false;
        }
    }  
});

function left(){
    if (game_over === false && parseInt(my_car.css('left')) > 0){
        my_car.css('left', parseInt(my_car.css('left')) -5);
        move_left = requestAnimationFrame(left);
    }
}

function right(){
    if (game_over === false && parseInt(my_car.css('left')) < gameWidth - my_car_width){
        my_car.css('left', parseInt(my_car.css('left')) + 5);
        move_right = requestAnimationFrame(right);
    }
}

function up(){
    if (game_over === false && parseInt(my_car.css('top')) > 0){
        my_car.css('top', parseInt(my_car.css('top')) - 5);
        move_up = requestAnimationFrame(up);
    }
}

function down(){
    if (game_over === false && parseInt(my_car.css('top')) < gameHeight - my_car_height){
        my_car.css('top', parseInt(my_car.css('top')) + 5);
        move_down = requestAnimationFrame(down);
    }
}


function repeat(){
    if (game_over === false){
        car_down(car_1);
        car_down(car_2);
        car_down(car_3);
    }
}



btnPlay.click(function () {
    btnPlay.fadeOut();
    processGame();
});


function processGame() {
    moveRoad();
    repeat();
    requestAnimationFrame(processGame);
    requestAnimationFrame(repeat);
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