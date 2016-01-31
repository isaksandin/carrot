var $ = require('jquery');
var Storage = require('./modules/storage.js');
var queryFunctions = require('./modules/queryFuncs.js');

var customColor = require('./modules/customColor.js');
customColor.apply();

var Text = window.Text;

$('#input').keypress(function (e) {
    if (e.keyCode === 13) {
        queryFunctions($('#input').val()).analyseQuery();
    }
}).attr('placeholder', Storage.getSettings().placeholder);


var isShowingError = false;
window.setInterval(function () {
    if (!navigator.onLine) {
        if (isShowingError) {
            return false;
        } else {
            $('#network-error').html('<img src="images/warningred.svg"> ' + Text.ERROR.NO_INTERNET_CONNECTION);
            isShowingError = true;
        }
    } else {
        $('#network-error').html('');
        isShowingError = false;
    }
}, 1000);



Date.prototype.getWeek = function() {
    var firstOfJan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - firstOfJan) / 86400000) + firstOfJan.getDay())/7);
};

var d = new Date(),
    week = d.getWeek();
$('#week').html(Text.UTILITY.WEEK_ABBR + week);
