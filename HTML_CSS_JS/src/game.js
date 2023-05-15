let nMoves;
const percentGuessLetters = 30;
const quests = [['Green frut. Iphone maker.', 'apple'], ['Wrong reality, that seems', 'illusion']];
let quest;
const inputLetter = document.getElementById('input-letter-id');

const sectionElement = document.getElementById('letters-group');

const inputWord = document.getElementById('input-word-id');
const guesWordButtom = document.getElementById('gues-word-id'); 
const questionElement = document.getElementById("quastion");
const goButtonElement = document.getElementById("go-id");
const checkWordButtonElement = document.getElementById("check-word");

let squareElemnts;
const resultMessageElement = document.getElementById("game-result");
const playAgainButtonElement = document.getElementById("play-again-id");
let count;

function buildBlockElements (answer, hidden){
    const divElements = [];
    let color = hidden ? 'black' : 'white';
    divElements.length = answer.length;
    let i = 0;
    return [...divElements].map(()=>`<div id="square-id-${i}" style="background-color: ${color}" class="square">${answer.charAt(i++)}</div>`);
}

function checkLetter() {
    let letter = inputLetter.value;
        count++;
        let word = quest[0];
        while(word.includes(letter)) {
            let index = word.indexOf(letter);
            ''.replace


            word = word.substring(index+1);
            squareElemnts[index].style.backgroundColor = 'white';
        }
         if (count==nMoves) {
             guesWholeWord();
         }
    inputLetter.value = '';    
}


function startGame() {
    //inputLetter.readOnly = false;
    inputWord.hidden = true;
    quest = ['asdasdsddadaa', 'quastion: kjjkkjjhkhjhkjh'];                  //quests[Math.floor(Math.random() * quests.length)];
    sectionElement.innerHTML = `${buildBlockElements(quest[0], true).join('')}`;
    questionElement.innerHTML = quest[1];
    resultMessageElement.innerHTML = '';
    playAgainButtonElement.hidden = true;
    count = 0;
    goButtonElement.disabled = false;
    nMoves = Math.floor(quest[0].length*percentGuessLetters/100);
    squareElemnts = document.querySelectorAll(".square");
    checkWordButtonElement.hidden = true;
}

function guesWholeWord (){
    inputLetter.hidden = true;
    inputWord.hidden = false;
    checkWordButtonElement.hidden = false;
    goButtonElement.hidden = true;
    resultMessageElement.innerHTML = 'You have to guess whole word!';
}

function checkWord (){
    let word = inputWord.value;
    let res = word==quest[0] ? 'you are winner!': 'You lose!';
    finishGame(res);
}

function finishGame(result) {
    goButtonElement.disabled = true;
    playAgainButtonElement.hidden = false;
    resultMessageElement.innerHTML = result;
    checkWordButtonElement.hidden = true;

}

goButtonElement.addEventListener("click", checkLetter );
playAgainButtonElement.addEventListener("click", startGame );
guesWordButtom.addEventListener("click", guesWholeWord);
checkWordButtonElement.addEventListener("click", checkWord)
startGame();