webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var Storage = __webpack_require__(2);
	var queryFunctions = __webpack_require__(4);

	var customColor = __webpack_require__(5);
	customColor.apply();

	var Text = window.Text;


	$('#input').keypress(function (e) {
	    if (e.keyCode === 13) {

	        queryFunctions($('#input').val()).analyseQuery();

	        return false;
	    }
	}).css({
	    border: '1px solid ' + Storage.getSettings().color,
	    top: $(window).height() - $(window).height() / 1.45,
	    opacity: '1'
	}).attr('placeholder', Storage.getSettings().placeholder);


	$('#error-output').css({
	    top: $(window).height() - $(window).height() / 1.5
	});

	function displayNetworkError() {
	    $('#error-output').html('<p id="network-error"><img src="images/warningred.svg"> ' + Text.ERROR.NO_INTERNET_CONNECTION + '</p>');
	}
	function removeNetworkError() {
	    $('#error-output').html('');
	}
	function checkInternetConn() {
	    if (!navigator.onLine) {
	        displayNetworkError();
	    } else {
	        removeNetworkError();
	    }
	}

	checkInternetConn();



	Date.prototype.getWeek = function() {
	    var firstOfJan = new Date(this.getFullYear(), 0, 1);
	    return Math.ceil((((this - firstOfJan) / 86400000) + firstOfJan.getDay())/7);
	};

	var d = new Date(),
	    week = d.getWeek();
	$('#week').html(Text.UTILITY.WEEK_ABBR + week);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var Storage = __webpack_require__(2);

	var shortcuts = Storage.getShortcuts();

	var searchKeywords = Storage.getSearchKeywords();

	var settings = Storage.getSettings();

	var funcKeywords = window.projcarrot.funcKeywords;

	var queryFunctions = function (input) {

	        var query = {
	                full: input,
	                splitBySpace: input.split(' '),
	                splitByDot: input.split('.'),
	                splitByColon: input.split(':'),
	                firstWord: input.split(' ').shift()
	            },

	            defaultWebSearch = function () {

	                if (settings.searchEngine === 'Bing') {
	                    window.location.href = 'https://www.bing.com/search?q=' + query.full;
	                } else if (settings.searchEngine === 'DuckDuckGo') {
	                    window.location.href = 'https://duckduckgo.com/?q=' + query.full;
	                } else {
	                    window.location.href = 'https://www.google.se/search?q=' + query.full;
	                }

	            },

	            handleLink = function () {

	                var topLevelDomains = ['com', 'org', 'net', 'se'];

	                if (query.splitByColon[0] === 'http' || query.splitByColon[0] === 'https' || query.splitByColon[0] === 'file') {
	                    window.location.href = query.full;
	                    return true;

	                } else if ($.inArray(query.splitByDot[query.splitByDot.length - 1], topLevelDomains) > -1) {
	                    window.location.href = 'http://' + query.full;
	                    return true;

	                } else {
	                    return false;
	                }
	            },

	            handleShortcut = function () {

	                if (shortcuts[query.full]) {

	                    var sc = shortcuts[query.full];

	                    if (sc.length === 1) {
	                        window.location.href = sc[0];

	                    } else if (sc.length > 1) {
	                        for (var i = 1; i < sc.length; i += 1) {
	                            window.location.href = sc[0];
	                            window.open(sc[i], '_blank');
	                        }
	                    }
	                    return true;

	                } else {
	                    return false;
	                }
	            },

	            handleKeyword = function () {

	                if (searchKeywords[query.firstWord]) {
	                    query.splitBySpace.shift();
	                    window.location.href = searchKeywords[query.firstWord].replace('{{query}}', query.splitBySpace.join().replace(/[,]/ig, '%20'));
	                    return true;

	                } else if (funcKeywords[query.firstWord]) {
	                    query.splitBySpace.shift();
	                    funcKeywords[query.firstWord](query.splitBySpace);
	                    return true;

	                } else {
	                    return false;
	                }

	            },

	            analyseQuery = function () {

	                if (!handleLink()) {
	                    if (!handleShortcut()) {
	                        if (!handleKeyword()) {
	                            defaultWebSearch();
	                        }
	                    }
	                }
	            };

	        return {
	            analyseQuery: analyseQuery
	        };
	    };
	module.exports = queryFunctions;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var Storage = __webpack_require__(2);
	module.exports = {
	    apply: function () {
	        var primaryColor = Storage.getSettings().color;
	        var values;

	        $('[data-primary-color]').each(function () {
	            values = $(this).attr('data-primary-color').split(' ');
	            for (var i = 0; i < values.length; i += 1) {
	                $(this).css(values[i], primaryColor);
	            }
	        });
	    }
	};


/***/ }
]);