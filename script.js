const display = document.getElementById('display');
const buttonsList = document.querySelectorAll('.digit-btn');
const operators = document.querySelectorAll('.operator-btn');
const clearButton = document.querySelector('.clear-btn');
const backspaceButton = document.querySelector('.backspace-btn');
const equalsButton = document.querySelector('.equals-btn');

const decimalButton = [...buttonsList].find(
  button => button.textContent === "."
);

let firstNumber = null;
let secondNumber = null;
let operatorSymbol = null;
let isResultOnDisplay = false;

function updateDecimalButton() {
  decimalButton.disabled = display.textContent.includes(".");
}

function setDisplay(value) {
  display.textContent = value;
  updateDecimalButton();
}

updateDecimalButton();

if (backspaceButton) {
  backspaceButton.addEventListener('click', () => {
    if (isResultOnDisplay) return;
    if (display.textContent.length === 1) {
      setDisplay("0");
    } else {
      setDisplay(display.textContent.slice(0, -1));
    }
    if (operatorSymbol === null) {
      firstNumber = display.textContent === "0" ? null : display.textContent;
    } else {
      secondNumber = display.textContent === "0" ? null : display.textContent;
    }
  });
}


buttonsList.forEach(individualButton => {
  individualButton.addEventListener('click', function(e) {
    const clickedDigit = e.target.textContent;

    if (isResultOnDisplay) {
      firstNumber = clickedDigit;
      setDisplay(clickedDigit);
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
        setDisplay(clickedDigit === "." ? "0." : clickedDigit);
      } else {
        setDisplay(display.textContent + clickedDigit);
      }
      firstNumber = display.textContent;
    } else {
      if (secondNumber === null) {
        setDisplay(clickedDigit);
      } else {
        setDisplay(display.textContent + clickedDigit);
      }
      secondNumber = display.textContent;
    }
  });
});



operators.forEach(specificOperator => {
  specificOperator.addEventListener('click', function(e) {
    const clickedOperator = e.target.textContent;

    if (firstNumber !== null && operatorSymbol !== null && secondNumber !== null) {
        const result = operate(firstNumber, operatorSymbol, secondNumber);
        setDisplay(result);
        firstNumber = result;
        secondNumber = null;
      }

    operatorSymbol = clickedOperator;
    isResultOnDisplay = false;
  });
});

if (equalsButton) {
  equalsButton.addEventListener('click', () => {
    if (firstNumber === null || operatorSymbol === null || secondNumber === null) {
      return;
    }

    const result = operate (firstNumber, operatorSymbol, secondNumber);
    setDisplay(result);

    firstNumber = result;
    secondNumber = null;
    operatorSymbol = null;
    isResultOnDisplay = true;
  });
}

if (clearButton) {
  clearButton.addEventListener('click', () => {
    firstNumber = null;
    secondNumber = null;
    operatorSymbol = null;
    isResultOnDisplay = false;
    setDisplay("0");
  });
}

document.addEventListener('keydown', (e) => {
  if ("0123456789.".includes(e.key)) {
    const button = [...buttonsList].find(
      button => button.textContent === e.key
    );
    if (button) {
      button.click();
    }
  }
  if ("+-*/".includes(e.key)) {
    const button = [...operators].find(
      button => button.textContent === e.key
    );
    if (button) {
      button.click();
    }
  }
  if (e.key === "Enter") {
    e.preventDefault();
    if (equalsButton) equalsButton.click();
  }
  
  if (e.key === "Backspace") {
    e.preventDefault();
    backspaceButton.click();
  }
  if (e.key === "Escape") {
    clearButton.click();
  }
});

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

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
      finalValue = multiply(a, b);
      break;
    case "/":
      finalValue = divide(a, b);
      break;
    default:
      return "0";
  };

  return Math.round(finalValue * 1000) / 1000;
};