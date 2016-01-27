/*
    rng.js
        -A plug-in for Carrot

    A simple random number generator.

    Isak Sandin (c) 2016
*/

var input = document.getElementById('input');

function show(str) {
    input.value = str;
    input.select();
}

Carrot.addFuncKeyword({
    rng: function (args) {
        var min = parseInt(args[0], 10),
            max = parseInt(args[1], 10),
            amount = args[2] === undefined ? 1 : parseInt(args[2], 10),
            numbers = '',
            i;
        for (i = 0; i < amount; i += 1) {
            if (i === amount - 1 || amount === null) {
                numbers += Math.floor(Math.random() * (max - min)) + min;
            } else {
                numbers += Math.floor(Math.random() * (max - min)) + min + ' ';
            }
        }
        show(numbers);
    }
});
