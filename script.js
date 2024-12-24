const inputField = document.querySelector(".input-field");
const typingText = document.querySelector(".typing-text p");
const timeLeft = document.querySelector(".time span b");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const tryAgainBtn = document.querySelector("button");

let timer;
let time = 60;
let mistakes = 0;
let typedChars = 0;
let isTyping = false;

// Load a random paragraph
function loadParagraph() {
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = paragraphs[randomIndex]
    .split("")
    .map(char => `<span>${char}</span>`)
    .join("");
}

// Start the timer
function startTimer() {
  if (time > 0) {
    time--;
    timeLeft.textContent = time;
  } else {
    clearInterval(timer);
    inputField.disabled = true; // Disable input when time is up
  }
}

// Typing logic
function typingLogic(e) {
  const typedChar = e.target.value.split("")[typedChars];
  const allSpans = typingText.querySelectorAll("span");
  const currentChar = allSpans[typedChars];

  if (!isTyping) {
    timer = setInterval(startTimer, 1000);
    isTyping = true;
  }

  if (typedChar === currentChar.textContent) {
    currentChar.classList.add("correct");
  } else {
    mistakes++;
    mistakeTag.textContent = mistakes;
    currentChar.classList.add("incorrect");
  }

  typedChars++;

  // Update WPM and CPM
  const wordsTyped = typedChars / 5; // Assuming 1 word = 5 characters
  wpmTag.textContent = Math.round(wordsTyped / ((60 - time) / 60));
  cpmTag.textContent = typedChars;

  if (typedChars === allSpans.length) {
    clearInterval(timer); // Stop timer if paragraph is completed
    inputField.disabled = true;
  }
}

// Reset functionality
function resetGame() {
  loadParagraph();
  time = 60;
  typedChars = 0;
  mistakes = 0;
  isTyping = false;
  timeLeft.textContent = time;
  mistakeTag.textContent = mistakes;
  wpmTag.textContent = 0;
  cpmTag.textContent = 0;
  inputField.value = "";
  inputField.disabled = false;
  clearInterval(timer);
}

// Event listeners
inputField.addEventListener("input", typingLogic);
tryAgainBtn.addEventListener("click", resetGame);

// Initialize
loadParagraph();
