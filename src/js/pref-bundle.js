webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*global require*/
	var $ = __webpack_require__(1);
	var Storage = __webpack_require__(2);
	var prefLang = __webpack_require__(5);
	var SysDefaults = __webpack_require__(3);
	var PrefFuncs = __webpack_require__(6);
	var Utils = PrefFuncs.utils;

	var Text = window.Text;

	prefLang.fillInText();

	var settings = Storage.getSettings();


	/* -- GENERAL SETTINGS -- */

	// DISPLAY CURRENT SEARCH ENGINE
	$('#default-search-engine').val(settings.searchEngine);

	// SELECT DEFAULT SEARCH ENGINE
	$('#default-search-engine').change(function () {
	    var choice = $('#default-search-engine option:selected').text();
	    settings.searchEngine = choice;
	    Storage.set(SysDefaults.storageKeys.settings, settings);
	});

	// DISPLAY CURRENT LANGUAGE
	$('#language').val(settings.language);

	// SELECT LANGUAGE
	$('#language').change(function () {
	    var choice = $('#language option:selected').val();
	    settings.language = choice;
	    Storage.set(SysDefaults.storageKeys.settings, settings);
	    window.location.reload();
	});


	/* -- SHORTCUT PREFERENCES -- */

	// ADD / CHANGE SHORTCUT
	$('#add-shortcut').on('click', function () {
	    PrefFuncs.add(SysDefaults.storageKeys.shortcuts, $('#shortcut-key-input').val(), $('#shortcut-value-input').val().split(', '), $('#add-shortcut-pane .response-output'));

	    $('#shortcut-key-input').val('');
	    $('#shortcut-value-input').val('');
	});

	// DELETE SHORTCUT
	$('#delete-shortcut').on('click', function () {

	    PrefFuncs.delete(SysDefaults.storageKeys.shortcuts, $('#delete-shortcut-key-input').val(), $('#delete-shortcut-pane .response-output'));
	    $('#delete-shortcut-key-input').val('');
	});

	// DELETE ALL SHORTCUTS
	$('#delete-all-shortcuts').on('click', function () {
	    PrefFuncs.deleteAll(SysDefaults.storageKeys.shortcuts, $('#delete-shortcut-pane .response-output'));
	});

	// SHOW STORED SHORTCUTS
	$('.show-stored-shortcuts').on('click', function () {

	    var $el = $(this);

	    PrefFuncs.showStoredShortcuts($el);
	});


	/* -- SEARCH KEYWORD PREFERENCES -- */

	// ADD / CHANGE SEARCH KEYWORD
	$('#add-search-keyword').on('click', function () {
	    PrefFuncs.add(SysDefaults.storageKeys.searchKeywords, $('#add-search-keyword-key-input').val(), $('#add-search-keyword-value-input').val(), $('#add-search-keyword-pane .response-output'));

	    $('#add-search-keyword-key-input').val('');
	    $('#add-search-keyword-value-input').val('');
	});

	// DELETE SEARCH KEYWORD
	$('#delete-search-keyword').on('click', function () {

	    PrefFuncs.delete(SysDefaults.storageKeys.searchKeywords, $('#delete-search-keywords-key-input').val(), $('#delete-search-keyword-pane .response-output'));
	    $('#delete-search-keywords-key-input').val('');
	});

	// DELETE ALL SEARCH KEYWORD
	$('#delete-all-search-keywords').on('click', function () {
	    PrefFuncs.deleteAll(SysDefaults.storageKeys.searchKeywords, $('#delete-search-keyword-pane .response-output'));
	});

	// SHOW STORED SEARCH KEYWORD
	$('.show-stored-search-keywords').on('click', function () {

	    var $el = $(this);

	    PrefFuncs.showStoredSearchKeywords($el);
	});


	/* -- PLACEHOLDER PREFERENCES -- */
	// ADDS CURRENT PLACEHOLDER AS VAL
	$('#change-placeholder-input').val(settings.placeholder);

	// CHANGE PLACEHOLDER TEXT
	$('#change-placeholder').on('click', function () {

	    PrefFuncs.changePlaceholder(settings, $('#change-placeholder-input').val(), $('#placeholder-pane .response-output'));

	});

	/* -- EXPORT / IMPORT PREFERENCES -- */

	// EXPORT THE STORED PREFERENCES
	$('#export-pref').on('click', function () {
	    var shortcuts = Storage.get(SysDefaults.storageKeys.shortcuts),
	        searchKeywords = Storage.get(SysDefaults.storageKeys.searchKeywords),
	        settings = Storage.get(SysDefaults.storageKeys.settings),
	        compressedPrefs = {
	            sc: shortcuts,
	            sk: searchKeywords,
	            s: settings
	        };

	    $('#export-pref-output').html('<textarea id="export-output">' + JSON.stringify(compressedPrefs) + '</textarea>');
	    $('#export-output').select();

	});

	// IMPORT THE PREFERENCES
	$('#import-pref').on('click', function () {

	    var input = $('#import-pref-input').val(),
	        compressedPrefs,
	        settings,
	        shortcuts,
	        searchKeywords,
	        response = {};

	    if (input === '' || input === undefined) {
	        response.type = 'emptyImport';
	        response.success = false;


	    } else {
	        response.type = 'imported';
	        response.success = true;

	        compressedPrefs = $.parseJSON(input);
	        settings = compressedPrefs.s;
	        shortcuts = compressedPrefs.sc;
	        searchKeywords = compressedPrefs.sk;

	        Storage.set(SysDefaults.storageKeys.shortcuts, shortcuts);
	        Storage.set(SysDefaults.storageKeys.searchKeywords, searchKeywords);
	        Storage.set(SysDefaults.storageKeys.settings, settings);

	        $('#change-placeholder-input').val(settings.placeholder);

	        $('#import-pref-input').val('');
	    }

	    Utils.closeAllOpenLists();
	    Utils.outputResponse(response, $('#import-pref-pane .response-output'));
	});


	/* -- PLUGIN FILES-- */

	// ADD / CHANGE PLUGIN FILE
	$('#add-plugin-file').on('click', function () {
	    var value = $('#add-plugin-file-input').val();
	    var pluginFiles = Storage.getSettings().pluginFiles;
	    var newSettings;

	    $('#add-plugin-file-input').val('');

	    pluginFiles.push(value);
	    newSettings = Storage.getSettings();
	    newSettings.pluginFiles = pluginFiles;

	    Storage.set(SysDefaults.storageKeys.settings, newSettings);

	    // NEEDS ERROR AND STATUS OUTPUTTING
	});




	/* -- CLEAR LOCALSTORAGE -- */

	// CLEAR EVERYTHING IN LOCALSTORAGE
	$('#clear-localStorage').on('click', function () {

	    Utils.warn(Text.WARN.LOCAL_DATA, function () {

	        var response = {
	            type: 'localDataCleared',
	            success: true
	        };

	        localStorage.clear();

	        Utils.outputResponse(response, $('#clear-localStorage-pane .response-output'));

	    });
	});


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*global require*/
	var $ = __webpack_require__(1);
	var Storage = __webpack_require__(2);
	var Text = window.Text;

	module.exports = {
	    fillInText: function () {

	        document.title = Text.SETTINGS;

	        var nav = function () {
	            $('a[href="#general-pane"]').text(Text.titles.GENERAL_SETTINGS);
	            $('a[href="#add-shortcut-pane"]').text(Text.titles.ADD_SHORTCUT);
	            $('a[href="#delete-shortcut-pane"]').text(Text.titles.DELETE_SHORTCUT);
	            $('a[href="#add-search-keyword-pane"]').text(Text.titles.ADD_SEARCH_KEYWORD);
	            $('a[href="#delete-search-keyword-pane"]').text(Text.titles.DELETE_SEARCH_KEYWORD);
	            $('a[href="#placeholder-pane"]').text(Text.titles.CHANGE_PLACEHOLDER_TEXT);
	            $('a[href="#export-pref-pane"]').text(Text.titles.EXPORT_SETTINGS);
	            $('a[href="#import-pref-pane"]').text(Text.titles.IMPORT_SETTINGS);
	            $('a[href="#add-plugin-file-pref-pane"]').text(Text.titles.ADD_PLUGIN_FILE);
	        },
	        general_pane = function () {
	            $('#general-pane h2').text(Text.general_pane.TITLE);
	            $('#general-pane h3').text(Text.general_pane.DESCRIPTION);
	            $('#general-pane div:nth-of-type(1) p').text(Text.general_pane.DEFAULT_SEARCH_ENGINE);
	            $('#general-pane div:nth-of-type(2) p').text(Text.general_pane.LANGUAGE);
	        },
	        add_shortcut_pane = function () {
	            $('#add-shortcut-pane h2').text(Text.add_shortcut_pane.TITLE);
	            $('#add-shortcut-pane h3').text(Text.add_shortcut_pane.DESCRIPTION);
	            $('#add-shortcut-pane div:nth-of-type(1) p').text(Text.add_shortcut_pane.SHORTCUT);
	            $('#add-shortcut-pane div:nth-of-type(2) p').text(Text.add_shortcut_pane.LINKS);
	            $('#add-shortcut').text(Text.buttons.ADD);
	            $('.show-stored-shortcuts').text(Text.buttons.SHOW_SHORTCUTS);
	        },
	        delete_shortcut_pane = function () {
	            $('#delete-shortcut-pane h2').text(Text.delete_shortcut_pane.TITLE);
	            $('#delete-shortcut-pane h3').text(Text.delete_shortcut_pane.DESCRIPTION);
	            $('#delete-shortcut-pane div:nth-of-type(1) p').text(Text.delete_shortcut_pane.SHORTCUT);
	            $('#delete-shortcut').text(Text.buttons.DELETE);
	            $('#delete-all-shortcuts').text(Text.buttons.DELETE_ALL);
	            $('.show-stored-shortcuts').text(Text.buttons.SHOW_SHORTCUTS);
	        },
	        add_search_keyword_pane = function () {
	            $('#add-search-keyword-pane h2').text(Text.add_search_keyword_pane.TITLE);
	            $('#add-search-keyword-pane h3').text(Text.add_search_keyword_pane.DESCRIPTION);
	            $('#add-search-keyword-pane div:nth-of-type(1) p').text(Text.add_search_keyword_pane.SEARCH_KEYWORD);
	            $('#add-search-keyword-pane div:nth-of-type(2) p').text(Text.add_search_keyword_pane.LINK);
	            $('#add-search-keyword').text(Text.buttons.ADD);
	            $('.show-stored-search-keywords').text(Text.buttons.SHOW_SEARCH_KEYWORD);
	        },
	        delete_search_keyword_pane = function () {
	            $('#delete-search-keyword-pane h2').text(Text.delete_search_keyword_pane.TITLE);
	            $('#delete-search-keyword-pane h3').text(Text.delete_search_keyword_pane.DESCRIPTION);
	            $('#delete-search-keyword-pane div:nth-of-type(1) p').text(Text.delete_search_keyword_pane.SEARCH_KEYWORD);
	            $('#delete-search-keyword').text(Text.buttons.DELETE);
	            $('#delete-all-search-keywords').text(Text.buttons.DELETE_ALL);
	            $('.show-stored-search-keywords').text(Text.buttons.SHOW_SEARCH_KEYWORD);
	        },
	        placeholder_pane = function () {
	            $('#placeholder-pane h2').text(Text.change_placeholder_text.TITLE);
	            $('#placeholder-pane h3').text(Text.change_placeholder_text.DESCRIPTION);
	            $('#placeholder-pane div:nth-of-type(1) p').text(Text.change_placeholder_text.PLACEHOLDER_TEXT);
	            $('#change-placeholder').text(Text.buttons.CHANGE);
	        },
	        export_pref_pane = function () {
	            $('#export-pref-pane h2').text(Text.export_settings.TITLE);
	            $('#export-pref-pane h3').text(Text.export_settings.DESCRIPTION);
	            $('#export-pref').text(Text.buttons.EXPORT);
	        },
	        import_pref_pane = function () {
	            $('#import-pref-pane h2').text(Text.import_settings.TITLE);
	            $('#import-pref-pane h3').text(Text.import_settings.DESCRIPTION);
	            $('#import-pref').text(Text.buttons.IMPORT);
	        },
	        add_plugin_file = function () {
	            $('#add-plugin-file-pref-pane h2').text(Text.add_plugin_file.TITLE);
	            $('#add-plugin-file-pref-pane h3').text(Text.add_plugin_file.DESCRIPTION);
	            $('#add-plugin-file').text(Text.buttons.ADD);
	            $('.show-stored-plugin-files').text(Text.buttons.SHOW_PLUGIN_FILES);
	        },
	        delete_all_local_data = function () {
	            $('#clear-localStorage').text(Text.buttons.DELETE_ALL_LOCAL_DATA);
	        };

	        $('h1').text(Text.SETTINGS_TITLE);

	        nav();
	        general_pane();
	        add_shortcut_pane();
	        delete_shortcut_pane();
	        add_search_keyword_pane();
	        delete_search_keyword_pane();
	        placeholder_pane();
	        export_pref_pane();
	        import_pref_pane();
	        add_plugin_file();
	        delete_all_local_data();
	    }
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*global require*/
	var $ = __webpack_require__(1);
	var Storage = __webpack_require__(2);
	var SysDefaults = __webpack_require__(3);
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

	    delete: function (type, key, $output) {

	        var stored = !Storage.get(type) ? {} : Storage.get(type),
	            response = {};

	        if (key === '') {
	            response.success = false;
	            response.type = 'empty';
	        } else {
	            if (stored.hasOwnProperty(key)) {
	                delete stored[key];
	                Storage.set(type, stored);

	                response.type = 'deleted';
	                response.success = true;

	            } else {
	                response.type = 'nonexistant';
	                response.success = false;
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


/***/ }
]);