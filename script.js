let display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

function appendNumber(num) {
    if (shouldResetDisplay) {
        display.value = num;
        shouldResetDisplay = false;
    } else {
        // Prevent multiple decimal points
        if (num === '.' && currentInput.includes('.')) {
            return;
        }
        currentInput += num;
        display.value = currentInput;
    }
}

function appendOperator(op) {
    if (currentInput === '' && previousInput === '') {
        return;
    }

    if (operator !== null && currentInput !== '') {
        calculate();
    } else if (currentInput !== '') {
        previousInput = currentInput;
        currentInput = '';
    }

    operator = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (operator === null || currentInput === '' || previousInput === '') {
        return;
    }

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

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
                setTimeout(clearDisplay, 2000);
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    result = Math.round(result * 100000000) / 100000000;
    display.value = result;
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
        return;
    }
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
}