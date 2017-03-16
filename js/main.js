"use strict";

const $body = $("body");
const $boxes = $(".box");

const boxRows = [];

const player1 = new Player("o", 1);
const player2 = new Player("x", 2);

let turns = 0;
let currentPlayer = player1;


showStartScreen();
styleCurrentPlayerActive();
buildGameBoard();

bindClickEventToBoxes();
bindHoverEventToBoxes();


function Player(mark, number) {
    this.mark = mark;
    this.number = number;
}

function buildGameBoard() {
    for (let i = 0; i < 3; i++) {
        const boxRow = []
        for (let j = i * 3; j < (i * 3) + 3; j++) {
            boxRow.push($($boxes[j]));
        }
        boxRows.push(boxRow);
    }
}

function takeTurn(box) {
    const $box = $(box);
    if (!$box.attr("number")) {
        markBox($box);
        turns++;
        if (isGameTie()) {
            showWinningScreen("Tie", "screen-win-tie");
        } else if (hasGameEnded()) {
            if (currentPlayer === player1) {
                showWinningScreen("Winner", "screen-win-one");
            } else {
                showWinningScreen("Winner", "screen-win-two");
            }
        }
        switchPlayers();
    }
}

function markBox($box) {
    $box.addClass(`box-filled-${currentPlayer.number}`);
    $box.attr("number", currentPlayer.number);
}

function switchPlayers() {
    if (currentPlayer === player1) {
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    }
    $(".players").removeClass("active");
    styleCurrentPlayerActive();
}

function styleCurrentPlayerActive() {
    $(`#player${currentPlayer.number}`).addClass("active");
}

function isGameTie() {
    if (!hasGameEnded && turns === 9) {
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

function showStartScreen() {
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
    $body.children().hide();
    $body.append($winningScreen);
    $("#new-game-button").click(function (evt) {
        $winningScreen.remove();
        resetGame();
        $body.children().show();
    });
}

function resetGame() {
    turns = 0;
    resetBoxes();
}

function resetBoxes() {
    $boxes.each(function (index, element) {
        const $box = $(element);
        $box.removeAttr("number");
        $box.removeClass("box-filled-1");
        $box.removeClass("box-filled-2");
    });
}

function bindClickEventToBoxes() {
    $(".box").click(function (evt) {
        takeTurn(this);
    });
}

function bindHoverEventToBoxes() {
    $boxes.each(function () {
        $(this).hover(
            function (evt) {
                if (!$(this).attr("number")) {
                    this.style = `background-image: url(../img/${currentPlayer.mark}.svg);`;
                }
            },
            function (evt) {
                this.style = "background-image:;";
            });
    });
}
