const generateButton = document.querySelector(".generate");
const secondsDisplay = document.querySelector(".seconds");
const msDisplay = document.querySelector(".ms");
const timeOutText = document.querySelector(".timeOut");
const restartButton = document.querySelector(".restart");
const testResultButton = document.querySelector(".test");
const attempts = document.querySelector(".times");
const solutionText = document.querySelector(".solution");
const inputNumber = document.querySelector(".numberInput");
const help = document.querySelector(".help");
const congratulation = document.querySelector(".congratulation");
const solutionNumber = document.querySelectorAll(".solutionNumber");

let generateNumber = null;
let timer = null;
let result = null;

generateButton.onclick = () => {
  generateNumber = Math.floor(Math.random() * 100 + 1);
  console.log("Загадонное число -", generateNumber);
  clearInterval(timer);
  timeOutText.classList.add("hidden");
  restartButton.classList.add("hidden");
  solutionText.classList.add("hidden");
  congratulation.classList.add("hidden");
  attempts.textContent = "10";
  help.textContent = "Больше или меньше";
  solutionNumber.forEach((el) => (el.textContent = generateNumber));

  let totalTimeMs = 45000;
  const setTimeStart = Date.now();

  timer = setInterval(() => {
    if (attempts.textContent === "0") {
      clearInterval(timer);
    }
    const elapsed = Date.now() - setTimeStart;
    const remaining = Math.max(0, totalTimeMs - elapsed);
    const timeSec = Math.floor(remaining / 1000);
    const timeMs = Math.floor((remaining % 1000) / 10);
    secondsDisplay.textContent = timeSec.toString().padStart(2, "0");
    msDisplay.textContent = timeMs.toString().padStart(2, "0");
    if (remaining <= 0) {
      clearInterval(timer);
      solutionNumber.forEach((el) => (el.textContent = generateNumber));
      timeOutText.classList.remove("hidden");
      restartButton.classList.remove("hidden");
      generateNumber = null;
    }
  }, 50);
  inputNumber.focus();
  inputNumber.select();
};

restartButton.onclick = () => {
  generateNumber = Math.floor(Math.random() * 100 + 1);
  console.log("Загадонное число -", generateNumber);
  clearInterval(timer);
  timeOutText.classList.add("hidden");
  restartButton.classList.add("hidden");
  solutionText.classList.add("hidden");
  congratulation.classList.add("hidden");
  attempts.textContent = "10";
  help.textContent = "Больше или меньше";
  solutionNumber.forEach((el) => (el.textContent = generateNumber));

  let totalTimeMs = 45000;
  const setTimeStart = Date.now();

  timer = setInterval(() => {
    if (attempts.textContent === "0") {
      clearInterval(timer);
    }
    const elapsed = Date.now() - setTimeStart;
    const remaining = Math.max(0, totalTimeMs - elapsed);
    const timeSec = Math.floor(remaining / 1000);
    const timeMs = Math.floor((remaining % 1000) / 10);
    secondsDisplay.textContent = timeSec.toString().padStart(2, "0");
    msDisplay.textContent = timeMs.toString().padStart(2, "0");
    if (remaining <= 0) {
      clearInterval(timer);
      solutionNumber.forEach((el) => (el.textContent = generateNumber));
      timeOutText.classList.remove("hidden");
      restartButton.classList.remove("hidden");
      generateNumber = null;
    }
  }, 50);
  inputNumber.focus();
  inputNumber.select();
};

inputNumber.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    testResultButton.onclick();
  }
});

testResultButton.onclick = () => {
  const currentAttempt = parseFloat(attempts.textContent);
  if (generateNumber === null) {
    help.textContent = "Вы не сгенерировали число";
    return;
  }
  if (inputNumber.value === "") {
    help.textContent = "Вы не ввели число";
    return;
  }
  if (help.textContent === "Угадали") {
    generateNumber = null;
    return;
  }
  if (currentAttempt === 0) {
    return;
  }
  result = currentAttempt;
  result--;
  if (inputNumber.value > 100 || inputNumber.value <= 0) {
    help.textContent = "Ваше число вышло из диапазона";
  } else if (generateNumber > inputNumber.value) {
    help.textContent = "Больше";
  } else if (generateNumber < inputNumber.value) {
    help.textContent = "Меньше";
  } else if (inputNumber.value > 100 || inputNumber.value <= 0) {
    help.textContent = "Ваше число вышло из диапазона";
  } else {
    clearInterval(timer);
    help.textContent = "Угадали";
    congratulation.classList.remove("hidden");
    restartButton.classList.remove("hidden");
    return;
  }
  if (result <= 0) {
    generateNumber = null;
    solutionText.classList.remove("hidden");
    restartButton.classList.remove("hidden");
  }
  attempts.textContent = result.toString();
  inputNumber.focus();
  inputNumber.select();
};
