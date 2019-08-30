var modeStringArray = ["Rock", "Paper", "Scissors"];

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
    var message = ""
    if (playerSelection == "Rock" && computerSelection == "Scissors" ||
        playerSelection == "Paper" && computerSelection == "Rock" ||
        playerSelection == "Scissors" && computerSelection == "Paper"    ) {
        message = "You Win! " + playerSelection + " beats " + computerSelection;
    }
    else if (    playerSelection == "Rock" && computerSelection == "Paper" ||
        playerSelection == "Paper" && computerSelection == "Scissors" ||
        playerSelection == "Scissors" && computerSelection == "Rock"    ) {
        message = "You Lose! " + playerSelection + " beats " + computerSelection;
    }
    else {
        message = "Draw! " + playerSelection + " equals " + computerSelection;
    }
    return message;
}

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

game();