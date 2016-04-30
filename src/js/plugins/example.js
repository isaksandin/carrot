Carrot.addFuncKeyword({

    // Translate a short text with Google Translate.
    translate: function (args) {
        var from = args.shift();
        var to = args.shift();
        var text = args.join(' ');
        Carrot.open('https://translate.google.se/#' + from + '/' + to + '/' + text);
    },

    // A simple random number generator.
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
        Carrot.display(numbers, true);
    },

    // Save a short text or a word to localStorage...
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

    // ... and recall it...
    recall: function () {
        Carrot.display(localStorage.getItem('memory'), true);
    },

    // ... and delete it.
    clear: function (option) {
        if (option.shift() === 'memory') {
            localStorage.setItem('memory', '');
        }
        Carrot.input.value = '';
    }
});
