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

const checkDecimalExist = (number) => {
  let num = number.toString();
  for (let i = 0; i < num.length; i++) {
    if (num[i] === ".") {
      return true;
    }
  }
  return false;
};

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

const checkZeroRepeatedWithNonDecimalNumber = (originalNumber, newNumber) => {
  let newString = `${originalNumber}${newNumber}`;
  if (newString.charAt(0) === "0" && newString.charAt(1) === "0") {
    return true;
  }
  return false;
};

const getUserNumberInput = (event) => {
  if (firstNumberPressed) {
    if (firstNumberInput === undefined) {
      firstNumberInput = event;
      firstNumber.textContent += event;
    } else if (firstNumberInput != undefined) {
      if (
        checkZeroRepeatedWithNonDecimalNumber(firstNumberInput, event) !=
          true &&
        firstNumberInput.length > 0 &&
        firstNumberInput.length < 10
      ) {
        firstNumberInput += event;
        firstNumber.textContent += event;
      }
    }
  } else if (secondNumberPressed) {
    if (secondNumberInput === undefined) {
      secondNumberInput = event;
      secondNumber.textContent += event;
    } else if (secondNumberInput != undefined) {
      if (
        checkZeroRepeatedWithNonDecimalNumber(secondNumberInput, event) !=
          true &&
        secondNumberInput.length > 0 &&
        secondNumberInput.length < 10
      ) {
        secondNumberInput += event;
        secondNumber.textContent += event;
      }
    }
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
    if (secondNumber === 0) {
      result = "ERROR";
    } else {
      result = firstNumber / secondNumber;
    }
  }

  if (checkDecimalExist(result)) {
    const originalNumber = result;
    result = originalNumber.toFixed(3);
  }
  return result;
};

const getUserOperatorInput = (event) => {
  if (
    firstNumberInput != undefined &&
    firstNumberInput != "" &&
    firstNumberInput != "-" &&
    operatorInput != undefined &&
    operatorInput != "" &&
    secondNumberInput != undefined &&
    secondNumberInput != "" &&
    secondNumberInput != "-"
  ) {
    if (
      operate(firstNumberInput, operatorInput, secondNumberInput) != "ERROR"
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
      operate(firstNumberInput, operatorInput, secondNumberInput) === "ERROR"
    ) {
      result.textContent = "ERROR";
      firstNumberInput = undefined;
      secondNumberInput = undefined;
      operatorInput = undefined;
      firstNumber.textContent = "";
      secondNumber.textContent = "";
      operator.textContent = "";
      firstNumberPressed = true;
      secondNumberPressed = false;
    }
  } else if (
    firstNumberInput != undefined &&
    firstNumberInput != "" &&
    firstNumberInput != "-" &&
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
    firstNumberInput != "-" &&
    operatorInput != undefined &&
    operatorInput != "" &&
    secondNumberInput != undefined &&
    secondNumberInput != "" &&
    secondNumberInput != "-"
  ) {
    if (
      operate(firstNumberInput, operatorInput, secondNumberInput) != "ERROR"
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
    } else if (
      operate(firstNumberInput, operatorInput, secondNumberInput) === "ERROR"
    ) {
      result.textContent = "ERROR";
      firstNumberInput = undefined;
      secondNumberInput = undefined;
      operatorInput = undefined;
      firstNumber.textContent = "";
      secondNumber.textContent = "";
      operator.textContent = "";
      firstNumberPressed = true;
      secondNumberPressed = false;
    }
  }
};

const addDecimalToNumber = () => {
  if (
    firstNumberPressed &&
    firstNumberInput != undefined &&
    firstNumberInput != "" &&
    firstNumberInput != "-"
  ) {
    if (checkDecimalExist(firstNumberInput) != true) {
      firstNumber.textContent += ".";
      firstNumberInput = firstNumber.textContent;
    }
  } else if (
    secondNumberPressed &&
    secondNumberInput != undefined &&
    secondNumberInput != "" &&
    secondNumberInput != "-"
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
    if (
      firstNumberInput != undefined &&
      firstNumberInput != "" &&
      firstNumberInput != "-"
    ) {
      number = Number(firstNumberInput) / 100;
      firstNumber.textContent = number;
      firstNumberInput = number;
    }
  } else if (secondNumberPressed) {
    if (
      secondNumberInput != undefined &&
      secondNumberInput != "" &&
      secondNumberInput != "" &&
      secondNumberInput != "-"
    ) {
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
      newString = secondNumberInput.toString().slice(0, -1);
      secondNumber.textContent = newString;
      secondNumberInput = newString;
    }
  } else if (operatorInput != undefined || operatorInput === "") {
    if (operatorInput === "") {
      operatorInput = undefined;
      newString = firstNumberInput.toString().slice(0, -1);
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
      firstNumberInput = undefined;
      firstNumberPressed = true;
    } else if (firstNumberInput != undefined) {
      newString = firstNumberInput.toString().slice(0, -1);
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
        if (firstNumberInput.toString().charAt(0) != "-") {
          newString = `-${firstNumberInput}`;
          firstNumber.textContent = newString;
          firstNumberInput = newString;
        } else if (firstNumberInput.toString().charAt(0) === "-") {
          newString = firstNumberInput.toString().slice(1);
          firstNumber.textContent = newString;
          firstNumberInput = newString;
        }
      } else if (
        secondNumberPressed &&
        secondNumberInput != undefined &&
        secondNumberInput != ""
      ) {
        if (secondNumberInput.toString().charAt(0) != "-") {
          newString = `-${secondNumberInput}`;
          secondNumber.textContent = newString;
          secondNumberInput = newString;
        } else if (secondNumberInput.toString().charAt(0) === "-") {
          newString = secondNumberInput.toString().slice(1);
          secondNumber.textContent = newString;
          secondNumberInput = newString;
        }
      }
    } else if (btn.textContent === ".") {
      addDecimalToNumber();
    } else if (btn.textContent === "%") {
      calculatePercentage();
    } else if (btn.textContent === "⌫") {
      eraseNumber();
    }
    event.target.blur();
  });
});

document.addEventListener("keypress", (event) => {
  if (validateNumber(event.key)) {
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
