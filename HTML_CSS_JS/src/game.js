const nMoves = 6;
//elements
const words = ['apple', 'click', 'seven', 'green', 'phone', 'book'];
let word;
const inputElement = document.getElementById('input-id');
const goButtonElement = document.getElementById("go-id");
const squareElemnts = [];
squareElemnts.length = 5;
for (let i=0; i<=5; i++){
    squareElemnts[i]=document.getElementById("square-id-".concat(i+1));
}
const resultMessageElement = document.getElementById("game-result");
const playAgainButtonElement = document.getElementById("play-again-id");
//global variables
let count;
//functions

function game() {
    let inWord = inputElement.value;
    if (inWord.length!=5){
        alert('word must contain 5 latters!');     
    } else {
        count++;
        let countOfRight = 0; 
        for (let i = 0; i<5; i++){
            let letter = inWord.charAt(i);
            squareElemnts[i].innerHTML = letter;
            let color = 'gray';
            if (letter==word.charAt(i)){
                color = 'green';
                countOfRight++;
            } else if (word.includes(letter)){
                color = 'yellow';
            }
            squareElemnts[i].style.backgroundColor = color; 
        }
        if (countOfRight==5) {
            finishGame("You are winner!");
        } else if(count==nMoves){
            finishGame("You lose!");
        }
    }
    
inputElement.value = '';
}


function startGame() {
    resultMessageElement.innerHTML = '';
    playAgainButtonElement.hidden = true;
    count = 0;
    word = words[Math.floor(Math.random() * words.length)];
    goButtonElement.disabled = false;
    inputElement.readOnly = false;
    squareElemnts.forEach(el=>{
        el.style.backgroundColor = 'white';
        el.innerHTML = '';
     });     
}

function finishGame(result) {
    goButtonElement.disabled = true;
    inputElement.readOnly = true;
    playAgainButtonElement.hidden = false;
    resultMessageElement.innerHTML = result;
}
//Actions
goButtonElement.addEventListener("click", game );
playAgainButtonElement.addEventListener("click", startGame )
startGame();