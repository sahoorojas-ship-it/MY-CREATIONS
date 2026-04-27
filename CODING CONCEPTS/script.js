let secretNumber;
let attempts = 0;
const maxAttempts = 10; // Optional limit

const guessInput = document.getElementById("guessInput");
const messageArea = document.getElementById("message");
const guessesDisplay = document.getElementById("guesses");
const restartButton = document.getElementById("restartButton");

function startGame() {
    // Generate a random number between 1 and 100
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    
    // Reset UI elements
    messageArea.textContent = "";
    messageArea.className = "";
    guessesDisplay.textContent = "Guesses: 0";
    guessInput.value = "";
    guessInput.disabled = false;
    restartButton.style.display = "none";
}

function checkGuess() {
    const userGuess = parseInt(guessInput.value);

    // Basic input validation
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        setMessage("Please enter a valid number between 1 and 100.", "wrong");
        return;
    }

    attempts++;
    guessesDisplay.textContent = `Guesses: ${attempts}`;

    if (userGuess === secretNumber) {
        setMessage(`Congratulations! You guessed the number in ${attempts} attempts!`, "correct");
        gameOver();
    } else if (userGuess < secretNumber) {
        setMessage("Too low! Try a higher number.", "wrong");
    } else {
        setMessage("Too high! Try a lower number.", "wrong");
    }
    
    guessInput.value = ""; // Clear the input field for the next guess
}

function setMessage(msg, className) {
    messageArea.textContent = msg;
    messageArea.className = className;
}

function gameOver() {
    guessInput.disabled = true;
    restartButton.style.display = "block";
}

// Start the game when the page loads
startGame();
