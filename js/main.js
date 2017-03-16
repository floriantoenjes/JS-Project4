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
    $(this).attr("number", currentPlayer.number);
    console.log(`Has ended: ${hasGameEnded()}`);
    if (currentPlayer === player1) {
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    }
    $(".players").removeClass("active");
    $(`#player${currentPlayer.number}`).addClass("active");
});

const $boxes = $(".box");
const boxRows = [];
for (let i = 0; i < 3; i++) {
    const boxRow = []
    for (let j = i * 3; j < (i * 3) + 3; j++) {
        boxRow.push($($boxes[j]));
    }
    boxRows.push(boxRow);
}

function hasGameEnded() {
    for (let row = 0; row < boxRows.length; row++) {
        for (let cell = 0; cell < boxRows[row].length; cell++) {
            const thisNumber = boxRows[row][cell].attr("number");
            if (thisNumber) {
                if (cell === 0 && boxRows[row][cell + 1].attr("number") === thisNumber && boxRows[row][cell + 2].attr("number") === thisNumber) {
                    return true;
                } else if (row === 0 && boxRows[row + 1][cell].attr("number") === thisNumber && boxRows[row + 2][cell].attr("number") === thisNumber) {
                    return true;
                } else if (cell === 0 && row === 0 && boxRows[row + 1][cell + 1].attr("number") === thisNumber && boxRows[row + 2][cell + 2].attr("number") === thisNumber) {
                    return true;
                } else if (cell === 2 && row === 0 && boxRows[row + 1][cell - 1].attr("number") === thisNumber && boxRows[row + 2][cell - 2].attr("number") === thisNumber) {
                    return true;
                }
            }
        }
    }
    return false;
}
