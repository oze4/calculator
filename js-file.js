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