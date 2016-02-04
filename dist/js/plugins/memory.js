/*
    memory.js
        -A plug-in for Carrot

    Save a short text or a word to localStorage.

    Isak Sandin (c) 2016
*/
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
        Carrot.input.value = '';
    },
    recall: function () {
        Carrot.display(localStorage.getItem('memory'), true);
    },
    clear: function (option) {
        if (option.shift() === 'memory') {
            localStorage.setItem('memory', '');
        }
        Carrot.input.value = '';
    }
});
