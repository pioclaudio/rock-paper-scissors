var modeStringArray = ["Rock", "Paper", "Scissors"];
const outcomeEnum = { WIN: 1, LOSS: 2, DRAW: 3, NONE: 4 };
var outcomeIconEnum = { 1: "check-", 2: "times-", 3: "minus-", 4: "" };
var round = 0;
var outcomeArray = [4,4,4,4,4];
var playerScore = 0;
var computerScore = 0;

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function processPlayerInput(playerInputString) {
    return capitalizeFirstLetter(playerInputString.toLowerCase());
}

function computerPlay() {
    return modeStringArray[getRndInteger(0, 2)];
}

function playRound(playerSelection, computerSelection) {
    let message = "";
    let outcome;
    if (playerSelection == "Rock" && computerSelection == "Scissors" ||
        playerSelection == "Paper" && computerSelection == "Rock" ||
        playerSelection == "Scissors" && computerSelection == "Paper"    ) {
        message = "You Win! " + playerSelection + " beats " + computerSelection;
        outcome = outcomeEnum.WIN;
    }
    else if (    playerSelection == "Rock" && computerSelection == "Paper" ||
        playerSelection == "Paper" && computerSelection == "Scissors" ||
        playerSelection == "Scissors" && computerSelection == "Rock"    ) {
        message = "You Lose! " + playerSelection + " loses to " + computerSelection;
        outcome = outcomeEnum.LOSS;
    }
    else {
        message = "Draw! " + playerSelection + " equals " + computerSelection;
        outcome = outcomeEnum.DRAW;
    }
    return [message,outcome];
}

// old console interface
function game() {
    
    let round = 0;
    do {
        let playerSelection;
        let isInputValid = false;
        do {
            let playerInputString = prompt("Round #"+ (round+1) + "/5")
            playerSelection = processPlayerInput(playerInputString);
            isInputValid = modeStringArray.includes(playerSelection);
            if (!isInputValid) {
                alert("Wrong Input. Try Again.")
            }
        } while (!isInputValid);
        
        computerSelection = computerPlay();
        console.log(playRound(playerSelection, computerSelection))
        round++;
    } while (round < 5);
}

function setImage(targetId, sel) {
    document.getElementById(targetId).src =  "img/"+sel+".png";
}

function gameStart() {
    round = 0;
    outcomeArray = [4,4,4,4,4];

    const icons = Array.from(document.querySelectorAll('.fas'));
    icons.forEach(icon => icon.classList = "fas fa-circle");
    const msgs = Array.from(document.querySelectorAll('.endMessage'));
    msgs.forEach(msg => msg.classList.toggle("hide"));
    document.getElementById("msgbox").innerHTML = "ROCK PAPER SCISSORS the game";
    computerScore = 0;
    playerScore = 0;
}

function gameEnd() {
    const msgs = Array.from(document.querySelectorAll('.endMessage'));
    msgs.forEach(msg => msg.classList.toggle("hide"));

    document.getElementById("resultbox").innerHTML = (playerScore>computerScore?
        "YOU WIN THE GAME!": playerScore<computerScore? "YOU LOSE THE GAME!" : "DRAW GAME") + 
        " " + playerScore + " - " + computerScore; 
}

function setPlayerSection(e) {
    if (round>=5)
        return;
    
    let playerSelection = e.target.getAttribute("data-key");
    computerSelection = computerPlay();

    setImage("playerSelection", playerSelection.toLowerCase());
    setImage("computerSelection", computerSelection.toLowerCase());
    [msg, outcome] = playRound(playerSelection, computerSelection);
    document.getElementById("msgbox").innerHTML = msg;

    outcomeArray[round] = outcome;
    const circle = document.getElementById("circle"+round);
    circle.classList.remove("fa-circle");
    circle.classList.add("fa-"+outcomeIconEnum[outcome]+"circle");

    playerScore += (outcome==outcomeEnum.WIN? 1 : 0);
    computerScore += (outcome==outcomeEnum.LOSS? 1 : 0);
    
    round++;
    if (round>=5)
        gameEnd();

}

//game();