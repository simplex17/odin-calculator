let a, b, operator;

const add = function (a, b) {
    return a + b;
}

const subtract = function (a, b) {
    return a - b;
}

const multiply = function (a, b) {
    return a * b;
}

const divide = function (a, b) {
    return a / b;
}

const operate = function (a, b, operator) {
    switch (operator) {
        case "+": {
            add(a, b);
            break;
        }
        case "-": {
            subtract(a, b);
            break;
        }
        case "*": {
            multiply(a, b);
            break;
        }
        case "/": {
            divide(a, b);
            break;
        }
    }
}

