var $ = require('jquery');
var Storage = require('./storage.js');
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
            $('a[href="#delete-plugin-file-pref-pane"]').text(Text.titles.DELETE_PLUGIN_FILE);
        },
        general_pane = function () {
            $('#general-pane h2').text(Text.general_pane.TITLE);
            $('#general-pane h3').text(Text.general_pane.DESCRIPTION);
            $('#general-pane .input-wrapper:nth-of-type(2) p').text(Text.general_pane.CHANGE_PRIMARY_COLOR);
            $('#general-pane .smallDouble .input-wrapper:nth-of-type(1) p').text(Text.general_pane.DEFAULT_SEARCH_ENGINE);
            $('#general-pane .smallDouble .input-wrapper:nth-of-type(2) p').text(Text.general_pane.LANGUAGE);
            $('#change-primary-color').text(Text.buttons.CHANGE);
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
            $('.show-stored-plugin-files').text(Text.buttons.SHOW_PLUGIN_FILE_NAMES);
        },
        delete_plugin_file = function () {
            $('#delete-plugin-file-pref-pane h2').text(Text.delete_plugin_file.TITLE);
            $('#delete-plugin-file-pref-pane h3').text(Text.delete_plugin_file.DESCRIPTION);
            $('#delete-plugin-file').text(Text.buttons.DELETE);
            $('.show-stored-plugin-files').text(Text.buttons.SHOW_PLUGIN_FILE_NAMES);
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
        delete_plugin_file();
        delete_all_local_data();
    }
};
