var $ = require('jquery');
var Storage = require('./storage.js');
module.exports = {
    apply: function () {
        var primaryColor = Storage.getSettings().color;
        var values;

        $('[data-primary-color]').each(function () {
            values = $(this).attr('data-primary-color').split(' ');
            for (var i = 0; i < values.length; i += 1) {
                $(this).css(values[i], primaryColor);
            }
        });
    }
};
