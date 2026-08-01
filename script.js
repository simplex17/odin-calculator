let [firstOperand, secondOperand, operator] = ["0", "0", ""];
let postOp = false;
const display = document.querySelector(".calculator__display");
const buttons = document.querySelectorAll(".calculator__button, .calculator__button-lg");
let decimalButton;

const reset = () => {
    firstOperand = secondOperand = "0";
    operator = "";
    postOp = false;
    decimalButton.disabled = false;
    updateDisplay("0");
}

const backspace = () => {
    if (postOp || display.textContent === "0") return;

    let deletedChar;

    if (operator) {
        deletedChar = secondOperand.at(-1);
        if (secondOperand.slice(0, -1)) {
            secondOperand = secondOperand.slice(0, -1);
        } else {
            secondOperand = "0";
        }
        updateDisplay(secondOperand);
    } else {
        deletedChar = firstOperand.at(-1);
        if (firstOperand.slice(0, -1)) {
            firstOperand = firstOperand.slice(0, -1);
        } else {
            firstOperand = "0";
        }
        updateDisplay(firstOperand);
    }

    if (deletedChar === ".") decimalButton.disabled = false;
}

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;
const operate = () => {
    if (!(firstOperand && secondOperand && operator)) return;

    firstOperand = parseFloat(firstOperand);
    secondOperand = parseFloat(secondOperand);
    let result;

    switch (operator) {
        case "+":
            result = add(firstOperand, secondOperand);
            break;

        case "-":
            result = subtract(firstOperand, secondOperand);
            break;

        case "*":
            result = multiply(firstOperand, secondOperand);
            break;

        case "/":
            if (secondOperand === 0) {
                reset();
                updateDisplay("Can't divide by zero");
                return;
            }
            result = divide(firstOperand, secondOperand);
            break;

    }

    if (result.toString().includes(".")) result = result.toFixed(2);
    else result = result.toString();

    updateDisplay(result);
    secondOperand = operator = "";
    firstOperand = result;
    postOp = true;
    decimalButton.disabled = false;
}

const updateValue = (val) => {
    if (!operator && postOp) {
        firstOperand = "0";
        postOp = false;
    }

    if (val === "." && decimalButton.disabled) {
        return;
    }

    if (operator) {
        if (secondOperand === "0") {
            if (val !== "0") {
                if (val === ".") {
                    secondOperand += val;
                } else {
                    secondOperand = val;
                }
            }
        } else {
            secondOperand += val;
        }
        if (val === ".") decimalButton.disabled = true;
        updateDisplay(secondOperand);
    } else {
        if (firstOperand === "0") {
            if (val !== "0") {
                if (val === ".") {
                    firstOperand += val;
                } else {
                    firstOperand = val;
                }
            }
        } else {
            firstOperand += val;
        }
        if (val === ".") decimalButton.disabled = true;
        updateDisplay(firstOperand);
    }
}

const updateOperation = (val) => {
    if (!firstOperand) return;

    if (secondOperand && operator) {
        operate();
    }

    operator = val;

    if (decimalButton.disabled) decimalButton.disabled = false;
}

const updateDisplay = (val) => { display.textContent = val; }

const evalInput = (val) => {
    const numbers = "1234567890.";
    const operators = "/*-+";

    if (val === 'C' || val === 'c') reset();
    else if (val === '⌫' || val === 'Backspace') backspace();
    else if (operators.includes(val)) updateOperation(val);
    else if (val === "=") operate();
    else if (numbers.includes(val)) updateValue(val);
}

buttons.forEach(btn => {
    if (btn.textContent === ".") decimalButton = btn;
    btn.addEventListener('click', (e) => {
        const val = e.target.textContent;
        evalInput(val);
    });
});

document.addEventListener('keydown', (e) => {
    const val = e.key;
    evalInput(val);
});

updateDisplay("0");
