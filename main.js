document.addEventListener('DOMContentLoaded', function () {
    const screen = document.querySelector('#screen');
    const numberButtons = document.querySelectorAll('.basic');
    const clearButton = document.querySelector('#clearButton');
    const deleteButton = document.querySelector('#deleteButton');
    const operatorButtons = document.querySelectorAll('.advance');
    const resultButton = document.querySelector('#result');

    let num1;
    let num2;
    let operator;
    let result = 0;

    numberButtons.forEach(button => button.addEventListener('click', () => {
        if (screen.textContent === '0') {
            screen.textContent = '';        
        } 
        screen.textContent += button.innerHTML;
    }));

    operatorButtons.forEach(button => button.addEventListener('click', () => {

        if (screen.textContent === '0') {
            screen.textContent = '0';        
        } else {
            screen.textContent += button.innerHTML;
        }

        let lastChar = screen.textContent.slice(-2, -1);

        if (lastChar === '.' || lastChar === '+' || lastChar === '-' || lastChar === 'x' || lastChar === '÷') {
            screen.textContent = screen.textContent.slice(0, -1);
        }
    }));

    clearButton.addEventListener('click', clearScreen);
    function clearScreen() {
        screen.textContent = '0';
    };

    deleteButton.addEventListener('click', deleteLastCharInScreen);
    function deleteLastCharInScreen () {
        if (screen.textContent !== '0') {
            screen.textContent = screen.textContent.slice(0, -1);
        };
        if (screen.textContent === '') {
            screen.textContent = '0'
        }
    };

    resultButton.addEventListener('click', () => {
        getCalculateElements();
        calculateResult(num1, num2)
    })

    function getCalculateElements() {    
        const match = screen.textContent.match(/\d+(\.\d+)/g);
        num1 = parseFloat(match[0]);
        num2 = parseFloat(match[1]);
        operator = screen.textContent.match(/\+|-|x|÷/)[0];
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
                if (b === 0) return null
                else return divide(num1, num2);
            default:
                return null;
        };
        screen.textContent = result;
    };
    

    function add(num1, num2) {
        return num1 + num2;
    };

    function subtract(num1, num2) {
        return num1 - num2;
    };
    
    function divide(num1, num2) {
        return num1 / num2;
    };

    function  multiply(num1, num2) {
        return num1 * num2;
    };

});

