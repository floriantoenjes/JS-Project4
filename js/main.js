"use strict";

const $body = $("body");


function Player(mark, number) {
    this.mark = mark;
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
    $startScreen.remove();
});


const player1 = new Player("o", 1);
const player2 = new Player("x", 2);
let turns = 0;

let currentPlayer = player1;
$(`#player${currentPlayer.number}`).addClass("active");


/* Build the Game Board */
const $boxes = $(".box");
const boxRows = [];
for (let i = 0; i < 3; i++) {
    const boxRow = []
    for (let j = i * 3; j < (i * 3) + 3; j++) {
        boxRow.push($($boxes[j]));
    }
    boxRows.push(boxRow);
}


$(".box").click(function (evt) {
    if (!$(this).attr("number")) {
        $(this).addClass(`box-filled-${currentPlayer.number}`);
        $(this).attr("number", currentPlayer.number);

        turns++;

        if (isGameTie()) {
            showWinningScreen("Tie", "screen-win-tie");
        }

        if (hasGameEnded()) {
            if (currentPlayer === player1) {
                showWinningScreen("Winner", "screen-win-one");
            } else {
                showWinningScreen("Winner", "screen-win-two");
            }
        }

        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
        $(".players").removeClass("active");
        $(`#player${currentPlayer.number}`).addClass("active");
    }
});

function isGameTie() {
    if (turns === 9) {
        return true;
    }
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

function showWinningScreen(message, styleClass) {
    const $winningScreen = $(`<div class="screen screen-win" id="finish">
  <header>
    <h1>Tic Tac Toe</h1>
    <p class="message">${message}</p>
    <a href="#" class="button" id="new-game-button">New game</a>
  </header>
</div>`);
    if (currentPlayer === player1) {
        $winningScreen.addClass(styleClass);
    } else {
        $winningScreen.addClass(styleClass);
    }
    $("body").children().hide();
    $("body").append($winningScreen);
    $("#new-game-button").click(function (evt) {
        $winningScreen.remove();
        turns = 0;

        $boxes.each(function (index, element) {
            const $box = $(element);
            $box.removeAttr("number");
            $box.removeClass("box-filled-1");
            $box.removeClass("box-filled-2");
        });

        $("body").children().show();
    });
}

$boxes.each(function () {
    $(this).hover(function (evt) {
        if (!$(this).attr("number")) {
            this.style = `background-image: url(../img/${currentPlayer.mark}.svg);`;
        }
    }, function (evt) {
        this.style = "background-image:;";
    });
});
