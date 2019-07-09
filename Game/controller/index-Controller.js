
const btnPlay = $('#play');

const line_1 = $('#line1');
const line_2 = $('#line2');
const line_3 = $('#line3');

const car_1 = $('#car1');
const car_2 = $('#car2');
const car_3 = $('#car3');

const my_car = $('#car');

let gameHeight = $('.wrapper').height();

let step = 1;

btnPlay.click(function () {
    btnPlay.fadeOut();
    processGame();
});


function processGame() {
    moveRoad();
    requestAnimationFrame(processGame);
}

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