
// ----------------------
// Variablen
// ----------------------
let playerScore = 0;
let computerScore = 0;
let rounds = 0;
const maxRounds = 5;
let playerHistory = [];
const choices = ['rock', 'paper', 'scissors'];

// DOM Elemente
const buttons = document.querySelectorAll(".choices button");
const resultDiv = document.getElementById("result");
const scoreDiv = document.getElementById("score");
const resetBtn = document.getElementById("reset");

// Reset-Button zunächst ausblenden
resetBtn.style.display = "none";

// ----------------------
// Event Listener
// ----------------------
buttons.forEach(btn => {
    btn.addEventListener("click", () => playRound(btn.id));
});

resetBtn.addEventListener("click", resetGame);

// ----------------------
// Funktionen
// ----------------------
function choiceEmoji(choice) {
    if (choice === 'rock') return '';
    if (choice === 'paper') return '';
    return '';
}

function playRound(playerChoice) {
    if (rounds >= maxRounds) return;

    const computerChoice = computerAI();

    // Animation: active Button
    buttons.forEach(btn => btn.classList.remove("active"));
    document.getElementById(playerChoice).classList.add("active");

    // Ergebnis bestimmen
    const roundResult = getWinner(playerChoice, computerChoice);
    if (roundResult === "player") playerScore++;
    else if (roundResult === "computer") computerScore++;

    rounds++;
    playerHistory.push(playerChoice);

    // Ergebnis anzeigen mit Emoji
    resultDiv.innerHTML = `<p>Round ${rounds}: You chose ${choiceEmoji(playerChoice)}, computer chose ${choiceEmoji(computerChoice)}. 
        ${roundResult === "draw" ? "Draw!" : roundResult === "player" ? "You win!" : "Computer wins!"}</p>`;

    // Score aktualisieren + Animation
    scoreDiv.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
    scoreDiv.classList.add("update");
    setTimeout(() => scoreDiv.classList.remove("update"), 200);

    // Spielende prüfen
    if (rounds === maxRounds) {
        const finalResult = playerScore > computerScore ? " You won the game!" :
                            playerScore < computerScore ? " Computer wins the game!" :
                            " Draw!";
        resultDiv.innerHTML += `<h2>${finalResult}</h2>`;

        // Reset-Button einblenden
        resetBtn.style.display = "inline-block";
    }
}

// ----------------------
// Computer AI
// ----------------------
function computerAI() {
    if (playerHistory.length === 0) {
        return choices[Math.floor(Math.random() * choices.length)];
    }
    const lastPlayer = playerHistory[playerHistory.length - 1];
    if (lastPlayer === 'rock') return 'paper';
    if (lastPlayer === 'paper') return 'scissors';
    return 'rock';
}

// ----------------------
// Gewinner-Funktion
// ----------------------
function getWinner(player, computer) {
    if (player === computer) return "draw";
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) return "player";
    return "computer";
}

// ----------------------
// Spiel zurücksetzen
// ----------------------
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    rounds = 0;
    playerHistory = [];
    resultDiv.innerHTML = '';
    scoreDiv.textContent = `Player: 0 | Computer: 0`;
    buttons.forEach(btn => btn.classList.remove("active"));
    resetBtn.style.display = "none";
}
