```javascript
const display = document.getElementById('display');

let currentInput = '';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
    if (operator !== null) {
        display.value = `${previousInput} ${operator} ${currentInput}`;
    } else {
        display.value = currentInput;
    }
}

function appendNumber(num) {
    // Start a new calculation after pressing =
    if (shouldResetDisplay) {
        currentInput = '';
        previousInput = '';
        operator = null;
        shouldResetDisplay = false;
    }

    // Prevent multiple decimal points
    if (num === '.') {
        if (currentInput.includes('.')) {
            return;
        }

        // If decimal is the first input, start with 0.
        if (currentInput === '') {
            currentInput = '0';
        }
    }

    // Prevent unnecessary multiple zeros at the beginning
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        currentInput += num;
    }

    updateDisplay();
}

function appendOperator(op) {
    // Do nothing if no number has been entered
    if (currentInput === '' && previousInput === '') {
        return;
    }

    // If an operator already exists and a second number is entered,
    // calculate the previous operation first
    if (operator !== null && currentInput !== '') {
        calculate();

        previousInput = currentInput;
        currentInput = '';
    } else if (currentInput !== '') {
        previousInput = currentInput;
        currentInput = '';
    }

    operator = op;
    shouldResetDisplay = false;

    updateDisplay();
}

function calculate() {
    if (
        operator === null ||
        previousInput === '' ||
        currentInput === ''
    ) {
        return;
    }

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+':
            result = prev + current;
            break;

        case '-':
            result = prev - current;
            break;

        case '*':
            result = prev * current;
            break;

        case '/':
            if (current === 0) {
                display.value = 'Cannot divide by 0';

                setTimeout(() => {
                    clearDisplay();
                }, 2000);

                return;
            }

            result = prev / current;
            break;

        default:
            return;
    }

    // Limit floating-point decimal errors
    result = Math.round(result * 100000000) / 100000000;

    // Show the complete calculation briefly
    display.value = `${previousInput} ${operator} ${currentInput} = ${result}`;

    // Store result for the next calculation
    currentInput = result.toString();
    previousInput = '';
    operator = null;
    shouldResetDisplay = true;
}

function clearDisplay() {
    display.value = '';
    currentInput = '';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
}

function deleteLast() {
    if (shouldResetDisplay) {
        clearDisplay();
        return;
    }

    if (currentInput !== '') {
        currentInput = currentInput.slice(0, -1);
    }

    updateDisplay();
}
```
