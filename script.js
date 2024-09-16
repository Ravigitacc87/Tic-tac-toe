let boxes = document.querySelectorAll(".boxes");
let msg = document.querySelector("#msg");
let reset = document.querySelector(".reset-btn");
let newgame = document.querySelector(".new-btn");

let turn0 = true; // player0 and playerX

const winposibility = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Disable all boxes after the winner is announced
let disablebox = () => {
    boxes.forEach((box) => {
        box.style.pointerEvents = "none"; // Disable further clicks
    });
};

// Reset game and enable all boxes
const resetbtn = () => {
    turn0 = true;
    boxes.forEach((box) => {
        box.innerHTML = "<img id='box' src='./images/square.png'>"; // Reset each box to its initial state
    });
    msg.innerText = "Play Your Move"; // Reset message
    enablebox(); // Re-enable all boxes
};

// Enable all boxes to start a new game
let enablebox = () => {
    boxes.forEach((box) => {
        box.style.pointerEvents = "auto";
        box.innerHTML = "<img id='box' src='./images/square.png'>"; // Reset the images
    });
    msg.innerText = "Play Your Move"; // Reset message
    turn0 = true; // Reset the turn to player0
};

// Show the winner and disable remaining boxes
let showWinnner = (winner) => {
    msg.innerText = `Congratulations 😊! Winner is ${winner}`;
    disablebox();
};

// Game logic for each box when clicked
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerHTML.includes("square.png")) { // Ensure the box is empty (initial square image)
            if (turn0 === true) {
                box.innerHTML = "<img src='./images/O.png' alt='O' style='width: 70%; height: 80%;'>"; // Set O image
                turn0 = false;
            } else {
                box.innerHTML = "<img src='./images/X.png' alt='X' style='width: 70%; height: 80%;'>"; // Set X image
                turn0 = true;
            }
            box.style.pointerEvents = "none"; // Disable further clicks on the current box
            checkWinner();
        }
    });
});

// Check for winner based on possible winning positions
const checkWinner = () => {
    for (let pattern of winposibility) {
        let pos1val = boxes[pattern[0]].innerHTML;
        let pos2val = boxes[pattern[1]].innerHTML;
        let pos3val = boxes[pattern[2]].innerHTML;

        if (pos1val.includes("O.png") && pos2val.includes("O.png") && pos3val.includes("O.png")) {
            showWinnner("O");
            return;
        } else if (pos1val.includes("X.png") && pos2val.includes("X.png") && pos3val.includes("X.png")) {
            showWinnner("X");
            return;
        }
    }
};

// Event listeners for reset and new game buttons
newgame.addEventListener("click", resetbtn);
reset.addEventListener("click", resetbtn);
