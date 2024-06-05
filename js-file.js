const numberElements = document.querySelectorAll("[data-number]");
const operatorElements = document.querySelectorAll("[data-operator]");
const decimalElement = document.querySelector("#decimal");
const screenElement = document.querySelector("#screen");
const deleteElement = document.querySelector("#delete");
const equalElement = document.querySelector("#equal");
const clearElement = document.querySelector("#reset");

let IS_DISPLAYING_ANSWER = false;

const calculator = new Calculator();

numberElements.forEach((number) => {
    number.addEventListener("click", (event) => {
        const value = event.target.getAttribute("data-number");

        if (IS_DISPLAYING_ANSWER) {
            calculator.clear();
            screenElement.value = value;
        } else {
            screenElement.value += value;
        }

        calculator.pressDigit(value);
        IS_DISPLAYING_ANSWER = false;
    });
});

operatorElements.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        const value = event.target.getAttribute("data-operator");
        calculator.pressOperator(value);
        screenElement.value += " " + value + " ";
        IS_DISPLAYING_ANSWER = false;
    });
});

decimalElement.addEventListener("click", (event) => {
    if (IS_DISPLAYING_ANSWER) {
        calculator.clear();
        screenElement.value = ".";
    } else {
        screenElement.value += ".";
    }

    calculator.pressDecimal();
    IS_DISPLAYING_ANSWER = false;
});

deleteElement.addEventListener("click", (event) => {
    let deleteLength = 1;
    // If we are monitoring an operator, we need to delete the spaces plus the operator itself.
    if (calculator.isMonitoringOperator()) {
        deleteLength = 3;
    }

    const finalDeleteLength = screenElement.value.length - deleteLength;
    screenElement.value = screenElement.value.substring(0, finalDeleteLength);
    calculator.pressDelete();
    IS_DISPLAYING_ANSWER = false;
});

equalElement.addEventListener("click", (event) => {
    screenElement.value = calculator.pressEquals();
    IS_DISPLAYING_ANSWER = true;
});

clearElement.addEventListener("click", (event) => {
    calculator.clear();
    screenElement.value = null;
});

/*
const monitor = document.querySelector("#screen");

let firstNumber = "";
let operator = "";
let secondNumber = "";
let resultCalculated = false;

const numbers = document.querySelectorAll("[data-number]");
numbers.forEach((number) => {
    number.addEventListener("click", () => {
        const num = number.getAttribute('data-number');
        if (!resultCalculated && firstNumber.length < 16) {
            if (operator === "") {
                firstNumber += num;
                monitor.value = firstNumber;
            }
        }
        if (operator !== "" && secondNumber.length < 16) {
            secondNumber += num;
            monitor.value = secondNumber;
        }
    });
});

const operators = document.querySelectorAll("[data-operator]");
operators.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
        const op = operatorButton.getAttribute('data-operator');
        if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
            operate();
            operator = op;
        } else if (firstNumber !== "") {
            operator = op;
        }
    });
});

const decimal = document.querySelector("#decimal");
decimal.addEventListener('click', () => {
    if (operator === '' && firstNumber !== "") {
        if (!firstNumber.includes('.')) {
            firstNumber += '.';
            monitor.value = firstNumber;
        }
    } else {
        if (!secondNumber.includes('.') && secondNumber !== "") {
            secondNumber += '.';
            monitor.value = secondNumber;
        }
    }
});

const equal = document.querySelector("#equal");
equal.addEventListener("click", operate);

function operate() {
    let result = "";

    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    if (operator === "" || secondNumber === "") {
        return;
    }

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if (num1 === 0 && num2 === 0) { 
                reset();
                monitor.value = "Math Error";
                return;
            }
            if (num1 !== 0 && num2 === 0) {
                reset();
                monitor.value = "It Hurts.";
                return;
            }
            result = num1 / num2;
            break;
    }

    if (result.toString().length > 15) {
        result = parseFloat(result).toExponential(3);
    }
    firstNumber = (parseFloat(result)).toString();
    monitor.value = firstNumber;

    operator = "";
    secondNumber = "";
    resultCalculated = true;
}

function reset() {
    resultCalculated = false;
    firstNumber = "";
    operator = "";
    secondNumber = "";
    monitor.value = firstNumber;
}

const ac = document.querySelector("#reset");
ac.addEventListener("click", reset);

const del = document.querySelector("#delete");
del.addEventListener("click", function() {
    if (!resultCalculated) { 
        if (operator === "" && firstNumber !== "") {
            firstNumber = firstNumber.slice(0, -1);
            monitor.value = firstNumber;
        }
    }
    if (operator !== "" && secondNumber !== "") {
        secondNumber = secondNumber.slice(0, -1);
        monitor.value = secondNumber;
    }
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key)) {
        const num = key;
        if (!resultCalculated) {
            if (operator === "") {
                firstNumber += num;
                monitor.value = firstNumber;
            } else {
                secondNumber += num;
                monitor.value = secondNumber;
            }
        }
    } else if (['+', '-', '*', '/'].includes(key)) {
        if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
            operate();
            operator = key;
        } else if (firstNumber !== "") {
            operator = key;
        }
    } else if (key === '.') {
        if (operator === '') {
            if (!firstNumber.includes('.') && firstNumber !== "") {
                firstNumber += '.';
                monitor.value = firstNumber;
            }
        } else {
            if (!secondNumber.includes('.') && secondNumber !== "") {
                secondNumber += '.';
                monitor.value = secondNumber;
            }
        }
    } else if (key === 'Enter') {
        operate();
    } else if (key === 'Backspace') {
        if (!resultCalculated) {
            if (operator === "" && firstNumber !== "") {
                firstNumber = firstNumber.slice(0, -1);
                monitor.value = firstNumber;
            }
        }
        if (operator !== "" && secondNumber !== "") {
            secondNumber = secondNumber.slice(0, -1);
            monitor.value = secondNumber;
        }
    }
});
*/
