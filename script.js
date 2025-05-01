const fruits = ["apple", "banana", "strawberry", "orange", "pineapple", "raspberry", "blackberry", "grape"];
let randomIndex = Math.floor(Math.random() * fruits.length);
let word = fruits[randomIndex];

let display=Array(word.length).fill('_');
let tries = 0;
let wrongGuesses=[];
let correctGuesses=[];
let previousGuesses=[];
let timerInterval;
let timeElapsed = 0;

const input = document.getElementById("input");
const charInput = document.getElementById("char-input"); // charInput.value holds the character
const submitButton = document.getElementById("submit-button");
const wordDisplay=document.getElementById("word-display");
const message = document.getElementById("message");
const hangmanSVG = document.getElementById("hangman");
const newGame = document.getElementById('new-game');

const limbs = new Map();
limbs.set(1, '<circle r="30" cx="200" cy="280" fill="none" style="stroke:black;stroke-width:2"/>');
limbs.set(2, '<line x1="200" y1="310" x2="200" y2="420" style="stroke:black;stroke-width:2"/>');
limbs.set(3, '<line x1="200" y1="310" x2="240" y2="360" style="stroke:black;stroke-width:2"/>');
limbs.set(4, '<line x1="200" y1="310" x2="160" y2="360" style="stroke:black;stroke-width:2"/>');
limbs.set(5, '<line x1="200" y1="420" x2="240" y2="480" style="stroke:black;stroke-width:2"/>');
limbs.set(6, '<line x1="200" y1="420" x2="160" y2="480" style="stroke:black;stroke-width:2"/>');

function updateDisplay(){
    wordDisplay.innerText = display.join(" ");
}

displayText(); 
startTimer();

function startTimer() {
    timeElapsed = 0;
    timerInterval = setInterval(function () {
        timeElapsed++;
        document.getElementById("timer").innerText = `Time: ${timeElapsed}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}


function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

newGame.addEventListener('click', () => {
    stopTimer();
    tries = 0;
    wrongGuesses = [];
    correctGuesses = [];
    previousGuesses = [];
    randomIndex = Math.floor(Math.random() * fruits.length);
    word = fruits[randomIndex];
    display = Array(word.length).fill('_');
    updateDisplay();
    charInput.disabled = false;
    submitButton.disabled = false;
    startTimer();
});

input.addEventListener('submit', (e) => {
    e.preventDefault();
    const guess=charInput.value.toLowerCase();
    if (isLetter(guess)) {let correctguess=false; 
        let alreadyGuessed=false;
        for(let i=0; i<previousGuesses.length; i++){
            if(previousGuesses[i]==guess){
                alreadyGuessed=true;
            }
        }
        for(let i=0; i<word.length; i++){
            if(word[i]==guess){
                display[i]=guess;
                correctguess=true; 
            }
        }
        
        
        if (correctguess&&!alreadyGuessed) {
            alert("Correct!");
            correctGuesses.push(guess);
            previousGuesses.push(guess);
            if (!display.includes('_')) {
                charInput.disabled = true;
                submitButton.disabled = true;
                stopTimer();
                message.innerText = `You won! Time: ${timeElapsed}s`;
            }
        } else if(alreadyGuessed){
            alert("This letter has already been guessed! Input another letter!");
        } else{
            alert("Wrong!");
            tries++;
            wrongGuesses.push(guess);
            previousGuesses.push(guess);
            if(tries>5){
                stopTimer();
                alert("You have lost");
                charInput.disabled = true;
                submitButton.disabled = true;
                message.innerText = `You lost! The word was "${word}". Time: ${timeElapsed}s`;

            }
            drawHangman();
        }
    
        //console.log(display.join(' '));
        charInput.value='';
        updateDisplay();
        gameStatus();
        displayWrongGuesses();
    } else {
        alert("Input is not a letter. Try again.");
    }
})

function drawHangman(){
    if(limbs.has(tries)){
        hangmanSVG.innerHTML += limbs.get(tries);
    }
}

function gameStatus(){
    if(!display.includes('_')){
        message.innerText = "You won!";
    }else if(tries >= 6){ 
        message.innerText = `You lost! The word was "${word}".`;
    }
}

function displayText() {
    wordDisplay.textContent = display.join(' ');
    wordDisplay.style.fontSize = '30px';
}


function displayWrongGuesses(){
    const wrongDisplay = document.getElementById("wrong-guesses");
    wrongDisplay.textContent = "Wrong guesses: "+wrongGuesses.join(', ');
    wrongDisplay.style.fontSize='20px';
}

