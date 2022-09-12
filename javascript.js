let firstNumber = "";
let secondNumber = "";
let operator = "";

const currentOperand = document.querySelector(".currentOperand");
const previousOperand = document.querySelector(".previousOperand");

/* Adding event listeners for buttons*/
const equal = document.querySelector("#equal");
equal.addEventListener("click", () => {
  if (secondNumber != "" && firstNumber != "") {
    compute();
  }
});

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {
  addDecimal();
});

const clear = document.querySelector("#allClear");
clear.addEventListener("click", clearCalculator);

const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

/*this prohibits numbers from goinf off the scfeen. Limits it to 9 numbers.*/
function handleNumber(number) {
  if (firstNumber !== "" && secondNumber !== "" && operator === "") {
    firstNumber = "";
    currentOperand.textContent = secondNumber;
  }
  if (secondNumber.length <= 9) {
    secondNumber += number;
    currentOperand.textContent = secondNumber;
  }
}

operators.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  });
});

/* This is a function to handel how the operators function. */
function handleOperator(op) {
  if (firstNumber === "") {
    firstNumber = secondNumber;
    operatorCheck(op);
  } else if (secondNumber === "") {
    operatorCheck(op);
  } else {
    compute();
    operator = op;
    currentOperand.textContent = "0";
    previousOperand.textContent = firstNumber + " " + operator;
  }
}

function operatorCheck(text) {
  operator = text;
  previousOperand.textContent = firstNumber + " " + operator;
  currentOperand.textContent = "0";
  secondNumber = "";
}

function compute() {
  firstNumber = Number(firstNumber);
  secondNumber = Number(secondNumber);

  if (operator === "+") {
    firstNumber += secondNumber;
  } else if (operator === "-") {
    firstNumber -= secondNumber;
  } else if (operator === "*") {
    firstNumber *= secondNumber;
  } else if (operator === "/") {
    if (secondNumber <= 0) {
      firstNumber = "Error";
      displayResults();
      return;
    }
    firstNumber /= secondNumber;
  }
  firstNumber = roundNumber(firstNumber);
  firstNumber = firstNumber.toString();
  displayResults();
}

function roundNumber(num) {
  return Math.round(num * 10000) / 10000;
}

function displayResults() {
  if (firstNumber.length <= 9) {
    currentOperand.textContent = firstNumber;
  } else {
    currentOperand.textContent = firstNumber.slice(0, 9) + "...";
  }
  previousOperand.textContent = "";
  operator = "";
  secondNumber = "";
}

function clearCalculator() {
  secondNumber = "";
  firstNumber = "";
  operator = "";
  currentOperand.textContent = "0";
  previousOperand.textContent = "";
}

function addDecimal() {
  if (!secondNumber.includes(".")) {
    secondNumber += ".";
    currentOperand.textContent = secondNumber;
  }
}

function handleKeyPress(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key);
  }
  if (
    e.key === "Enter" ||
    (e.key === "=" && secondNumber != "" && firstNumber != "")
  ) {
    compute();
  }
  if (e.key === "+" || e.key === "-" || e.key === "/") {
    handleOperator(e.key);
  }
  if (e.key === "*") {
    handleOperator("x");
  }
  if (e.key === ".") {
    addDecimal();
  }
  if (e.key === "Backspace") {
    handleDelete();
  }
}

const deleteBut = document.querySelector('.delete');
deleteBut.addEventListener('click', () => {
  if (secondNumber !== "") {
    secondNumber = secondNumber.slice(0, -1);
    currentOperand.textContent = secondNumber;
    if (secondNumber === "") {
      currentOperand.textContent = "0";
    }
  }
  if (secondNumber === "" && firstNumber !== "" && operator === "") {
    firstNumber = firstNumber.slice(0, -1);
    currentOperand.textContent = firstNumber;
  }
});
