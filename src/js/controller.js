var Storage = require('./modules/storage.js');
var SysDefaults = require('./modules/sysDefaults.js');

var controller = document.querySelector('[data-depender]');

var lang = Storage.get(SysDefaults.storageKeys.settings).language;

function addScript(filename) {

    var el = document.createElement('script');

    el.src = filename + '.js';

    document.body.appendChild(el);
}
addScript('lang/' + lang, true);
addScript('js/funcKeywords/default');
addScript(controller.getAttribute('data-depender'));