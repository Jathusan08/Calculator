const allBtns = document.querySelectorAll("button");
const firstNumber = document.querySelector(".user-input .firstNumber");
const secondNumber = document.querySelector(".user-input .secondNumber");
const operator = document.querySelector(".user-input .operator");
const result = document.querySelector(".result");

let firstNumberInput;
let secondNumberInput;
let operatorInput;

let firstNumberPressed = true;
let secondNumberPressed = false;

const clearValues = () => {
  firstNumberPressed = true;
  secondNumberPressed = false;

  firstNumberInput = undefined;
  secondNumberInput = undefined;
  operatorInput = undefined;

  firstNumber.textContent = "";
  secondNumber.textContent = "";
  operator.textContent = "";
  result.textContent = "";
};

const validateNumber = (number) => {
  if (
    number === "0" ||
    number === "1" ||
    number === "2" ||
    number === "3" ||
    number === "4" ||
    number === "5" ||
    number === "6" ||
    number === "7" ||
    number === "8" ||
    number === "9"
  ) {
    return true;
  }
};

const getUserNumberInput = (event) => {
  console.log(`number clicked`);
  if (firstNumberPressed) {
    console.log(`first number`);
    if (firstNumberInput === undefined) {
      firstNumberInput = event;
    } else if (firstNumberInput != undefined) {
      firstNumberInput += event;
    }
    firstNumber.textContent += event;
  } else if (secondNumberPressed) {
    console.log(`second number`);
    if (secondNumberInput === undefined) {
      secondNumberInput = event;
    } else if (secondNumberInput != undefined) {
      secondNumberInput += event;
    }
    secondNumber.textContent += event;
  }
};

const validateCommonOperator = (operator) => {
  if (operator === "+" || operator === "-") {
    return true;
  }
};

const operate = (number1, operator, number2) => {
  let firstNumber = Number(number1);
  let secondNumber = Number(number2);
  let result = 0;
  if (operator === "+") {
    result = firstNumber + secondNumber;
  } else if (operator === "-") {
    result = firstNumber - secondNumber;
  } else if (operator === "*" || operator === "×") {
    result = firstNumber * secondNumber;
  } else if (operator === "/" || operator === "÷") {
    result = firstNumber / secondNumber;
  }

  return result;
};

const getUserOperatorInput = (event) => {
  console.log(`Mathematical key operation clicked`);

  if (
    firstNumberInput != undefined &&
    operatorInput != undefined &&
    secondNumberInput != undefined
  ) {
    result.textContent = operate(
      firstNumberInput,
      operatorInput,
      secondNumberInput
    );
    firstNumberInput = result.textContent;
    secondNumberInput = undefined;
    operatorInput = event;
    firstNumber.textContent = firstNumberInput;
    secondNumber.textContent = "";
    operator.textContent = operatorInput;
    firstNumberPressed = false;
    secondNumberPressed = true;
  } else if (firstNumberInput != undefined && operatorInput === undefined) {
    operatorInput = event;
    operator.textContent = operatorInput;
    firstNumber.textContent = firstNumberInput;
    firstNumberPressed = false;
    secondNumberPressed = true;
  }
};

allBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (btn.textContent === "C") {
      clearValues();
    } else if (validateNumber(btn.textContent)) {
      console.log(`number pressed`);
      getUserNumberInput(btn.textContent);
    } else if (
      validateCommonOperator(btn.textContent) ||
      btn.textContent === "÷" ||
      btn.textContent === "×"
    ) {
      getUserOperatorInput(btn.textContent);
    }
    event.target.blur();
  });
});

document.addEventListener("keypress", (event) => {
  if (validateNumber(event.key)) {
    console.log(`number pressed`);
    getUserNumberInput(event.key);
  } else if (
    validateCommonOperator(event.key) ||
    event.key === "/" ||
    event.key === "*"
  ) {
    getUserOperatorInput(event.key);
  }
});
