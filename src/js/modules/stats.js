var Storage = require('./storage.js');
var SysDefaults = require('./sysDefaults.js');

var currentStats = Storage.get(SysDefaults.storageKeys.stats);
var stats = {
    current: currentStats,
    reset: function () {
        Storage.set(SysDefaults.storageKeys.stats, {
            count: 0,
            lastVisit: null,
            resetDate: new Date()
        });
    },
    incrementCount: function () {
        currentStats.count += 1;
        Storage.set(SysDefaults.storageKeys.stats, currentStats);
    },
    daysSinceReset: function () {
        var resetDate = new Date(currentStats.resetDate);
        var now = new Date();
        var oneDay = 24 * 60 * 60 * 1000;
        return Math.round(Math.abs((resetDate.getTime() - now.getTime()) / (oneDay))) + 1;
    },
    averageUsage: function () {
        return currentStats.count / this.daysSinceReset();
    },
    updateLastVisit: function () {
        currentStats.lastVisit = new Date();
        Storage.set(SysDefaults.storageKeys.stats, currentStats);
    }
};

module.exports = stats;
