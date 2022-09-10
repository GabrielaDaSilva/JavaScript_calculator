const numberBut = document.querySelectorAll('.number');
const operationBut = document.querySelectorAll('.operation');
const previousOperand = document.querySelector('.previousOperand');
const currentOperand = document.querySelector('.currentOperand');
currentOperand.textContent = ' ';
previousOperand.textContent = ' ';
//The textContent property sets or returns the text content of the specified node, and all its descendants.


function addition(num1, num2) {
  let add = num1 + num2;
  return add;
}

function subtraction(num1, num2) {
  let sub = num1 - num2;
  return sub;
}

function multiply(num1, num2) {
  let mul = num1 * num2;
  return mul;
}

function divide(num1, num2) {
  let dev = num1 / num2;
  if (num1 === "" && num2 === 0) {
    alert('0')
  } else {
    return dev;
  }
}

// Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.
function operate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return addition(num1, num2);
    case "-":
      return subtraction(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
  }
};

function handleNumber(valueNumber) {
  console.log(valueNumber)
}

numberBut.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.value);
  });
});

let storedValue = '';
let firstNumber = '';
let clickedOperator = '';
let result = '';
currentOperand.textContent = 0;

numberBut.forEach((number) => {
  number.addEventListener('click', function () {
    storedValue = number.value;
    previousOperand.textContent += storedValue;
  });
});

operationBut.forEach((operator => {
  operator.addEventListener('click', function () {
    // save the first number
    firstNumber = storedValue;
    // get the operator that was clicked
    clickedOperator = operator.textContent;
    previousOperand.textContent += clickedOperator;
    storedValue = '';
    console.log(clickedOperator);
  })
}));
/*
The parseFloat() function is used to accept the string and convert it into a floating-point number. 
If the string does not contain a numeral value or If the first character of the string is not a Number then it returns NaN i.e, not a number.*/
const calculate = () => {
  const result = operate(parseFloat(firstNumber), parseFloat(storedValue), clickedOperator);
  currentOperand.textContent = result;
}

const equalsBut = document.querySelector('#equals');
equalsBut.addEventListener('click', function () {
  calculate();
});

const allClearbut = document.querySelector('#allClear');
allClearbut.addEventListener('click', () => {
  previousOperand.textContent = "";
  currentOperand.textContent = "";
});

const deleteBut = document.querySelector('.delete');
deleteBut.addEventListener('click', () => {
  let currentString = previousOperand.textContent;
  previousOperand.textContent = currentString.substring(0, currentString.length - 1);
})

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {
  addDecimal();
  decimal.disabled == true;
});
function addDecimal() {
  if (previousOperand.textContent.includes(".") == false) {
    previousOperand.textContent += ".";
    return parseFloat(storedValue, 10);
  }
}

/*const percentageBut = document.querySelector(".percentage")
percentageBut.addEventListener("click", () => {
  previousOperand.textContent = (storedValue / 100);
});

const signSwap = document.querySelector("#signSwap")
signSwap.addEventListener("click", () => {
  previousOperand.textContent = (storedValue * -1);
});*/