let btnRef = document.querySelectorAll(".btn-move");
let popupRef = document.querySelector(".popup");
let newGameBtn = document.querySelector("#btn-new-game");
let restartBtn = document.querySelector("#btn-restart");
let msgRef = document.querySelector("#message");
let turnX = document.querySelector("#X-turn");
let turnO = document.querySelector("#O-turn");

let winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let xTurn = true;
let count = 0;

// Highlight current turn
turnX.classList.add("glow");

// Disable all buttons and show popup
const disableButtons = () => {
    btnRef.forEach(btn => btn.disabled = true);
    popupRef.classList.remove("hide");
};

// Enable buttons and reset
const enableButtons = () => {
    btnRef.forEach(btn => {
        btn.disabled = false;
        btn.innerHTML = "";
        btn.classList.remove("winner");
    });
    xTurn = true;
    count = 0;
    turnX.classList.add("glow");
    turnO.classList.remove("glow");
    popupRef.classList.add("hide");
};

// Check for win
const checkWin = () => {
    for (let arr of winningPattern) {
        const [a, b, c] = arr.map(i => btnRef[i].innerText);
        if (a && a === b && b === c) {
            arr.forEach(i => btnRef[i].classList.add("winner"));
            msgRef.innerHTML = `&#x1F3C6; <br> '${a}' Wins`;
            disableButtons();
            return true;
        }
    }
    return false;
};

// Check for draw
const checkDraw = () => {
    if (count === 9 && !checkWin()) {
        msgRef.innerHTML = `&#x1F38A; <br> It's a Draw`;
        disableButtons();
    }
};

// Handle button click
btnRef.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.innerText = xTurn ? "X" : "O";
        btn.disabled = true;
        count++;

        if (!checkWin()) {
            checkDraw();
        }

        // Toggle turn
        xTurn = !xTurn;
        turnX.classList.toggle("glow");
        turnO.classList.toggle("glow");
    });
});

// Event listeners
newGameBtn.addEventListener("click", enableButtons);
restartBtn.addEventListener("click", enableButtons);

window.onload = enableButtons;
