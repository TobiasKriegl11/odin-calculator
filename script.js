const display = document.getElementById('display');
const buttonsList = document.querySelectorAll('.digit-btn');
const operators = document.querySelectorAll('.operator-btn');
const clearButton = document.querySelector('.clear-btn');

let firstNumber = null;
let secondNumber = null;
let operatorSymbol = null;
let isResultOnDisplay = false;

buttonsList.forEach(individualButton => {
  individualButton.addEventListener('click', function(e) {
    const clickedDigit = e.target.textContent;

    if (isResultOnDisplay) {
      firstNumber = clickedDigit;
      display.textContent = clickedDigit;
      secondNumber = null;
      operatorSymbol = null;
      isResultOnDisplay = false;
      return;
    }

    if (clickedDigit === "." &&
      display.textContent.includes("."))
    {
      return;
    }

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
    const clickedOperator = e.target.textContent;

    if (clickedOperator === "=") {
      if (firstNumber === null || operatorSymbol === null || secondNumber === null) {
        return;
      }


      const result = operate (firstNumber, operatorSymbol, secondNumber);
      display.textContent = result;

      firstNumber = result;
      secondNumber = null;
      operatorSymbol = null;
      isResultOnDisplay = true;
    } else {
      if (firstNumber !== null && operatorSymbol !== null && secondNumber !== null) {
        const result = operate(firstNumber, operatorSymbol, secondNumber);
        display.textContent = result;
        firstNumber = result;
        secondNumber = null;
      }

      operatorSymbol = clickedOperator;
      isResultOnDisplay = false;
    }
  });
});

if (clearButton) {
  clearButton.addEventListener('click', () => {
    firstNumber = null;
    secondNumber = null;
    operatorSymbol = null;
    isResultOnDisplay = false;
    display.textContent = "0";
  });
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const sum = (array) => array.reduce((total, current) => total + current, 0);
const multiply = (array) => array.reduce((product, current) => product * current);
const divide = (array) => array.reduce((dividend, divisor) => dividend / divisor);

const operate = function(num1, operator, num2) {
  const a = Number(num1);
  const b = Number(num2);

  if (operator === "/" && b === 0) {
    firstNumber = null;
    secondNumber = null;
    operatorSymbol = null;
    return "Points for creativity!";
  }

  let finalValue;
  switch(operator) {
    case "+":
      finalValue = add(a, b);
      break;
    case "-":
      finalValue = subtract(a, b);
      break;
    case "*":
      finalValue = multiply([a, b]);
      break;
    case "/":
      finalValue = divide([a, b]);
      break;
    default:
      return "0";
  };

  return Math.round(finalValue * 1000) / 1000;
};