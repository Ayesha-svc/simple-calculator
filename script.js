const display = document.getElementById("display");

let currentInput = "";
let previousInput = "";
let operator = "";
let justCalculated = false;

function appendNumber(number) {
    if (justCalculated) {
        currentInput = "";
        previousInput = "";
        operator = "";
        justCalculated = false;
    }

    if (number === "." && currentInput.includes(".")) {
        return;
    }

    if (number === "." && currentInput === "") {
        currentInput = "0";
    }

    currentInput += number;

    if (operator !== "") {
        display.value = previousInput + " " + operator + " " + currentInput;
    } else {
        display.value = currentInput;
    }
}

function appendOperator(op) {
    if (currentInput === "" && previousInput === "") {
        return;
    }

    if (justCalculated) {
        previousInput = currentInput;
        currentInput = "";
        justCalculated = false;
    } else if (previousInput === "") {
        previousInput = currentInput;
        currentInput = "";
    }

    operator = op;
    display.value = previousInput + " " + operator;
}

function calculate() {
    if (previousInput === "" || currentInput === "" || operator === "") {
        return;
    }

    const firstNumber = parseFloat(previousInput);
    const secondNumber = parseFloat(currentInput);
    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            if (secondNumber === 0) {
                display.value = "Cannot divide by 0";
                currentInput = "";
                previousInput = "";
                operator = "";
                return;
            }
            result = firstNumber / secondNumber;
            break;

        default:
            return;
    }

    result = Math.round(result * 100000000) / 100000000;

    display.value =
        previousInput + " " +
        operator + " " +
        currentInput + " = " +
        result;

    currentInput = result.toString();
    previousInput = "";
    operator = "";
    justCalculated = true;
}

function clearDisplay() {
    display.value = "";
    currentInput = "";
    previousInput = "";
    operator = "";
    justCalculated = false;
}

function deleteLast() {
    if (justCalculated) {
        clearDisplay();
        return;
    }

    if (currentInput !== "") {
        currentInput = currentInput.slice(0, -1);
    }

    if (operator !== "") {
        display.value =
            previousInput + " " + operator +
            (currentInput !== "" ? " " + currentInput : "");
    } else {
        display.value = currentInput;
    }
}
