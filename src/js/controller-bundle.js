webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Storage = __webpack_require__(2);
	var SysDefaults = __webpack_require__(3);

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

/***/ }
]);