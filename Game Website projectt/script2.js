const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
const timerElement = document.querySelector(".timer-text b");

// Game variables
let currentWord, correctLetters, wrongGuessCount;
let timerInterval;
let seconds = 0;
const maxGuesses = 6;
const timeLimit = 60; // 1 minute time limit (change this value to adjust game duration)

// Format time as MM:SS
const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Update timer display with visual effects
const updateTimerDisplay = () => {
    const timeLeft = timeLimit - seconds;
    timerElement.textContent = formatTime(timeLeft);
    
    // Visual feedback based on remaining time
    if (timeLeft <= 10) {
        timerElement.style.color = "#ff0000";
        timerElement.style.fontWeight = "700";
        timerElement.style.textShadow = "0 0 5px rgba(255,0,0,0.5)";
        timerElement.classList.add("pulse");
    } else if (timeLeft <= 30) {
        timerElement.style.color = "#ff8c00";
        timerElement.style.fontWeight = "600";
        timerElement.style.textShadow = "none";
        timerElement.classList.remove("pulse");
    } else {
        timerElement.style.color = "#5E63BA";
        timerElement.style.fontWeight = "600";
        timerElement.style.textShadow = "none";
        timerElement.classList.remove("pulse");
    }
};

// Start the countdown timer
const startTimer = () => {
    seconds = 0;
    updateTimerDisplay();
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        seconds++;
        updateTimerDisplay();
        
        // End game when time runs out
        if (seconds >= timeLimit) {
            stopTimer();
            gameOver(false, true);
        }
    }, 1000);
};

// Stop the timer
const stopTimer = () => {
    clearInterval(timerInterval);
};

// Reset all game elements and states
const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "hangman-0.svg";
    guessesText.textContent = `0 / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = "1";
    });
    wordDisplay.innerHTML = currentWord.split("").map(() => '<li class="letter"></li>').join("");
    gameModal.classList.remove("show");
    
    // Reset timer styles
    timerElement.style.color = "#5E63BA";
    timerElement.style.fontWeight = "600";
    timerElement.style.textShadow = "none";
    timerElement.classList.remove("pulse");
    
    startTimer();
};

// Get a random word from the word list
const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").textContent = hint;
    resetGame();
};

// Handle game over state
const gameOver = (isVictory, timeRanOut = false) => {
    stopTimer();
    
    setTimeout(() => {
        const modalImg = gameModal.querySelector("img");
        const modalTitle = gameModal.querySelector("h4");
        const modalText = gameModal.querySelector("p");
        
        if (timeRanOut) {
            modalImg.src = "lost.gif";
            modalTitle.textContent = "Time's Up!";
            modalText.innerHTML = `
                The word was: <b>${currentWord}</b><br>
                <span style="color: #ff0000;">You ran out of time!</span><br><br>
                <span>Guesses used: <b>${wrongGuessCount}/${maxGuesses}</b></span>
            `;
        } else if (isVictory) {
            modalImg.src = "victory.gif";
            modalTitle.textContent = "Congratulations!";
            modalText.innerHTML = `
                You guessed: <b>${currentWord}</b><br>
                Time: <b>${formatTime(seconds)}</b><br>
                Wrong guesses: <b>${wrongGuessCount}/${maxGuesses}</b>
            `;
        } else {
            modalImg.src = "lost.gif";
            modalTitle.textContent = "Game Over!";
            modalText.innerHTML = `
                The word was: <b>${currentWord}</b><br>
                Time: <b>${formatTime(seconds)}</b><br>
                Wrong guesses: <b>${wrongGuessCount}/${maxGuesses}</b>
            `;
        }
        
        gameModal.classList.add("show");
    }, 300);
};

// Handle letter guessing
const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        // Correct guess
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                const letterElement = wordDisplay.querySelectorAll("li")[index];
                letterElement.textContent = letter;
                letterElement.classList.add("guessed");
            }
        });
    } else {
        // Wrong guess
        wrongGuessCount++;
        hangmanImage.src = `hangman-${wrongGuessCount}.svg`;
    }

    // Disable the clicked button
    button.disabled = true;
    button.style.opacity = "0.5";
    guessesText.textContent = `${wrongGuessCount} / ${maxGuesses}`;

    // Check game end conditions
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
};

// Create keyboard buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.textContent = String.fromCharCode(i);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
    keyboardDiv.appendChild(button);
}

// Initialize the game
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);