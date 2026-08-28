const display = document.getElementById("display");

let currentInput = "";
let previousInput = "";
let operator = "";
let expression = "";
let justCalculated = false;

function appendNumber(number) {
    // Start fresh after pressing =
    if (justCalculated) {
        currentInput = "";
        previousInput = "";
        operator = "";
        expression = "";
        justCalculated = false;
    }

    // Prevent multiple decimal points
    if (number === "." && currentInput.includes(".")) {
        return;
    }

    // Add 0 before decimal if needed
    if (number === "." && currentInput === "") {
        currentInput = "0";
    }

    currentInput += number;

    // Show full calculation if operator exists
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

    // If result was just calculated, use result as first number
    if (justCalculated) {
        previousInput = currentInput;
        currentInput = "";
        justCalculated = false;
    }

    // If we already have an operation and second number, calculate first
    if (previousInput !== "" && currentInput !== "" && operator !== "") {
        calculate();

        previousInput = currentInput;
        currentInput = "";
    } else if (previousInput === "") {
        previousInput = currentInput;
        currentInput = "";
    }

    operator = op;

    display.value = previousInput + " " + operator;
}

function calculate() {
    if (
        previousInput === "" ||
        currentInput === "" ||
        operator === ""
    ) {
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

    // Fix floating-point decimal issues
    result = Math.round(result * 100000000) / 100000000;

    // Show complete calculation and result
    display.value =
        previousInput +
        " " +
        operator +
        " " +
        currentInput +
        " = " +
        result;

    // Save result for future calculations
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
    expression = "";
    justCalculated = false;
}

function deleteLast() {
    // If just calculated, clear everything
    if (justCalculated) {
        clearDisplay();
        return;
    }

    // Delete from current number
    if (currentInput !== "") {
        currentInput = currentInput.slice(0, -1);
    }

    // Update display
    if (operator !== "") {
        display.value =
            previousInput +
            " " +
            operator +
            (currentInput !== "" ? " " + currentInput : "");
    } else {
        display.value = currentInput;
    }
}
```
