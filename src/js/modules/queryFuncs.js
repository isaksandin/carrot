var $ = require('jquery');
var Storage = require('./storage.js');

var shortcuts = Storage.getShortcuts();

var searchKeywords = Storage.getSearchKeywords();

var settings = Storage.getSettings();


var funcKeywords = Carrot.funcKeywords;

var open = function (url) {
    if (settings.openInNewTab === true) {
        window.open(url, '_blank');
    } else if (settings.openInNewTab === false) {
        window.location.href = url;
    }
};

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
                    open('https://www.bing.com/search?q=' + query.full);
                } else if (settings.searchEngine === 'DuckDuckGo') {
                    open('https://duckduckgo.com/?q=' + query.full);
                } else {
                    open('https://www.google.se/search?q=' + query.full);
                }

            },

            handleLink = function () {

                var topLevelDomains = ['com', 'org', 'net', 'se'];

                if (query.splitByColon[0] === 'http' || query.splitByColon[0] === 'https' || query.splitByColon[0] === 'file') {
                    open(query.full);
                    return true;

                } else if ($.inArray(query.splitByDot[query.splitByDot.length - 1], topLevelDomains) > -1) {
                    open('http://' + query.full);
                    return true;

                } else {
                    return false;
                }
            },

            handleShortcut = function () {

                if (shortcuts[query.full]) {

                    var sc = shortcuts[query.full];

                    if (sc.length === 1) {
                        open(sc[0]);

                    } else if (sc.length > 1) {
                        for (var i = 1; i < sc.length; i += 1) {
                            window.open(sc[i], '_blank');
                        }
                        open(sc[0]);
                    }
                    return true;

                } else {
                    return false;
                }
            },

            handleKeyword = function () {

                if (searchKeywords[query.firstWord]) {
                    query.splitBySpace.shift();
                    open(searchKeywords[query.firstWord].replace('{{query}}', query.splitBySpace.join().replace(/[,]/ig, '%20')));
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
