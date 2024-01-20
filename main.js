document.addEventListener('DOMContentLoaded', function () {
    const screen = document.querySelector('#screen');
    const allButtons = document.querySelectorAll('.basic');
    const clearButton = document.querySelector('#clearButton');
    const deleteButton = document.querySelector('#deleteButton');

    allButtons.forEach(button => button.addEventListener('click', () => {
        if (screen.textContent === '0') {
            screen.textContent = '';
        };
        screen.textContent += button.innerHTML;
    }));

    clearButton.addEventListener('click', clearScreen);
    function clearScreen() {
        screen.textContent = '0';
    };

    deleteButton.addEventListener('click', deleteOneElementInScreen);
    function deleteOneElementInScreen () {
        screen.textContent = screen.textContent.slice(0, -1);
    };
});

