webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var Storage = __webpack_require__(2);
	var SysDefaults = __webpack_require__(3);

	var controller = document.querySelector('[data-depender]');

	var settings = Storage.getSettings();

	var lang = settings.language;
	var pluginFiles = settings.pluginFiles;

	window.Carrot = {
	    input: document.getElementById('input'),
	    funcKeywords: {},
	    addFuncKeyword: function (funcKeyword) {
	        this.funcKeywords = $.extend(this.funcKeywords, funcKeyword);
	    },
	    display: function (str, select) {
	        this.input.value = str;
	        if (select) {
	            this.input.select();
	        }
	    },
	    open: function (url) {
	        if (settings.openInNewTab === true) {
	            window.open(url, '_blank');
	        } else if (settings.openInNewTab === false) {
	            window.location.href = url;
	        }
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


/***/ }
]);