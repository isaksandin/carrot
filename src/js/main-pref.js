var $ = require('jquery');
var Storage = require('./modules/storage.js');
var prefLang = require('./modules/pref-lang.js');
var SysDefaults = require('./modules/sysDefaults.js');
var PrefFuncs = require('./modules/prefFuncs.js');
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

    PrefFuncs.add({
        type: SysDefaults.storageKeys.shortcuts,
        key: $('#shortcut-key-input').val(),
        value: $('#shortcut-value-input').val().split(', '),
        responseOutput: $('#add-shortcut-pane .response-output')
    });

    $('#shortcut-key-input').val('');
    $('#shortcut-value-input').val('');
});

// DELETE SHORTCUT
$('#delete-shortcut').on('click', function () {

    PrefFuncs.delete({
        type: SysDefaults.storageKeys.shortcuts,
        key: $('#delete-shortcut-key-input').val(),
        responseOutput: $('#delete-shortcut-pane .response-output')
    });

    $('#delete-shortcut-key-input').val('');
});

// DELETE ALL SHORTCUTS
$('#delete-all-shortcuts').on('click', function () {
    PrefFuncs.deleteAll({
        type: SysDefaults.storageKeys.shortcuts,
        responseOutput: $('#delete-shortcut-pane .response-output')
    });
});

// SHOW STORED SHORTCUTS
$('.show-stored-shortcuts').on('click', function () {

    var $el = $(this);

    PrefFuncs.showStoredShortcuts($el);
});


/* -- SEARCH KEYWORD PREFERENCES -- */

// ADD / CHANGE SEARCH KEYWORD
$('#add-search-keyword').on('click', function () {

    PrefFuncs.add({
        type: SysDefaults.storageKeys.searchKeywords,
        key: $('#add-search-keyword-key-input').val(),
        value: $('#add-search-keyword-value-input').val(),
        responseOutput: $('#add-search-keyword-pane .response-output')
    });

    $('#add-search-keyword-key-input').val('');
    $('#add-search-keyword-value-input').val('');
});

// DELETE SEARCH KEYWORD
$('#delete-search-keyword').on('click', function () {

    PrefFuncs.delete({
        type: SysDefaults.storageKeys.searchKeywords,
        key: $('#delete-search-keywords-key-input').val(),
        responseOutput: $('#delete-search-keyword-pane .response-output')
    });

    $('#delete-search-keywords-key-input').val('');
});

// DELETE ALL SEARCH KEYWORD
$('#delete-all-search-keywords').on('click', function () {

    PrefFuncs.deleteAll({
        type: SysDefaults.storageKeys.searchKeywords,
        responseOutput: $('#delete-search-keyword-pane .response-output')
    });
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

    PrefFuncs.changePlaceholder({
        value: $('#change-placeholder-input').val(),
        responseOutput: $('#placeholder-pane .response-output')
    });
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

    PrefFuncs.add({
        type: Storage.getSettings().pluginFiles,
        value: $('#add-plugin-file-input').val(),
        responseOutput: $('#add-plugin-file-pref-pane .response-output'),
        settingsKey: 'pluginFiles'
    });

    $('#add-plugin-file-input').val('');

});

// DELETE PLUGIN FILE
$('#delete-plugin-file').on('click', function () {

    PrefFuncs.delete({
        type: Storage.getSettings().pluginFiles,
        key: $('#delete-plugin-file-input').val(),
        responseOutput: $('#delete-plugin-file-pref-pane .response-output'),
        settingsKey: 'pluginFiles'
    });

    $('#delete-plugin-file-input').val('');
});

// SHOW STORED PLUGIN FILE NAMES
$('.show-stored-plugin-files').on('click', function () {
    var $el = $(this);
    PrefFuncs.showStoredPluginNames($el);
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
