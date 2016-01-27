/*
    translate.js
        -A plug-in for Carrot

    Translate a short text with Google Translate.

    Isak Sandin (c) 2016
*/

Carrot.addFuncKeyword({
    tran: function (args) {
        var from = args.shift();
        var to = args.shift();
        var text = args.join(' ');

        window.location.href = 'https://translate.google.se/#' + from + '/' + to + '/' + text;
    }
});
