const wordEl = document.getElementById("word");
const messageEl = document.getElementById("message");
const leftEl = document.getElementById("left");
const alphabetEl = document.getElementById("alphabet");
const winCounterEl = document.getElementById("win-counter");
const lossCounterEl = document.getElementById("loss-counter");

// variables used to track game state and keep score
let words = ["javascript", "html", "github", "python", "function", "java", "visualstudio", "array"];
let word = "";
let wordArray = [];
let alphabet = "abcdefghijklmnopqrstuvwxyz";
let alphabetArray = alphabet.split("");
let tries = 6;
let winCounter = 0;
let lossCounter = 0;

// update HTML elements to reflect the current state
function updateDisplay() {
	wordEl.innerHTML = wordArray.join(" ");
	leftEl.innerHTML = `You have ${tries} tries left`;
	winCounterEl.innerHTML = `Wins: ${winCounter}`;
	lossCounterEl.innerHTML = `Losses: ${lossCounter}`;
}

// select a word from the list at random
function generateWord() {
	word = words[Math.floor(Math.random() * words.length)];
	wordArray = word.split("").map(function (letter) {
		return "_";
	});
	updateDisplay();
}

// create a button for each letter and adds an event listener to call the checkLetter()
function addLetterButtons() {
	alphabetArray.forEach(function (letter) {
		const letterButton = document.createElement("div");
		letterButton.classList.add("alphabet");
		letterButton.innerHTML = letter;
		letterButton.addEventListener("click", function () {
			checkLetter(letter);
		});
		alphabetEl.appendChild(letterButton);
	});
}

// update the wordArray to show the correctly guessed letters and the number of tries left
function checkLetter(letter) {
	let correct = false;
	for (let i = 0; i < word.length; i++) {
		if (word[i] === letter) {
			wordArray[i] = letter;
			correct = true;
		}
	}
	if (!correct) {
		tries--;
	}
	updateDisplay();
	checkWin();
}

// check if all the letters are guessed in the word or tries were used up and update the message and score
function checkWin() {
	if (wordArray.indexOf("_") === -1) {
		messageEl.innerHTML = "You win!";
		winCounter++;
		words = words.filter(function (w) {
			return w !== word;
		});
		if (words.length === 0) {
			messageEl.innerHTML = "Congratulations! You've won the game!";
		} else {
			reset();
		}
	} else if (tries === 0) {
		messageEl.innerHTML = "You lose!";
		lossCounter++;
		reset();
	}
}

// reset the game state and generate a new word
function reset() {
	tries = 6;
	alphabetArray.forEach(function (letter) {
		const letterButton = document.querySelector(`.alphabet:nth-child(${alphabetArray.indexOf(letter) + 1})`);
		letterButton.classList.remove("inactive");
	});
	generateWord();
}

generateWord();
addLetterButtons();
