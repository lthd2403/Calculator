document.addEventListener('DOMContentLoaded', function () {
    const screen = document.querySelector('#screen');
    const numberButtons = document.querySelectorAll('.basic');
    const clearButton = document.querySelector('#clearButton');
    const deleteButton = document.querySelector('#deleteButton');
    const operatorButtons = document.querySelectorAll('.advance');

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


});

