var Storage = require('./storage.js');
var SysDefaults = require('./sysDefaults.js');

var stats = {
    current: Storage.get(SysDefaults.storageKeys.stats),
    reset: function () {
        Storage.set(SysDefaults.storageKeys.stats, {
            count: 0,
            lastVisit: null,
            resetDate: new Date()
        });
    },
    incrementCount: function () {
        this.current.count += 1;
        Storage.set(SysDefaults.storageKeys.stats, this.current);
    },
    daysSinceReset: function () {
        var resetDate = new Date(this.current.resetDate);
        var now = new Date();
        var oneDay = 24 * 60 * 60 * 1000;
        return Math.round(Math.abs((resetDate.getTime() - now.getTime()) / (oneDay)));
    },
    averageUsage: function () {
        return this.current.count / this.daysSinceReset();
    },
    updateLastVisit: function () {
        this.current.lastVisit = new Date();
        Storage.set(SysDefaults.storageKeys.stats, this.current);
    }
};

module.exports = stats;
