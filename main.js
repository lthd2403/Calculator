document.addEventListener('DOMContentLoaded', function () {
    const screen = document.querySelector('#screen');
    const allButtons = document.querySelectorAll('.basic');
    const clearButton = document.querySelector('#clearButton');
    const deleteButton = document.querySelector('#deleteButton');

    allButtons.forEach(button => button.addEventListener('click', () => {
        let lastChar = screen.textContent.slice(-1);

        if (screen.textContent === '0') {
            screen.textContent = '';
        }

        else if (lastChar === '.' && lastChar === '+' && lastChar === '-' && lastChar === 'x' && lastChar === '÷') {
            screen.textContent = screen.textContent;
        }

        else {
            screen.textContent += button.innerHTML;
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

