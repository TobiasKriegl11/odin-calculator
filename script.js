const display = document.getElementById('display');
const buttonsList = document.querySelectorAll('.digit-btn');
const operators = document.querySelectorAll('.operator-btn');

let firstNumber = null;
let secondNumber = null;
let operatorSymbol = null;

buttonsList.forEach(individualButton => {
  individualButton.addEventListener('click', function(e) {
    const clickedDigit = e.target.textContent;

    if (operatorSymbol === null) {
      if (display.textContent === "0") {
        display.textContent = clickedDigit;
      } else {
        display.textContent += clickedDigit;
      }
      firstNumber = display.textContent;
    } else {
      if (secondNumber === null) {
        display.textContent = clickedDigit;
      } else {
        display.textContent += clickedDigit;
      }
      secondNumber = display.textContent;
    }
  });
});



operators.forEach(specificOperator => {
  specificOperator.addEventListener('click', function(e) {
    console.log(e.target.textContent);

    if (e.target.textContent === "=") {
      const result = operate (firstNumber, operatorSymbol, secondNumber);
      display.textContent = result;
    } else {
      operatorSymbol = e.target.textContent;
    }
  });
});

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const sum = function (array) {
  return array.reduce((total, current) => total + current, 0);
};

const multiply = function (array) {
  return array.reduce((product, current) => product * current)
};

const divide = function (array) {
  return array.reduce((dividend, divisor) => dividend / divisor)
};

const operate = function(num1, operator, num2) {

  const a = Number(num1);
  const b = Number(num2);

  switch(operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply([a, b]);
    case "/":
      return divide([a, b]);
    };
};