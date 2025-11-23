document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;
    const totalPairs = 8; // Since you have 8 pairs (16 cards)

    // Shuffle cards
    function shuffleCards() {
        cards.forEach(card => {
            const randomPos = Math.floor(Math.random() * cards.length);
            card.style.order = randomPos;
        });
    }

    // Flip card
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            // First click
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        // Second click
        secondCard = this;
        checkForMatch();
    }

    // Check for match
    function checkForMatch() {
        const isMatch = firstCard.querySelector('.back-view img').src === 
                       secondCard.querySelector('.back-view img').src;

        if (isMatch) {
            disableCards();
            matchedPairs++;
            checkGameComplete();
        } else {
            unflipCards();
        }
    }

    // Disable matched cards
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    }

   // Unflip unmatched cards
function unflipCards() {
    lockBoard = true;
    
    // Add shake class to both cards
    firstCard.classList.add('shake');
    secondCard.classList.add('shake');

    setTimeout(() => {
        firstCard.classList.remove('flip', 'shake');
        secondCard.classList.remove('flip', 'shake');
        
        resetBoard();
    }, 1000);
}

    // Reset board state
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    // Check if game is complete
    function checkGameComplete() {
        if (matchedPairs === totalPairs) {
            setTimeout(() => {
                alert('Congratulations! You found all matches!');
                resetGame();
            }, 500);
        }
    }

    // Reset the entire game
    function resetGame() {
        matchedPairs = 0;
        resetBoard();

        cards.forEach(card => {
            card.classList.remove('flip');
            card.addEventListener('click', flipCard);
        });

        setTimeout(shuffleCards, 500);
    }

    // Add event listeners
    cards.forEach(card => card.addEventListener('click', flipCard));

    // Initial shuffle
    shuffleCards();
});
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const timeElement = document.getElementById('time');
    const flipsElement = document.getElementById('flips');
    const refreshBtn = document.getElementById('refresh-btn');
    
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;
    const totalPairs = 8;
    let flipCount = 0;
    let timeLeft = 60;
    let timer;
    
    // Initialize game
    function initGame() {
        matchedPairs = 0;
        flipCount = 0;
        timeLeft = 60;
        flipsElement.textContent = flipCount;
        timeElement.textContent = timeLeft;
        
        clearInterval(timer);
        startTimer();
        
        resetBoard();
        cards.forEach(card => {
            card.classList.remove('flip');
            card.addEventListener('click', flipCard);
        });
        
        shuffleCards();
    }
    
    // Start timer
    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timeElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                setTimeout(() => {
                    alert('Time is up! Game over.');
                    initGame();
                }, 500);
            }
        }, 1000);
    }
    
    // Shuffle cards
    function shuffleCards() {
        cards.forEach(card => {
            const randomPos = Math.floor(Math.random() * cards.length);
            card.style.order = randomPos;
        });
    }
    
    // Flip card
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        if (timeLeft <= 0) return;
        
        this.classList.add('flip');
        flipCount++;
        flipsElement.textContent = flipCount;
        
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        
        secondCard = this;
        checkForMatch();
    }
    
    // Check for match
    function checkForMatch() {
        const isMatch = firstCard.querySelector('.back-view img').src === 
                       secondCard.querySelector('.back-view img').src;
        
        if (isMatch) {
            disableCards();
            matchedPairs++;
            checkGameComplete();
        } else {
            unflipCards();
        }
    }
    
    // Disable matched cards
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        
        resetBoard();
    }
    
    // Unflip unmatched cards
    function unflipCards() {
        lockBoard = true;
        
        firstCard.classList.add('shake');
        secondCard.classList.add('shake');
        
        setTimeout(() => {
            firstCard.classList.remove('flip', 'shake');
            secondCard.classList.remove('flip', 'shake');
            
            resetBoard();
        }, 1000);
    }
    
    // Reset board state
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
    
    // Check if game is complete
    function checkGameComplete() {
        if (matchedPairs === totalPairs) {
            clearInterval(timer);
            setTimeout(() => {
                alert(`Congratulations! You found all matches in ${60 - timeLeft} seconds with ${flipCount} flips!`);
                initGame();
            }, 500);
        }
    }
    
    // Event listeners
    cards.forEach(card => card.addEventListener('click', flipCard));
    refreshBtn.addEventListener('click', initGame);
    
    // Initialize the game
    initGame();
});