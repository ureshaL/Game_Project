
const btnPlay = $('#play');

const line_1 = $('#line1');
const line_2 = $('#line2');
const line_3 = $('#line3');

// const line_speed = 1;

const car_1 = $('#car1');
const car_2 = $('#car2');
const car_3 = $('#car3');
const car_width = $('#car1').width();

var speed = 2;

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

const score = $('#score');

let step = 2;
let score_count = 1;
let score_div = $('#score_div');

const game_over_box = $('#game-over-box');

// ---------------------------------Game Starts here------------------------------------------------------//

let frameId = 0;
let nextBar = null;
let isHit = false;

btnPlay.click(function () {

    btnPlay.fadeOut();

    function processGame() {
        frameId = requestAnimationFrame(function () {
            moveRoad();
            appearRandomCars();
            if (!isHit) {
                processGame();
            }
        });
    } processGame();

    $(document).keydown(function (e) {
        const keySpeed = 5;
        const key = e.key;
        switch (key) {
            case 'ArrowLeft':
                my_car.css('left', parseInt(my_car.css('left')) - keySpeed);
                break;
            case 'ArrowRight':
                my_car.css('left', parseInt(my_car.css('left')) + keySpeed);
                break;
            case 'ArrowUp':
                my_car.css('top', parseInt(my_car.css('top')) - keySpeed);
                break;
            case 'ArrowDown':
                my_car.css('top', parseInt(my_car.css('top')) + keySpeed);
                break;
        }
    });

});

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

function appearRandomCars(){
    car_down(car_1);
    car_down(car_2);
    car_down(car_3);
}

function car_down(car){
    var current_top = parseInt(car.css('top'));
    if (current_top > gameHeight){
        current_top = -200;
        var car_left = parseInt(Math.random() * (gameWidth - my_car_width));
        car.css('left', car_left);
    }
    car.css('top', current_top + speed);

    if (isCollide(car[0], my_car[0])) {
        isHit = true;
        cancelAnimationFrame(frameId);
        $(document).off('keydown');
    }
}

function isCollide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}

// function isCollide($div1, $div2) {
//     var x1 = $div1.offset().left;
//     var y1 = $div1.offset().top;
//     var h1 = $div1.outerHeight(true);
//     var w1 = $div1.outerWidth(true);
//     var b1 = y1 + h1;
//     var r1 = x1 + w1;
//     var x2 = $div2.offset().left;
//     var y2 = $div2.offset().top;
//     var h2 = $div2.outerHeight(true);
//     var w2 = $div2.outerWidth(true);
//     var b2 = y2 + h2;
//     var r2 = x2 + w2;
//
//     if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
//     return true;
// }