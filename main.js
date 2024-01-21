document.addEventListener('DOMContentLoaded', function () {
    const screenOne = document.querySelector('#screenOne');
    const numberButtons = document.querySelectorAll('.basic');
    const clearButton = document.querySelector('#clearButton');
    const deleteButton = document.querySelector('#deleteButton');
    const operatorButtons = document.querySelectorAll('.advance');
    const resultButton = document.querySelector('#result');
    const screenTwo = document.querySelector('#screenTwo');
    const decimalButton = document.querySelector('#decimal');

    let num1;
    let num2;
    let operator;
    let result = 0;
    let hasOperator = false;

    numberButtons.forEach(button => button.addEventListener('click', () => addNumber(button.textContent)));
    operatorButtons.forEach(button => button.addEventListener('click', () =>addOperator(button.textContent)));
    decimalButton.addEventListener('click', addDecimal);
    resultButton.addEventListener('click',  resultConditions);
    clearButton.addEventListener('click', clearScreen);
    deleteButton.addEventListener('click', deleteLastCharInScreen);

    window.addEventListener('keydown', handleKeyboardInput);

    function addNumber(number) {
        if (screenOne.textContent === '0') {
            screenOne.textContent = '';        
        } 
        screenOne.textContent += number;
        limitRange();
    };

    function addOperator(operator) {
        if (screenOne.textContent === '0') {
            screenOne.textContent = '0';        
        } else {
            if (screenOne.textContent.includes('+') || screenOne.textContent.includes('-') || screenOne.textContent.includes('x') || screenOne.textContent.includes('÷')) {
                hasOperator = true;
            } else {
                screenOne.textContent += operator;
            }
        }

        let checkOperator = screenOne.textContent.slice(-1);

        if (checkOperator === '.' || checkOperator === '+' || checkOperator === '-' || checkOperator === 'x' || checkOperator === '÷') {
            screenOne.textContent = screenOne.textContent;
        } 
        if (hasOperator) {
            screenOne.textContent = screenOne.textContent;
            alert("Only use one operator!")
        }
        
        limitRange();
    };

    function addDecimal() {
        if (screenOne.textContent === '0') {
            screenOne.textContent = '0';        
        }
        let checkOperator = screenOne.textContent.slice(-2, -1);

        if (checkOperator === '+' || checkOperator === '-' || checkOperator === 'x' || checkOperator === '÷') {
            screenOne.textContent = screenOne.textContent;
        }

        const numbers = screenOne.textContent.match(/\d+(\.\d+)?/g);
        let firstNum = numbers[0];
        let secondNum = numbers[1];
        let operatorForTwoNum = screenOne.textContent.match(/\+|-|x|÷/);
        if (operatorForTwoNum !== null) {
            operatorForTwoNum = operatorForTwoNum[0];
        };

        if (firstNum.includes(".")) {
            screenOne.textContent = screenOne.textContent;
        };
        if (!firstNum.includes(".")) {
            firstNum += ".";
            screenOne.textContent = firstNum;
        };
        
        if (secondNum.includes(".")) {
        screenOne.textContent = screenOne.textContent;
        }
        else if (!secondNum.includes(".")) {
            secondNum += ".";
            screenOne.textContent = firstNum + operatorForTwoNum + secondNum;
        };
        
        limitRange();
    };

    function clearScreen() {
        screenOne.textContent = '0';
        screenTwo.textContent = '';
    };

    function deleteLastCharInScreen() {
        if (screenOne.textContent !== '0') {
            screenOne.textContent = screenOne.textContent.slice(0, -1);
        };
        if (screenOne.textContent === '') {
            screenOne.textContent = '0'
        }
    };

    function resultConditions() {
        getCalculateElements();
        if (isNaN(num2)) {
            alert("Please type the second number!")
            screenOne.textContent = screenOne.textContent;
        } 
        if (!isNaN(num2)) {
            screenTwo.textContent = screenOne.textContent;
            calculateResult(num1, num2);
            hasOperator = false;
        }
    };

    function calculateResult() {
        switch (operator) {
            case '+':
                result = add(num1, num2);
                break;
            case '-':
                result = subtract(num1, num2);
                break;
            case 'x':
                result = multiply(num1, num2);
                break;
            case '÷':
                if (num2 === 0) {
                    alert("You cannot divide by 0!");
                    screenTwo.textContent = "";
                  } else {
                    result = divide(num1, num2);
                  }
                break;
            default:
                return null;
        };
        screenOne.textContent = result;
    };

    function getCalculateElements() {    
        const match = screenOne.textContent.match(/\d+(\.\d+)?/g);
        num1 = parseFloat(match[0]);
        num2 = parseFloat(match[1]);
        operator = screenOne.textContent.match(/\+|-|x|÷/);
        if (operator !== null) {
            operator = operator[0];
        };
    };
    
    function limitRange() {
        if (screenOne.textContent.length > 11) {
            screenOne.textContent = screenOne.textContent.slice(0, 10);
            alert('Too long!');
        }
    };

    function add(num1, num2) {
        return +(num1 + num2).toFixed(2);
    };

    function subtract(num1, num2) {
        return +(num1 - num2).toFixed(2);
    };
    
    function divide(num1, num2) {
        return +(num1 / num2).toFixed(2);
    };

    function  multiply(num1, num2) {
        return +(num1 * num2).toFixed(2);
    };
    
    function handleKeyboardInput(e) {
        if(e.key >= 0 && e.key <= 9) {
            addNumber(e.key); 
        } else if (e.key === '.') {
            addDecimal();
        } else if (e.key === '=' || e.key === 'Enter') {
            e.preventDefault();
            resultConditions();
        } else if (e.key === '+' || e.key === '-') {
            addOperator(e.key);
        } else if (e.key === '*' || e.key === 'x') {
            addOperator('x');
        } else if (e.key === '/' || e.key === '÷') {
            addOperator('÷');
        } else if (e.key === 'Backspace') {
            deleteLastCharInScreen();
        }else if (e.key === 'Escape') {
            clearScreen();
        }
    };

});

