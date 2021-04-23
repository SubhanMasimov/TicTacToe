let queue;
const gameArray = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let xPlayerScore;
let oPlayerScore;
let drawScore;

resetGame();

function resetBoard() {
  queue = "x";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      document.getElementById(`${i},${j}`).textContent = "";
      gameArray[i][j] = "";
    }
  }
}

function resetGame() {
  resetBoard();
  xPlayerScore = 0;
  oPlayerScore = 0;
  drawScore = 0;
}

const mainBoard = document.querySelector("#gameBoard");
const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", resetBoard);

mainBoard.addEventListener("click", function (e) {
  if (e.target.textContent !== "") {
    return;
  }
  let coord = e.target.id.split(",");
  printValue(coord[0], coord[1]);
});

function printValue(i, j) {
  let result = queue === "x" ? "x" : "o";
  document.getElementById(`${i},${j}`).textContent = result;
  mapArray(i, j);
  if (isWin(queue)) {
    finishGameWithWinner(queue);
    return;
  }
  if (isDraw()) {
    finishGameWithDraw();
    return;
  }

  queue = queue === "x" ? "o" : "x";
}

function mapArray(i, j) {
  gameArray[i][j] = document.getElementById(`${i},${j}`).textContent;
}

function isWin(queue) {
  let i = 0;
  let j = 0;
  for (i = 0; i < 3; i++) {
    j = 0;
    if (
      gameArray[i][j] === gameArray[i][j + 1] &&
      gameArray[i][j] === gameArray[i][j + 2] &&
      gameArray[i][j] === queue
    ) {
      return true;
    } else if (
      gameArray[j][i] === gameArray[j + 1][i] &&
      gameArray[j][i] === gameArray[j + 2][i] &&
      gameArray[j][i] === queue
    ) {
      return true;
    }
  }

  (i = 0), (j = 0);

  if (
    gameArray[i][j] === gameArray[i + 1][j + 1] &&
    gameArray[i][j] === gameArray[i + 2][j + 2] &&
    gameArray[i][j] === queue
  ) {
    return true;
  } else if (
    gameArray[i][j + 2] === gameArray[i + 1][j + 1] &&
    gameArray[i][j + 2] === gameArray[i + 2][j] &&
    gameArray[i][j + 2] === queue
  ) {
    return true;
  }
}

function isDraw() {
  let count = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameArray[i][j] !== "") {
        count++;
      }
    }
  }

  if (count === 9) {
    return true;
  }

  return false;
}

function finishGameWithWinner(queue) {
  if (queue === "x") {
    xPlayerScore++;
  } else {
    oPlayerScore++;
  }
  setTimeout(function () {
    alert(queue.toUpperCase() + " is winner!");
    showScore();
    resetBoard();
  }, 5);
}

function finishGameWithDraw() {
  drawScore++;
  setTimeout(function () {
    alert("Draw!");
    showScore();
    resetBoard();
  }, 1);
}

function showScore() {
  alert(
    "Player X-->" +
      xPlayerScore +
      "\nPlayer O-->" +
      oPlayerScore +
      "\nDraw-->" +
      drawScore
  );
}
