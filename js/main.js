"use strict";

const $body = $("body");


function Player(number) {
    this.number = number;
}


/* Start Screen */
const $startScreen = $(`<div class="screen screen-start" id="start">
  <header>
    <h1>Tic Tac Toe</h1>
    <a href="#" id="start-button" class="button">Start game</a>
  </header>
</div>`);

$body.children().hide();
$body.append($startScreen);
$("#start-button").click(function (evt) {
    $body.children().show();
    $startScreen.hide();
});

const player1 = new Player(1);
const player2 = new Player(2);
let currentPlayer = player1;

$(`#player${currentPlayer.number}`).addClass("active");

$(".box").click(function (evt) {
    $(this).addClass(`box-filled-${currentPlayer.number}`);
    if (currentPlayer === player1) {
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    }
    $(".players").removeClass("active");
    $(`#player${currentPlayer.number}`).addClass("active");
});

let row = 0;
let cell = 0;
$(".box").each(function (index) {
    $(this).attr("row", row);
    $(this).attr("cell", cell);

    if ((index + 1) % 3 === 0) {
        row++;
        cell = 0;
    } else {
        cell++;
    }
});

function hasEnded() {
    $boxes = $(".box");
    $boxes.each(function (index, element) {

    });
}
