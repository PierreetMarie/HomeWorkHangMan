// Grab reference to my DOM Elements
var $newGameButton = document.getElementById('new-game-button');
var $placeholders = document.getElementById('placeholders');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');



// Create variables for game (wordbank, wins, losses, picked word, guesses left, game running, picked word placeholder, guessed letter bank, incorrect bank)
var wordBank = ['Heineken', 'Modelo', 'Flat Tire', 'Hoegarden', 'Beer', 'Fat Head', 'Stella', 'Bud Light', 'Ultra', 'Coors', 'Corona', 'Silva', 'Peroni', 'Erdinger', 'Lagunitas', 'Victoria', 'Toña'];
var wins = 0;
var losses = 0;
var guessesLeft = 8;
var gameRunning = false;
var pickedWord = '';
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];


// newGame function to reset all stats, pick  new word and crete placeholders

function newGame() {
    gameRunning = true;
    guessesLeft = 8;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];
    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    // Create placeholders out of new pickWord
    for (var i = 0; i < pickedWord.length; i++) {
        if (pickedWord[i] === ' ') {
            pickedWordPlaceholderArr.push(' ');
        } else {
            pickedWordPlaceholderArr.push(' ');

        }
    }

    // Write all new game info to DOM
    $guessesLeft.textContent = guessesLeft;
    $placeholders.textContent = pickedWordPlaceholderArr.join('');
    $guessedLetters.textContent = incorrectLetterBank;


}



// letterGuess function, takes in the letter you pressed and sees if it is in the selected word
function letterGuess(letter) {
    console.log(letter);

    if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
       guessedLetterBank.push(letter);
       for (var i = 0; i < pickedWord.length; i++) {
           if (pickedWord[i]. toLowerCase() === letter.toLowerCase()) {
               pickedWordPlaceholderArr[i] = pickedWord[i];
           }

        }
        console.log(pickedWordPlaceholderArr);
        $placeholders.textContent = pickedWordPlaceholderArr.join('');
        checkIncorrect(letter);

    }
    else {
        if (!gameRunning) {
            alert("The game isn't running, click on the New Game button to start over.");
        }   else {
            alert("You've already guessed this letter, try a new one!");
        }
    }



}

// checkIncorrect(letter)
function checkIncorrect(letter){
    if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 && pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1
        ) {
            guessesLeft--;
            incorrectLetterBank.push(letter);
            $guessedLetters.textContent = incorrectLetterBank.join(' ');
            $guessesLeft.textContent = guessesLeft;
        }
        checkLoss();
}

//checkLose
function checkLoss() {
    if (guessesLeft === 0) {
        losses++;
        gameRunning = false;
        $losses.textContent = losses;
    }
}

// checkWin
function checkWin() {
    if (pickedWord.toLocaleLowerCase() === pickedWordPlaceholderArr.join('').toLocaleLowerCase())
    {
            wins++;
            gameRunning = false;
            $wins.textContent = wins;
        }
    checkWin(); 
}

// Add event listener for new game button
$newGameButton.addEventListener('click', newGame);



// Add onkeyup event to trigger letterGuess
document.onkeyup = function(event) {
    console.dir(event);
    if (event.keyCode >= 65 && event.keyCode <=90) {
        letterGuess(event.key);
    }
}
