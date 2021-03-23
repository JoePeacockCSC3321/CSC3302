//constants to link it to html data stream
const screen = document.querySelector("[data-screen]");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operand]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const equalsButton = document.querySelector("[data-evaluate]");
//Variable declaration
let bufferA = "";
let bufferB = "";
let operandBuffer = null;
let resetBool = false;
//Key initilization
window.addEventListener("keydown", setInput);
equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", pop);
//Keypad initilization
numberButtons.forEach((button) =>
  button.addEventListener("click", () => stack(button.textContent))
);
operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);
//Functions for screen stack
function stack(number) {
  if (screen.textContent === "0" || resetBool) softClear();
  screen.textContent += number;
}
function pop() {
  screen.textContent = screen.textContent.toString().slice(0, -1);
}
//Softclear (between operations) and hard clear (AC) functions
function softClear() {
  screen.textContent = "";
  resetBool = false;
}
function clear() {
  screen.textContent = "0";
  bufferA = "";
  bufferB = "";
  operandBuffer = null;
}
//Add operation to the buffer and check if its valid before running evaluate function
function setOperation(operator) {
  if (operandBuffer !== null) evaluate();
  bufferA = screen.textContent;
  operandBuffer = operator;
  resetBool = true;
}
//Main evaluate function to decide whether or not to return output and prevent divide by zero error
function evaluate() {
  if (operandBuffer === null || resetBool) return;
  if (operandBuffer === "÷" && screen.textContent === "0") {
    alert("Divide By Error. Clearing memory of calculator to prevent end of universe");
    clear();
    return;
  }
  bufferB = screen.textContent;
  screen.textContent = round(
    operate(operandBuffer, bufferA, bufferB)
  );
  operandBuffer = null;
}
//Round function to make up for lack of decimal places
function round(number) {
  return Math.round(number * 1000) / 1000;
}
//Assigns different keys to their different functions
function setInput(e) {
  if (e.key >= 0 && e.key <= 9) stack(e.key);
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") pop();
  if (e.key === "Escape") clear();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    setOperation(convertOperator(e.key) && stack(convertOperator(e.key)));
}
//Rename operators to appropriate javascript counterparts
function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "×";
  if (keyboardOperator === "-") return "−";
  if (keyboardOperator === "+") return "+";
}
//Functions for operate 
function divide(a, b) {return a / b;}
function multiply(a, b) {return a * b;}
function substract(a, b) {return a - b;}
function add(a, b) {return a + b;}
//Main operate function
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
        return add(a, b);
    case "−":
        return substract(a, b);
    case "×":
       return multiply(a, b);
    case "÷":
      if (b === 0) return null;
        else return divide(a, b);
    default:
         return null;
  }
}