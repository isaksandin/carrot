var $ = require('jquery');
var Storage = require('./modules/storage.js');
var SysDefaults = require('./modules/sysDefaults.js');

var controller = document.querySelector('[data-depender]');

var settings = Storage.getSettings();

var lang = settings.language;
var pluginFiles = settings.pluginFiles;

window.Carrot = {
    funcKeywords: {},
    addFuncKeyword: function (funcKeyword) {
        this.funcKeywords = $.extend(this.funcKeywords, funcKeyword);
    }
};

function addScript(filename) {
    var el = document.createElement('script');
    el.src = filename + '.js';
    document.body.appendChild(el);
}

addScript('lang/' + lang, true);

for (var i = 0; i < pluginFiles.length; i += 1) {
    addScript('js/plugins/' + pluginFiles[i]);
}

addScript(controller.getAttribute('data-depender'));
