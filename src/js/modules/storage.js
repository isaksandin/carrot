var $ = require('jquery');
var SysDefaults = require('./sysDefaults.js');

function getFunctionFactory(type) {
    return function () {
        var obj;
        if (Storage.get(SysDefaults.storageKeys[type])) {
            obj = Storage.get(SysDefaults.storageKeys[type]);
        } else {
            obj = SysDefaults[type];
            Storage.set(SysDefaults.storageKeys[type], SysDefaults[type]);
        }
        return obj;
    };
}

var Storage = {

    set: function (key, value, callback) {
        value = JSON.stringify(value);
        localStorage.setItem(key, value);

        if ($.isFunction(callback)) {
            callback();
        }
    },

    get: function (key) {
        var value = localStorage.getItem(key);
        return $.parseJSON(value);
    },

    getShortcuts: getFunctionFactory('shortcuts'),

    getSearchKeywords: getFunctionFactory('searchKeywords'),

    getSettings: getFunctionFactory('settings'),

    getStats: getFunctionFactory('stats')
};

module.exports = Storage;
