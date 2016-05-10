var Storage = require('./storage.js');
var SysDefaults = require('./sysDefaults.js');

var History = {
    query: function () {
        return Storage.get(SysDefaults.storageKeys.history);
    },
    update: function (query) {
        Storage.set(SysDefaults.storageKeys.history, query);
    }
};

module.exports = History;
