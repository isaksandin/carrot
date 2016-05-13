var $ = require('jquery');
var SysDefaults = require('./sysDefaults.js');
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

    getShortcuts: function () {
        var shortcuts;

        if (Storage.get(SysDefaults.storageKeys.shortcuts)) {
            shortcuts = Storage.get(SysDefaults.storageKeys.shortcuts);
        } else {
            shortcuts = SysDefaults.shortcuts;
            Storage.set(SysDefaults.storageKeys.shortcuts, SysDefaults.shortcuts);
        }

        return shortcuts;
    },

    getSearchKeywords: function () {
        var searchKeywords;

        if (Storage.get(SysDefaults.storageKeys.searchKeywords)) {
            searchKeywords = Storage.get(SysDefaults.storageKeys.searchKeywords);
        } else {
            searchKeywords = SysDefaults.searchKeywords;
            Storage.set(SysDefaults.storageKeys.searchKeywords, SysDefaults.searchKeywords);
        }

        return searchKeywords;
    },

    getSettings: function () {
        var settings;
        if (Storage.get(SysDefaults.storageKeys.settings)) {
            settings = Storage.get(SysDefaults.storageKeys.settings);
        } else {
            settings = SysDefaults.settings;
            Storage.set(SysDefaults.storageKeys.settings, SysDefaults.settings);
        }

        return settings;
    },

    getStats: function () {
        var stats;
        if (Storage.get(SysDefaults.storageKeys.stats)) {
            stats = Storage.get(SysDefaults.storageKeys.stats);
        } else {
            stats = SysDefaults.stats;
            Storage.set(SysDefaults.storageKeys.stats, SysDefaults.stats);
        }

        return stats;
    }
};

module.exports = Storage;
