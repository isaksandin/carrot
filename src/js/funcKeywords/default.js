(function () {
    'use strict';
    
    var input = document.getElementById('input');
    
    function show(str) {
        input.value = str;
        input.select();
    }
    function clearInputField() {
        input.value = '';
    }

    var memory = {
            remember: function (text) {
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
        },

        eEs = {
            showImg: function (src) {
                $('body').append('<img src="' + src + '" style="display: block; margin: 10px auto 0;">');
            },
            eE: function (text) {
                if (text[0] === 'egg') {
                    eEs.showImg('http://www.northwestgoldcoast.com/wp-content/uploads/2014/03/easteregg.jpg');
                }
            }
        },

        utilities = {
            rng: function (params) {
                var min = parseInt(params[0], 10),
                    max = parseInt(params[1], 10),
                    amount = params[2] === undefined ? 1 : parseInt(params[2], 10),
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
            },

            translate: function (params) {
                var from = params.shift(),
                    to = params.shift(),
                    text = params.join(' ');

                window.location.href = 'https://translate.google.se/#' + from + '/' + to + '/' + text;
            }

        };


    window.projcarrot = {
            rem: memory.remember,
            recall: memory.recall,
            clear: memory.clear,
            rng: utilities.rng,
            easter: eEs.eE,
            tran: utilities.translate,
    };
}());