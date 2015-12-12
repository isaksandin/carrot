/*global require*/
var $ = require('jquery');
var Storage = require('./modules/storage.js');
var queryFunctions = require('./modules/queryFuncs.js');

var Text = window.Text;


$('#input').keypress(function (e) {
    if (e.keyCode === 13) {

        if (!navigator.onLine) {
            displayNetworkError();
        } else {
            queryFunctions($('#input').val()).analyseQuery();
        }
        return false;
    }
}).css({
    border: '1px solid ' + Storage.getSettings().color,
    top: $(window).height() - $(window).height() / 1.45,
    opacity: '1'
}).attr('placeholder', Storage.getSettings().placeholder);


$('#error-output').css({
    top: $(window).height() - $(window).height() / 1.5
});

function displayNetworkError() {

    if (navigator.onLine) {
        $('#error-output').html('');
    } else {
        $('#error-output').html('<p id="network-error"><img src="images/warningred.svg"> ' + Text.ERROR.NO_INTERNET_CONNECTION + '</p>');
        setTimeout(displayNetworkError, 500);
    }

}

Date.prototype.getWeek = function() {
    var firstOfJan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - firstOfJan) / 86400000) + firstOfJan.getDay())/7);
};
//tjena
var d = new Date(),
    week = d.getWeek();
$('#week').html(Text.UTILITY.WEEK_ABBR + week);
