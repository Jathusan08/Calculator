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
  let num = Number(number);
  if (num >= 0 && num <= 9) {
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
    firstNumberInput != "" &&
    operatorInput != undefined &&
    operatorInput != "" &&
    secondNumberInput != undefined &&
    secondNumberInput != ""
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
  } else if (
    firstNumberInput != undefined &&
    (operatorInput === undefined || operatorInput === "")
  ) {
    operatorInput = event;
    operator.textContent = operatorInput;
    firstNumber.textContent = firstNumberInput;
    firstNumberPressed = false;
    secondNumberPressed = true;
  }
};

const getResult = () => {
  if (
    firstNumberInput != undefined &&
    firstNumberInput != "" &&
    operatorInput != undefined &&
    operatorInput != "" &&
    secondNumberInput != undefined &&
    secondNumberInput != ""
  ) {
    result.textContent = operate(
      firstNumberInput,
      operatorInput,
      secondNumberInput
    );
    firstNumberInput = result.textContent;
    firstNumber.textContent = result.textContent;

    operatorInput = undefined;
    operator.textContent = "";

    secondNumberInput = undefined;
    secondNumber.textContent = "";

    firstNumberPressed = true;
    secondNumberPressed = false;
  }
};

const checkDecimalExist = (number) => {
  let num = number.toString();
  for (let i = 0; i < num.length; i++) {
    if (num[i] === ".") {
      console.log(`decimal found`);
      return true;
    }
  }
  return false;
};

const addDecimalToNumber = () => {
  if (
    firstNumberPressed &&
    firstNumberInput != undefined &&
    firstNumberInput != ""
  ) {
    if (checkDecimalExist(firstNumberInput) != true) {
      console.log(`decimal found`);
      firstNumber.textContent += ".";
      firstNumberInput = firstNumber.textContent;
    }
  } else if (
    secondNumberPressed &&
    secondNumberInput != undefined &&
    secondNumberInput != ""
  ) {
    if (checkDecimalExist(secondNumberInput) != true) {
      secondNumber.textContent += ".";
      secondNumberInput = secondNumber.textContent;
    }
  }
};

const calculatePercentage = () => {
  let number;
  if (firstNumberPressed) {
    if (firstNumberInput != undefined && firstNumberInput != "") {
      number = Number(firstNumberInput) / 100;
      firstNumber.textContent = number;
      firstNumberInput = number;
    }
  } else if (secondNumberPressed) {
    if (secondNumberInput != undefined && secondNumberInput != "") {
      number = Number(secondNumberInput) / 100;
      secondNumber.textContent = number;
      secondNumberInput = number;
    }
  }
};

const eraseNumber = () => {
  let newString = "";

  if (secondNumberInput != undefined || secondNumberInput === "") {
    if (secondNumberInput === "") {
      if (secondNumberPressed) {
        secondNumberPressed = false;
      }
      secondNumberInput = undefined;
      operator.textContent = "";
      operatorInput = "";
    } else if (secondNumberInput != undefined) {
      newString = secondNumberInput.slice(0, -1);
      secondNumber.textContent = newString;
      secondNumberInput = newString;
    }
  } else if (operatorInput != undefined || operatorInput === "") {
    if (operatorInput === "") {
      operatorInput = undefined;
      newString = firstNumberInput.slice(0, -1);
      firstNumber.textContent = newString;
      firstNumberInput = newString;
      firstNumberPressed = true;
    } else if (operatorInput != undefined) {
      operator.textContent = "";
      operatorInput = "";

      if (operatorInput === "") {
        secondNumberPressed = false;
      }
    }
  } else if (firstNumberInput != undefined || firstNumberInput === "") {
    if (firstNumberInput === "") {
      console.log("undefined");
      firstNumberInput = undefined;
      firstNumberPressed = true;
    } else if (firstNumberInput != undefined) {
      console.log("clear");
      newString = firstNumberInput.slice(0, -1);
      firstNumber.textContent = newString;
      firstNumberInput = newString;
      if (firstNumberInput === "") {
        if (secondNumberPressed) {
          secondNumberPressed = false;
        }
      }
    }
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
    } else if (btn.textContent === "=") {
      getResult();
    } else if (btn.textContent === "+/-") {
      let newString = "";
      if (
        firstNumberPressed &&
        firstNumberInput != undefined &&
        firstNumberInput != ""
      ) {
        if (firstNumberInput.charAt(0) != "-") {
          newString = `-${firstNumberInput}`;
          firstNumber.textContent = newString;
          firstNumberInput = newString;
        } else if (firstNumberInput.charAt(0) === "-") {
          newString = firstNumberInput.slice(1);
          firstNumber.textContent = newString;
          firstNumberInput = newString;
        }
      } else if (
        secondNumberPressed &&
        secondNumberInput != undefined &&
        secondNumberInput != ""
      ) {
        if (secondNumberInput.charAt(0) != "-") {
          newString = `-${secondNumberInput}`;
          secondNumber.textContent = newString;
          secondNumberInput = newString;
        } else if (secondNumberInput.charAt(0) === "-") {
          newString = secondNumberInput.slice(1);
          secondNumber.textContent = newString;
          secondNumberInput = newString;
        }
      }
    } else if (btn.textContent === ".") {
      addDecimalToNumber();
    } else if (btn.textContent === "%") {
      console.log("percentage");
      calculatePercentage();
    } else if (btn.textContent === "⌫") {
      console.log("remove");
      eraseNumber();
    }

    event.target.blur();
  });
});

document.addEventListener("keypress", (event) => {
  console.log(event);
  if (validateNumber(event.key)) {
    console.log(`number pressed`);
    getUserNumberInput(event.key);
  } else if (
    validateCommonOperator(event.key) ||
    event.key === "/" ||
    event.key === "*"
  ) {
    getUserOperatorInput(event.key);
  } else if (event.key === "Enter") {
    getResult();
  } else if (event.key === ".") {
    addDecimalToNumber();
  }
});
