const display = document.getElementById("display");

let currentInput = "";
let previousInput = "";
let operator = null;

function appendNumber(num) {
    // If starting a new number
    currentInput += num;

    // Prevent multiple decimal points
    if (num === "." && currentInput.split(".").length > 2) {
        currentInput = currentInput.slice(0, -1);
        return;
    }

    updateDisplay();
}

function appendOperator(op) {
    // No number entered
    if (currentInput === "" && previousInput === "") {
        return;
    }

    // If changing operator before entering second number
    if (previousInput !== "" && currentInput === "") {
        operator = op;
        updateDisplay();
        return;
    }

    // If there is already a complete calculation
    if (previousInput !== "" && currentInput !== "" && operator !== null) {
        calculate();
    }

    previousInput = currentInput;
    currentInput = "";
    operator = op;

    updateDisplay();
}

function calculate() {
    if (
        previousInput === "" ||
        currentInput === "" ||
        operator === null
    ) {
        return;
    }

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    let result;

    switch (operator) {
        case "+":
            result = prev + current;
            break;

        case "-":
            result = prev - current;
            break;

        case "*":
            result = prev * current;
            break;

        case "/":
            if (current === 0) {
                display.value = "Cannot divide by 0";
                clearValues();
                return;
            }
            result = prev / current;
            break;
    }

    // Remove floating-point precision errors
    result = Math.round(result * 100000000) / 100000000;

    // Show result
    display.value = result;

    currentInput = result.toString();
    previousInput = "";
    operator = null;
}

function updateDisplay() {
    if (operator !== null) {
        display.value = previousInput + " " + operator + " " + currentInput;
    } else {
        display.value = currentInput;
    }
}

function clearDisplay() {
    clearValues();
    display.value = "";
}

function clearValues() {
    currentInput = "";
    previousInput = "";
    operator = null;
}

function deleteLast() {
    if (currentInput !== "") {
        currentInput = currentInput.slice(0, -1);
    }

    updateDisplay();
}
```
