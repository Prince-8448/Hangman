'use strict';


const guessWord = ["google","javascript","phone","lamp","vessel","window","laptop","door","temple","books","screen","coffee","chocolate","eyeware","pillow","spiderman","batman","casino","tesla"];
const wording_space = document.querySelector("section.word");
const end_of_game = document.querySelector("p.win");
let spans = document.getElementsByTagName('span');
let hangman = document.getElementById('hangman');
let attempts = 0;

let guessingWord = guessWord[Math.floor(Math.random() * guessWord.length)];
let guessingWordLength = guessingWord.length;
console.log(guessingWord);
let wordSpaces = new Array(guessingWord.length).fill("_");
hangman.src = "images/hangman0.png";
wording_space.textContent = wordSpaces.join("");


let main = function (event){
  let letter = event.target.textContent;
  let used_ele = event.target;
  let checkWord = wording_space.textContent;
  for(let i=0;i<guessingWord.length;i++){
    if (guessingWord[i] === letter.toLowerCase()){
      wordSpaces[i] = letter;
      guessingWordLength -= 1;
    }
  }
  wording_space.textContent = wordSpaces.join("");
  used_ele.className = "used";
  if (checkWord === wording_space.textContent){
    attempts += 1;
    hangman.src = "images/hangman" + attempts + ".png";
  }

  if (guessingWordLength <= 0){
    hangman.src = "images/winner.png";
    end_of_game.className = "";
    hangman.addEventListener("click", reset);
    for (let span of spans){
      span.removeEventListener('click', main);
    }
    return
  }
  if (attempts === 6){
    hangman.addEventListener("click", reset);
    end_of_game.className = "";
    for (let span of spans){
      span.removeEventListener('click', main);
    }
    return;
  }
}

for (let span of spans){
  span.addEventListener('click', main);
}

let reset = function(){
  location.reload();
}