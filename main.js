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

    numberButtons.forEach(button => button.addEventListener('click', () => {
        if (screenOne.textContent === '0') {
            screenOne.textContent = '';        
        } 
        screenOne.textContent += button.innerHTML;
        limitRange();
    }));

    operatorButtons.forEach(button => button.addEventListener('click', () => {
        if (screenOne.textContent === '0') {
            screenOne.textContent = '0';        
        } else {
            screenOne.textContent += button.innerHTML;
        }

        let checkOperator = screenOne.textContent.slice(-2, -1);

        if (checkOperator === '.' || checkOperator === '+' || checkOperator === '-' || checkOperator === 'x' || checkOperator === '÷') {
            screenOne.textContent = screenOne.textContent.slice(0, -1);
        } 
        if (hasOperator) {
            screenOne.textContent = screenOne.textContent;
            alert("Only use one operator!")
        }
        if (screenOne.textContent.includes('+') || screenOne.textContent.includes('-') || screenOne.textContent.includes('x') || screenOne.textContent.includes('÷')) {
            hasOperator = true;
        }
        limitRange();
    }));

    decimalButton.addEventListener('click', () => {
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
        if (secondNum !== null) {
            if (secondNum.includes(".")) {
            screenOne.textContent = screenOne.textContent;
            }
            else if (!secondNum.includes(".")) {
                secondNum += ".";
                screenOne.textContent = firstNum + operatorForTwoNum + secondNum;
            };
        };
        limitRange();
    });

    clearButton.addEventListener('click', clearScreen);
    function clearScreen() {
        screenOne.textContent = '0';
        screenTwo.textContent = '';
    };

    deleteButton.addEventListener('click', deleteLastCharInScreen);
    function deleteLastCharInScreen () {
        if (screenOne.textContent !== '0') {
            screenOne.textContent = screenOne.textContent.slice(0, -1);
        };
        if (screenOne.textContent === '') {
            screenOne.textContent = '0'
        }
    };

    resultButton.addEventListener('click', () => {
        getCalculateElements();
        if (num2 === null) {
            alert("Please type the second number!")
            screenOne.textContent = screenOne.textContent;
        } 
        if (num2 !== null) {
            screenTwo.textContent = screenOne.textContent;
            calculateResult(num1, num2);
            hasOperator = false;
        }
        if (operator === null) {
            screenOne.textContent = screenOne.textContent;
            hasOperator = false;
        }
        
    })

    function getCalculateElements() {    
        const match = screenOne.textContent.match(/\d+(\.\d+)?/g);
        num1 = parseFloat(match[0]);
        num2 = parseFloat(match[1]);
        operator = screenOne.textContent.match(/\+|-|x|÷/)[0];
        if(operator === null) {
            alert('Please type operator and second number!');
        }
        if(num2 === null) {
            alert('Please type second number!');
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
    
    function limitRange() {
        if (screenOne.textContent.length > 11) {
            screenOne.textContent = screenOne.textContent.slice(0, 10);
            alert('Too long!');
        }
    };

    function add(num1, num2) {
        return  num1 + num2;
    };

    function subtract(num1, num2) {
        return  num1 - num2;
    };
    
    function divide(num1, num2) {
        return +(num1 / num2).toFixed(2);
    };

    function  multiply(num1, num2) {
        return  num1 * num2;
    };
});

