/*global require*/
var $ = require('jquery');
var Storage = require('./storage.js');
var SysDefaults = require('./sysDefaults.js');
var Text = window.Text;


var Utils = {
    warn: function (type, callback) {
        var typeStr = type === SysDefaults.storageKeys.shortcuts ? Text.add_shortcut_pane.SHORTCUTS : type === SysDefaults.storageKeys.searchKeywords ? Text.add_search_keyword_pane.SEARCH_KEYWORDS : type,
            popup = '<h2 class="smalltext">' + Text.WARN.ARE_YOU_SURE_DELETE + typeStr + '?</h2><button class="main-button" id="warn-yes">' + Text.WARN.SURE + '</button><button class="main-button" id="warn-cancel">' + Text.WARN.CANCEL + '</button>';

        $('#warn').html(popup).css({
            display: 'block',
        });

        $('#warn-cancel').on('click', function () {
            $('#warn').css({
                display: 'none'
            });
            return false;
        });

        $('#warn-yes').on('click', function () {
            $('#warn').css({
                display: 'none'
            });
            callback();
        });
    },

    outputResponse: function (response, $output) {
        var message;

        $output.html('');

        if (response.success) {
            if (response.type === 'updated') {
                message = '\'' + response.subject + '\' ' + Text.STATUS.WAS_UPDATED;
            } else if (response.type === 'added') {
                message = '\'' + response.subject + '\' ' + Text.STATUS.WAS_ADDED;
            } else if (response.type === 'deleted') {
                message = '\'' + response.subject + '\' ' + Text.STATUS.WAS_DELETED;
            } else if (response.type === 'deletedAll') {
                message = Text.STATUS.ALL_DELETED;
            } else if (response.type === 'placeholderChanged') {
                message = Text.STATUS.PLACEHOLDER_CHANGED_TO;
            } else if (response.type === 'localDataCleared') {
                message = Text.STATUS.LOCAL_DATA_CLEARED;
            } else if (response.type === 'imported') {
                message = Text.STATUS.IMPORTED;
            }

            $output.html('<p class="success smalltext">' + message + '</p>');

        } else if (!response.success) {
            if (response.type === 'empty') {
                message = Text.ERROR.FILL_IN_FIELD;
            } else if (response.type === 'nonexistant') {
                message = ' \'' + response.subject + '\' ' + Text.ERROR.NONEXISTANT;
            } else if (response.type === 'emptyImport') {
                message = Text.ERROR.ENTER_IMPORTED_CODE;
            }

            $output.html('<p class="error smalltext">' + message + '</p>');

            $('.error').prepend('<img src="images/warningred.svg" style="width:15px">');
        }


        $output.css({
            opacity: 1
        });

        setTimeout(function () {
            $output.css({
                opacity: 0
            });
        }, 2500);

    },

    closeAllOpenLists: function () {
        $('.show-stored').data('is-showing', false);
        $('.show-stored-shortcuts').text(Text.buttons.SHOW_SHORTCUTS);
        $('.show-stored-search-keywords').text(Text.buttons.SHOW_SEARCH_KEYWORD);
        $('.show-stored').parent().siblings('ul').html('');
    }
};

module.exports = {

    add: function (type, key, value, $output) {
        var newEntry = {},
            stored = !Storage.get(type) ? {} : Storage.get(type),
            response = {};

        if (key === '') {
            response.type = 'empty';
            response.success = false;
        } else {
            if (stored.hasOwnProperty(key)) {
                response.type = 'updated';
                response.success = true;

            } else if (!stored.hasOwnProperty(key)) {
                response.type = 'added';
                response.success = true;
            }
            newEntry[key] = value;
            Storage.set(type, $.extend(stored, newEntry));

            response.subject = key;
        }
        Utils.closeAllOpenLists();
        Utils.outputResponse(response, $output);
    },

    delete: function (type, key, $output, settingsKey) {

        var stored,
            response = {};

        if (key === '') {
            response.success = false;
            response.type = 'empty';
        } else {
            if ($.isArray(type)) {
                stored = type;
                var index = stored.indexOf(key);
                var settings = Storage.get(SysDefaults.storageKeys.settings);

                if (index !== -1) {
                    stored.splice(index, 1);

                    settings.pluginFiles = stored;

                    Storage.set(SysDefaults.storageKeys.settings, settings);

                    response.type = 'deleted';
                    response.success = true;
                } else {
                    response.type = 'nonexistant';
                    response.success = false;
                }

            } else {
                stored = !Storage.get(type) ? {} : Storage.get(type);

                if (stored.hasOwnProperty(key)) {
                    delete stored[key];
                    Storage.set(type, stored);

                    response.type = 'deleted';
                    response.success = true;

                } else {
                    response.type = 'nonexistant';
                    response.success = false;
                }
            }
            response.subject = key;
        }

        Utils.closeAllOpenLists();
        Utils.outputResponse(response, $output);
    },

    deleteAll: function (type, $output) {

        Utils.warn(type, function () {

            var response = {
                type: 'deletedAll',
                success: true
            };

            if (type === SysDefaults.storageKeys.shortcuts) {
                Storage.set(type, SysDefaults.shortcuts);
            } else if (type === SysDefaults.storageKeys.searchKeywords) {
                Storage.set(type, SysDefaults.searchKeywords);
            }

            Utils.closeAllOpenLists();
            Utils.outputResponse(response, $output);

        });

    },

    showStoredShortcuts: function ($el) {

        var shortcutsObj = Storage.get(SysDefaults.storageKeys.shortcuts),
            $outputList = $el.parent().siblings('ul'),
            counter = 0,
            propertyNames = Object.getOwnPropertyNames(shortcutsObj),
            key;

        if ($el.data('is-showing') === false) {
            $el.text(Text.buttons.HIDE_SHORTCUTS);

            for (var property in shortcutsObj) {
                if (shortcutsObj.hasOwnProperty(property)) {
                    key = shortcutsObj[property];

                    $outputList.append('<li><h2>' + propertyNames[counter] + '</h2></li>');
                    for (var i = 0; i < key.length; i += 1) {
                        $outputList.append('<li>' + key[i] + '</li>');
                    }
                    $outputList.append('<br>');
                    counter += 1;
                }
            }
            $el.data('is-showing', true);

        } else if ($el.data('is-showing') === true) {
            $('.show-stored-shortcuts').text(Text.buttons.SHOW_SHORTCUTS);
            $outputList.html('');
            $el.data('is-showing', false);
        }

    },

    showStoredSearchKeywords: function ($el) {

        var searchKeywordsObj = Storage.get(SysDefaults.storageKeys.searchKeywords),
            $outputList = $el.parent().siblings('ul'),
            counter = 0,
            propertyNames = Object.getOwnPropertyNames(searchKeywordsObj),
            key;

        if ($el.data('is-showing') === false) {
            $el.text(Text.buttons.HIDE_SEARCH_KEYWORD);

            for (var property in searchKeywordsObj) {
                if (searchKeywordsObj.hasOwnProperty(property)) {
                    key = searchKeywordsObj[property];

                    $outputList.append('<li><h2>' + propertyNames[counter] + '</h2></li>');
                    $outputList.append('<li>' + key + '</li>');
                    $outputList.append('<br>');
                    counter += 1;
                }
            }
            $el.data('is-showing', true);

        } else if ($el.data('is-showing') === true) {
            $('.show-stored-search-keywords').text(Text.buttons.SHOW_SEARCH_KEYWORD);
            $outputList.html('');
            $el.data('is-showing', false);
        }

    },

    changePlaceholder: function (settings, placeholder, $output) {

        var response = {};

        if (placeholder === '') {
            response.type = 'empty';
            response.success = false;
        } else {
            settings.placeholder = placeholder;

            Storage.set(SysDefaults.storageKeys.settings, settings);

            response.type = 'placeholderChanged';
            response.success = true;
            response.subject = placeholder;
        }

        Utils.outputResponse(response, $output);

    },
    utils: Utils
};
