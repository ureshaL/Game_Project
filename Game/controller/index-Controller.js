
const btnPlay = $('#play');

const line_1 = $('#line1');
const line_2 = $('#line2');
const line_3 = $('#line3');

// const line_speed = 1;

const car_1 = $('#car1');
const car_2 = $('#car2');
const car_3 = $('#car3');
const car_width = car_1.width();

var speed = 2;

const my_car = $('#car');
const my_car_width = my_car.width();
const my_car_height = my_car.height();

var move_up = false;
var move_down = false;
var move_left = false;
var move_right = false;

let gameHeight = $('.wrapper').height();
let gameWidth = $('.wrapper').width();

const score = $('#score');
let score_interval;

let stepY = 5;
let stepX = 3;
let score_count = 1;
let score_div = $('#score_div');

const game_over_box = $('#game-over-box');
const final_score = $('#final-score');
const high_score = $('#High-score');

const btnplay_again = $('#btn-replay');

let frameId = 0;
let nextBar = null;
let isHit = false;

// ---------------------------------Game Starts here------------------------------------------------------//

btnplay_again.click(function () {
    window.location.reload();
});

btnPlay.click(function () {

    $('#btn-play').fadeOut();
    score_div.fadeIn();
    countScore();

    function processGame() {
        frameId = requestAnimationFrame(function () {
            moveRoad();
            countScore();
            appearRandomCars();
            if (isCollide(my_car, car_1) || isCollide(my_car, car_2) || isCollide(my_car, car_3)) {
                isHit = true;
                cancelAnimationFrame(frameId);
                $(document).off('keydown');
            }
            if (!isHit) {
                processGame();
            }else {
                $('.wrapper').css('filter', 'brightness(40%)');
                game_over_box.fadeIn();
                score_div.fadeOut();
                final_score.text(score.text());
                setHighScore(score.text());
            }
        });
    } processGame();

    $(document).on('keydown', function(e) {
        var key = e.keyCode;
        if (key === 37 && move_left === false) {
            move_left = requestAnimationFrame(left);
        } else if (key === 39 && move_right === false) {
            move_right = requestAnimationFrame(right);
        } else if (key === 38 && move_up === false) {
            move_up = requestAnimationFrame(up);
        } else if (key === 40 && move_down === false) {
            move_down = requestAnimationFrame(down);
        }
    });

    $(document).on('keyup', function(e) {
        var key = e.keyCode;
        if (key === 37) {
            cancelAnimationFrame(move_left);
            move_left = false;
        } else if (key === 39) {
            cancelAnimationFrame(move_right);
            move_right = false;
        } else if (key === 38) {
            cancelAnimationFrame(move_up);
            move_up = false;
        } else if (key === 40) {
            cancelAnimationFrame(move_down);
            move_down = false;
        }
    });

    function left() {
        if (parseInt(my_car.css('left')) > 0) {
            my_car.css('left', parseInt(my_car.css('left')) - stepX);
            move_left = requestAnimationFrame(left);
        }
    }

    function right() {
        if (parseInt(my_car.css('left')) < gameWidth - my_car_width) {
            my_car.css('left', parseInt(my_car.css('left')) + stepX);
            move_right = requestAnimationFrame(right);
        }
    }

    function up() {
        if (parseInt(my_car.css('top')) > 0) {
            my_car.css('top', parseInt(my_car.css('top')) - stepY);
            move_up = requestAnimationFrame(up);
        }
    }

    function down() {
        if (parseInt(my_car.css('top')) < gameHeight - my_car_height) {
            my_car.css('top', parseInt(my_car.css('top')) + stepY);
            move_down = requestAnimationFrame(down);
        }
    }

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
        line_1.css('top', line_1_top + stepY);
    }

    if (line_2_top >= gameHeight) {
        nextBar = line_2;
    } else {
        line_2.css('top', line_2_top + stepY);
    }

    if (line_3_top >= gameHeight) {
        nextBar = line_3;
    } else {
        line_3.css('top', line_3_top + stepY);
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
    let top_rand = 0;
    if (current_top > gameHeight){
        current_top = -200;
        var car_left = parseInt(Math.random() * (gameWidth - my_car_width));
        top_rand = Math.floor(Math.random() * 100);
        car.css('left', car_left);
    }
    car.css('top', current_top + speed - top_rand);
}

function isCollide($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    return !(b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2);
}

function countScore() {
    score_count++;

    if (score_count % 20 == 0) {
        score.text(parseInt(score.text()) + 1);
    }
    if (score_count % 500 == 0) {
        speed++;
    }

}

function setHighScore(score) {
    let highScore = parseInt(localStorage.getItem('high_score')) || 0;
    if (parseInt(score) > highScore){
        localStorage.setItem('high_score', score);
    }
    high_score.text(localStorage.getItem('high_score'));
}