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

let firstNumber = null;
let secondNumber = null;
let operatorSymbol = null;

const operate = function(num1, operator, num2) {
  switch(operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply([num1, num2]);
    case "/":
      return divide([num1, num2]);
    };
};

