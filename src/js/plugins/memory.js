/*
    memory.js
        -A plug-in for Carrot

    Save a short text or a word to localStorage.

    Isak Sandin (c) 2016
*/

var input = document.getElementById('input');

function show(str) {
    input.value = str;
    input.select();
}
function clearInputField() {
    input.value = '';
}

Carrot.addFuncKeyword({
    rem: function (text) {
        var str = text.join().replace(/[,]/ig, ' '),
            memory = '';

        if (localStorage.getItem('memory') === null || localStorage.getItem('memory') === '') {
            memory += str;
            localStorage.setItem('memory', memory);
        } else {
            memory = localStorage.getItem('memory') + ' ' + str;
            localStorage.setItem('memory', memory);
        }
        clearInputField();
    },
    recall: function () {
        show(localStorage.getItem('memory'));
    },
    clear: function (option) {
        if (option.shift() === 'memory') {
            localStorage.setItem('memory', '');
        }
        clearInputField();
    }
});
