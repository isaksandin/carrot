var $ = require('jquery');
var Storage = require('./storage.js');
var randomColor = require('randomcolor');
module.exports = {
    apply: function () {
        var primaryColor = Storage.getSettings().color;
        var values;

        if (primaryColor.indexOf('random') > -1) {
            if (primaryColor.indexOf('random ') > -1) {
                var hue = primaryColor.replace('random ', '');
                primaryColor = randomColor({
                    hue: hue
                });
            } else {
                primaryColor = randomColor();
            }
        }

        $('[data-primary-color]').each(function () {
            values = $(this).attr('data-primary-color').split(' ');
            for (var i = 0; i < values.length; i += 1) {
                $(this).css(values[i], primaryColor);
            }
        });
    }
};
