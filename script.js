const allBtns = document.querySelectorAll("button");
const firstNumber = document.querySelector(".user-input .firstNumber");
const secondNumber = document.querySelector(".user-input .operator");
const operator = document.querySelector(".user-input .secondNumber");
const result = document.querySelector(".result");

let firstNumberInput;
let secondNumberInput;
let operatorInput;

let firstNumberPressed = true;
let secondNumberPressed = false;

allBtns.forEach((btn) => {
  btn.addEventListener("click", () => {});
});

document.addEventListener("keypress", (event) => {});
