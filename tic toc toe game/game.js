let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let isSinglePlayer = false;

const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const gameContainer = document.getElementById("game-container");
const heading = document.getElementById("heading"); 

window.onload = function() {
    heading.style.fontSize = '3.5em'; 
};

function startGame(mode) {
    isSinglePlayer = mode === "single";
    gameActive = true;
    resetGame();
    gameContainer.style.display = "block";
    resetHeadingSize(); 
}

function createBoard() {
    boardElement.innerHTML = "";
    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index;
        cellElement.innerText = cell;
        cellElement.addEventListener("click", handleCellClick);
        boardElement.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    event.target.classList.add("disabled");

    if (checkWinner()) {
        statusElement.innerText = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusElement.innerText = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusElement.innerText = `Player ${currentPlayer}'s turn`;

    if (isSinglePlayer && currentPlayer === "O") {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    let emptyCells = board
        .map((val, idx) => (val === "" ? idx : null))
        .filter((val) => val !== null);
    if (emptyCells.length > 0) {
        let randomIndex =
            emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomIndex] = "O";
        document.querySelector(`[data-index='${randomIndex}']`).innerText =
            "O";
        document
            .querySelector(`[data-index='${randomIndex}']`)
            .classList.add("disabled");

        if (checkWinner()) {
            statusElement.innerText = `Player O wins!`;
            gameActive = false;
            return;
        }

        if (!board.includes("")) {
            statusElement.innerText = "It's a draw!";
            gameActive = false;
            return;
        }

        currentPlayer = "X";
        statusElement.innerText = "Player X's turn";
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    return winPatterns.some((pattern) => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusElement.innerText = "Player X's turn";
    createBoard();
}

function resetHeadingSize() {
    heading.style.fontSize = '2.5em'; 
}