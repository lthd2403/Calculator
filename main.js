document.addEventListener('DOMContentLoaded', function () {
    const screen = document.querySelector('#screen');
    const allButtons = document.querySelectorAll('button');
    console.log(allButtons);


    allButtons.forEach(button => button.addEventListener('click', () => {
        if (screen.textContent === '0') {
            screen.textContent = "";
        };
        
        screen.textContent += button.textContent;
    }));
});