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

allBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "C") {
      clearValues();
    } else if (validateNumber(btn.textContent)) {
      console.log(`number pressed`);
      getUserNumberInput(btn.textContent);
    }
  });
});

document.addEventListener("keypress", (event) => {
  if (validateNumber(event.key)) {
    console.log(`number pressed`);
    getUserNumberInput(event.key);
  }
});
