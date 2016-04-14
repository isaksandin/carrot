webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var Storage = __webpack_require__(2);
	var prefLang = __webpack_require__(7);
	var SysDefaults = __webpack_require__(3);
	var PrefFuncs = __webpack_require__(8);
	var Utils = PrefFuncs.utils;

	var customColor = __webpack_require__(5);
	$('.input-wrapper p').attr('data-primary-color', 'color');
	$('.main-button').attr('data-primary-color', 'background');
	customColor.apply();

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

	// ADDS CURRENT PRIMARY COLOR AS VAL
	$('#primary-color-input').val(settings.color);

	// CHANGE PRIMARY COLOR
	$('#change-primary-color').on('click', function () {
	    PrefFuncs.changePrimaryColor({
	        value: $('#primary-color-input').val(),
	        responseOutput: $('#general-pane .response-output')
	    });
	});

	// DISPLAY CURRENT OPEN IN NEW TAB SETTING
	$('#open-in-new-tab').attr('checked', settings.openInNewTab);

	// TOGGLE OPEN IN NEW TAB SETTING
	$('#open-in-new-tab').change(function (e) {
	    var settings = Storage.getSettings();
	    settings.openInNewTab = this.checked;

	    Storage.set(SysDefaults.storageKeys.settings, settings);
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
	        value: $('#add-search-keyword-value-input').val().split(', '),
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


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var Storage = __webpack_require__(2);
	var randomColor = __webpack_require__(6);
	module.exports = {
	    apply: function () {
	        var primaryColor = Storage.getSettings().color;
	        var values;

	        if (primaryColor === 'random') {
	            primaryColor = randomColor();
	        }
	        
	        $('[data-primary-color]').each(function () {
	            values = $(this).attr('data-primary-color').split(' ');
	            for (var i = 0; i < values.length; i += 1) {
	                $(this).css(values[i], primaryColor);
	            }
	        });
	    }
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// randomColor by David Merfield under the CC0 license
	// https://github.com/davidmerfield/randomColor/

	;(function(root, factory) {

	  // Support AMD
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	  // Support CommonJS
	  } else if (typeof exports === 'object') {
	    var randomColor = factory();

	    // Support NodeJS & Component, which allow module.exports to be a function
	    if (typeof module === 'object' && module && module.exports) {
	      exports = module.exports = randomColor;
	    }

	    // Support CommonJS 1.1.1 spec
	    exports.randomColor = randomColor;

	  // Support vanilla script loading
	  } else {
	    root.randomColor = factory();
	  }

	}(this, function() {

	  // Seed to get repeatable colors
	  var seed = null;

	  // Shared color dictionary
	  var colorDictionary = {};

	  // Populate the color dictionary
	  loadColorBounds();

	  var randomColor = function (options) {

	    options = options || {};

	    // Check if there is a seed and ensure it's an
	    // integer. Otherwise, reset the seed value.
	    if (options.seed && options.seed === parseInt(options.seed, 10)) {
	      seed = options.seed;

	    // A string was passed as a seed
	    } else if (typeof options.seed === 'string') {
	      seed = stringToInteger(options.seed);

	    // Something was passed as a seed but it wasn't an integer or string
	    } else if (options.seed !== undefined && options.seed !== null) {
	      throw new TypeError('The seed value must be an integer or string');

	    // No seed, reset the value outside.
	    } else {
	      seed = null;
	    }

	    var H,S,B;

	    // Check if we need to generate multiple colors
	    if (options.count !== null && options.count !== undefined) {

	      var totalColors = options.count,
	          colors = [];

	      options.count = null;

	      while (totalColors > colors.length) {

	        // Since we're generating multiple colors,
	        // incremement the seed. Otherwise we'd just
	        // generate the same color each time...
	        if (seed && options.seed) options.seed += 1;

	        colors.push(randomColor(options));
	      }

	      options.count = totalColors;

	      return colors;
	    }

	    // First we pick a hue (H)
	    H = pickHue(options);

	    // Then use H to determine saturation (S)
	    S = pickSaturation(H, options);

	    // Then use S and H to determine brightness (B).
	    B = pickBrightness(H, S, options);

	    // Then we return the HSB color in the desired format
	    return setFormat([H,S,B], options);
	  };

	  function pickHue (options) {

	    var hueRange = getHueRange(options.hue),
	        hue = randomWithin(hueRange);

	    // Instead of storing red as two seperate ranges,
	    // we group them, using negative numbers
	    if (hue < 0) {hue = 360 + hue;}

	    return hue;

	  }

	  function pickSaturation (hue, options) {

	    if (options.luminosity === 'random') {
	      return randomWithin([0,100]);
	    }

	    if (options.hue === 'monochrome') {
	      return 0;
	    }

	    var saturationRange = getSaturationRange(hue);

	    var sMin = saturationRange[0],
	        sMax = saturationRange[1];

	    switch (options.luminosity) {

	      case 'bright':
	        sMin = 55;
	        break;

	      case 'dark':
	        sMin = sMax - 10;
	        break;

	      case 'light':
	        sMax = 55;
	        break;
	   }

	    return randomWithin([sMin, sMax]);

	  }

	  function pickBrightness (H, S, options) {

	    var bMin = getMinimumBrightness(H, S),
	        bMax = 100;

	    switch (options.luminosity) {

	      case 'dark':
	        bMax = bMin + 20;
	        break;

	      case 'light':
	        bMin = (bMax + bMin)/2;
	        break;

	      case 'random':
	        bMin = 0;
	        bMax = 100;
	        break;
	    }

	    return randomWithin([bMin, bMax]);
	  }

	  function setFormat (hsv, options) {

	    switch (options.format) {

	      case 'hsvArray':
	        return hsv;

	      case 'hslArray':
	        return HSVtoHSL(hsv);

	      case 'hsl':
	        var hsl = HSVtoHSL(hsv);
	        return 'hsl('+hsl[0]+', '+hsl[1]+'%, '+hsl[2]+'%)';

	      case 'hsla':
	        var hslColor = HSVtoHSL(hsv);
	        return 'hsla('+hslColor[0]+', '+hslColor[1]+'%, '+hslColor[2]+'%, ' + Math.random() + ')';

	      case 'rgbArray':
	        return HSVtoRGB(hsv);

	      case 'rgb':
	        var rgb = HSVtoRGB(hsv);
	        return 'rgb(' + rgb.join(', ') + ')';

	      case 'rgba':
	        var rgbColor = HSVtoRGB(hsv);
	        return 'rgba(' + rgbColor.join(', ') + ', ' + Math.random() + ')';

	      default:
	        return HSVtoHex(hsv);
	    }

	  }

	  function getMinimumBrightness(H, S) {

	    var lowerBounds = getColorInfo(H).lowerBounds;

	    for (var i = 0; i < lowerBounds.length - 1; i++) {

	      var s1 = lowerBounds[i][0],
	          v1 = lowerBounds[i][1];

	      var s2 = lowerBounds[i+1][0],
	          v2 = lowerBounds[i+1][1];

	      if (S >= s1 && S <= s2) {

	         var m = (v2 - v1)/(s2 - s1),
	             b = v1 - m*s1;

	         return m*S + b;
	      }

	    }

	    return 0;
	  }

	  function getHueRange (colorInput) {

	    if (typeof parseInt(colorInput) === 'number') {

	      var number = parseInt(colorInput);

	      if (number < 360 && number > 0) {
	        return [number, number];
	      }

	    }

	    if (typeof colorInput === 'string') {

	      if (colorDictionary[colorInput]) {
	        var color = colorDictionary[colorInput];
	        if (color.hueRange) {return color.hueRange;}
	      }
	    }

	    return [0,360];

	  }

	  function getSaturationRange (hue) {
	    return getColorInfo(hue).saturationRange;
	  }

	  function getColorInfo (hue) {

	    // Maps red colors to make picking hue easier
	    if (hue >= 334 && hue <= 360) {
	      hue-= 360;
	    }

	    for (var colorName in colorDictionary) {
	       var color = colorDictionary[colorName];
	       if (color.hueRange &&
	           hue >= color.hueRange[0] &&
	           hue <= color.hueRange[1]) {
	          return colorDictionary[colorName];
	       }
	    } return 'Color not found';
	  }

	  function randomWithin (range) {
	    if (seed === null) {
	      return Math.floor(range[0] + Math.random()*(range[1] + 1 - range[0]));
	    } else {
	      //Seeded random algorithm from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
	      var max = range[1] || 1;
	      var min = range[0] || 0;
	      seed = (seed * 9301 + 49297) % 233280;
	      var rnd = seed / 233280.0;
	      return Math.floor(min + rnd * (max - min));
	    }
	  }

	  function HSVtoHex (hsv){

	    var rgb = HSVtoRGB(hsv);

	    function componentToHex(c) {
	        var hex = c.toString(16);
	        return hex.length == 1 ? '0' + hex : hex;
	    }

	    var hex = '#' + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);

	    return hex;

	  }

	  function defineColor (name, hueRange, lowerBounds) {

	    var sMin = lowerBounds[0][0],
	        sMax = lowerBounds[lowerBounds.length - 1][0],

	        bMin = lowerBounds[lowerBounds.length - 1][1],
	        bMax = lowerBounds[0][1];

	    colorDictionary[name] = {
	      hueRange: hueRange,
	      lowerBounds: lowerBounds,
	      saturationRange: [sMin, sMax],
	      brightnessRange: [bMin, bMax]
	    };

	  }

	  function loadColorBounds () {

	    defineColor(
	      'monochrome',
	      null,
	      [[0,0],[100,0]]
	    );

	    defineColor(
	      'red',
	      [-26,18],
	      [[20,100],[30,92],[40,89],[50,85],[60,78],[70,70],[80,60],[90,55],[100,50]]
	    );

	    defineColor(
	      'orange',
	      [19,46],
	      [[20,100],[30,93],[40,88],[50,86],[60,85],[70,70],[100,70]]
	    );

	    defineColor(
	      'yellow',
	      [47,62],
	      [[25,100],[40,94],[50,89],[60,86],[70,84],[80,82],[90,80],[100,75]]
	    );

	    defineColor(
	      'green',
	      [63,178],
	      [[30,100],[40,90],[50,85],[60,81],[70,74],[80,64],[90,50],[100,40]]
	    );

	    defineColor(
	      'blue',
	      [179, 257],
	      [[20,100],[30,86],[40,80],[50,74],[60,60],[70,52],[80,44],[90,39],[100,35]]
	    );

	    defineColor(
	      'purple',
	      [258, 282],
	      [[20,100],[30,87],[40,79],[50,70],[60,65],[70,59],[80,52],[90,45],[100,42]]
	    );

	    defineColor(
	      'pink',
	      [283, 334],
	      [[20,100],[30,90],[40,86],[60,84],[80,80],[90,75],[100,73]]
	    );

	  }

	  function HSVtoRGB (hsv) {

	    // this doesn't work for the values of 0 and 360
	    // here's the hacky fix
	    var h = hsv[0];
	    if (h === 0) {h = 1;}
	    if (h === 360) {h = 359;}

	    // Rebase the h,s,v values
	    h = h/360;
	    var s = hsv[1]/100,
	        v = hsv[2]/100;

	    var h_i = Math.floor(h*6),
	      f = h * 6 - h_i,
	      p = v * (1 - s),
	      q = v * (1 - f*s),
	      t = v * (1 - (1 - f)*s),
	      r = 256,
	      g = 256,
	      b = 256;

	    switch(h_i) {
	      case 0: r = v; g = t; b = p;  break;
	      case 1: r = q; g = v; b = p;  break;
	      case 2: r = p; g = v; b = t;  break;
	      case 3: r = p; g = q; b = v;  break;
	      case 4: r = t; g = p; b = v;  break;
	      case 5: r = v; g = p; b = q;  break;
	    }

	    var result = [Math.floor(r*255), Math.floor(g*255), Math.floor(b*255)];
	    return result;
	  }

	  function HSVtoHSL (hsv) {
	    var h = hsv[0],
	      s = hsv[1]/100,
	      v = hsv[2]/100,
	      k = (2-s)*v;

	    return [
	      h,
	      Math.round(s*v / (k<1 ? k : 2-k) * 10000) / 100,
	      k/2 * 100
	    ];
	  }

	  function stringToInteger (string) {
	    var total = 0
	    for (var i = 0; i !== string.length; i++) {
	      if (total >= Number.MAX_SAFE_INTEGER) break;
	      total += string.charCodeAt(i)
	    }
	    return total
	  }

	  return randomColor;
	}));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

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
	            $('a[href="#delete-plugin-file-pref-pane"]').text(Text.titles.DELETE_PLUGIN_FILE);
	        },
	        general_pane = function () {
	            $('#general-pane h2').text(Text.general_pane.TITLE);
	            $('#general-pane h3').text(Text.general_pane.DESCRIPTION);
	            $('#general-pane > .input-wrapper:nth-of-type(2) p').text(Text.general_pane.CHANGE_PRIMARY_COLOR);
	            $('#general-pane .smallDouble .input-wrapper:nth-of-type(1) p').text(Text.general_pane.DEFAULT_SEARCH_ENGINE);
	            $('#general-pane .smallDouble .input-wrapper:nth-of-type(2) p').text(Text.general_pane.LANGUAGE);
	            $('#change-primary-color').text(Text.buttons.CHANGE);
	            $('#checkbox-list p').text(Text.general_pane.OPEN_IN_NEW_TAB);
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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var Storage = __webpack_require__(2);
	var SysDefaults = __webpack_require__(3);
	var Text = window.Text;


	var Utils = {
	    warn: function (type, callback) {
	        var typeStr = type === SysDefaults.storageKeys.shortcuts ? Text.add_shortcut_pane.SHORTCUTS : type === SysDefaults.storageKeys.searchKeywords ? Text.add_search_keyword_pane.SEARCH_KEYWORDS : type;

	        $('#warn h2').html(Text.WARN.ARE_YOU_SURE_DELETE + typeStr + '?');
	        $('#warn #warn-yes').html(Text.WARN.SURE);
	        $('#warn #warn-cancel').html(Text.WARN.CANCEL);

	        $('#overlay').fadeIn(100);
	        $('#warn').fadeIn(500);

	        $('#warn-cancel').on('click', function () {
	            $('#warn').fadeOut(100);
	            $('#overlay').fadeOut(500);
	            return false;
	        });

	        $('#warn-yes').on('click', function () {
	            $('#warn').fadeOut(100);
	            $('#overlay').fadeOut(500);
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
	            } else if (response.type === 'notHex') {
	                message = Text.ERROR.HEX_COLOR_CODE;
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
	        $('.show-stored-plugin-files').text(Text.buttons.SHOW_PLUGIN_FILE_NAMES);
	        $('.show-stored').parent().siblings('ul').html('');
	    }
	};

	module.exports = {

	    add: function (options) {

	        var type = options.type,
	            key = options.key,
	            value = options.value,
	            $output = options.responseOutput,
	            settingsKey = options.settingsKey;

	        var newEntry = {},
	            response = {},
	            stored;

	        if (key === '' || value === '') {
	            response.type = 'empty';
	            response.success = false;

	        } else {
	            if ($.isArray(type)) {
	                var index,
	                    settings = Storage.getSettings();

	                stored = type;

	                index = stored.indexOf(value);

	                if (index !== -1) {
	                    response.type = 'updated';
	                    response.success = true;

	                    stored[index] = value;

	                } else {
	                    response.type = 'added';
	                    response.success = true;

	                    stored.push(value);
	                }

	                settings[settingsKey] = stored;
	                Storage.set(SysDefaults.storageKeys.settings, settings);

	                response.subject = value;

	            } else {

	                stored = !Storage.get(type) ? {} : Storage.get(type);

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
	        }
	        Utils.closeAllOpenLists();
	        Utils.outputResponse(response, $output);
	    },

	    delete: function (options) {

	        var type = options.type,
	            key = options.key,
	            $output = options.responseOutput,
	            settingsKey = options.settingsKey;

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

	    deleteAll: function (options) {

	        var type = options.type,
	            $output = options.responseOutput;

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

	        var shortcutsObj = Storage.getShortcuts(),
	            $outputList = $el.parent().siblings('ul'),
	            counter = 0,
	            propertyNames = Object.getOwnPropertyNames(shortcutsObj),
	            key;

	        if ($el.data('is-showing') === false) {
	            $el.text(Text.buttons.HIDE_SHORTCUTS);

	            if ($.isEmptyObject(shortcutsObj)) {
	                $outputList.append('<li><i>' + Text.add_shortcut_pane.NO_SHORTCUTS + '</i></li>');
	            } else {
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
	            }
	            $el.data('is-showing', true);

	        } else if ($el.data('is-showing') === true) {
	            $el.text(Text.buttons.SHOW_SHORTCUTS);
	            $outputList.html('');
	            $el.data('is-showing', false);
	        }

	    },

	    showStoredSearchKeywords: function ($el) {

	        var searchKeywordsObj = Storage.getSearchKeywords(),
	            $outputList = $el.parent().siblings('ul'),
	            counter = 0,
	            propertyNames = Object.getOwnPropertyNames(searchKeywordsObj),
	            key;

	        if ($el.data('is-showing') === false) {
	            $el.text(Text.buttons.HIDE_SEARCH_KEYWORD);


	            if ($.isEmptyObject(searchKeywordsObj)) {
	                $outputList.append('<li><i>' + Text.add_search_keyword_pane.NO_SEARCH_KEYWORDS + '</i></li>');
	            } else {

	                for (var property in searchKeywordsObj) {
	                    if (searchKeywordsObj.hasOwnProperty(property)) {
	                        key = searchKeywordsObj[property];

	                        $outputList.append('<li><h2>' + propertyNames[counter] + '</h2></li>');
	                        for (var i = 0; i < key.length; i += 1) {
	                            $outputList.append('<li>' + key[i] + '</li>');
	                        }
	                        $outputList.append('<br>');
	                        counter += 1;
	                    }
	                }
	            }

	            $el.data('is-showing', true);

	        } else if ($el.data('is-showing') === true) {
	            $el.text(Text.buttons.SHOW_SEARCH_KEYWORD);
	            $outputList.html('');
	            $el.data('is-showing', false);
	        }

	    },

	    showStoredPluginNames: function ($el) {
	        var stored = Storage.getSettings().pluginFiles,
	            $outputList = $el.parent().siblings('ul');

	        if ($el.data('is-showing') === false) {
	            $el.text(Text.buttons.HIDE_PLUGIN_FILE_NAMES);

	            if (stored.length <= 0) {
	                $outputList.append('<li style="text-align: center"><i>' + Text.add_plugin_file.NO_PLUGIN_FILES + '</i></li>');
	            } else {
	                for (i = 0; i < stored.length; i += 1) {
	                    $outputList.append('<li style="text-align: center"><h2>' + stored[i] + '</h2></li><br>');
	                }
	            }

	            $el.data('is-showing', true);

	        } else if ($el.data('is-showing') === true) {
	            $el.text(Text.buttons.SHOW_PLUGIN_FILE_NAMES);
	            $outputList.html('');
	            $el.data('is-showing', false);
	        }
	    },

	    changePlaceholder: function (options) {

	        var placeholder = options.value,
	            $output = options.responseOutput;

	        var settings = Storage.getSettings();

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

	    changePrimaryColor: function (options) {
	        var desiredColor = options.value,
	            $output = options.responseOutput;

	        var settings = Storage.getSettings();

	        var response = {};

	        var isHexFormat = /^#(?:[0-9a-f]{3}){1,2}$/i.test(desiredColor);

	        if (desiredColor === '') {
	            response.type = 'empty';
	            response.success = false;

	        } else if (isHexFormat) {
	            settings.color = desiredColor;

	            Storage.set(SysDefaults.storageKeys.settings, settings);

	            window.location.reload();

	        } else if (desiredColor === 'default') {
	            settings.color = SysDefaults.settings.color;

	            Storage.set(SysDefaults.storageKeys.settings, settings);

	            window.location.reload();

	        } else if (desiredColor === 'random') {
	            settings.color = desiredColor;

	            Storage.set(SysDefaults.storageKeys.settings, settings);

	            window.location.reload();

	        } else {
	            response.type = 'notHex';
	            response.success = false;
	        }

	        Utils.outputResponse(response, $output);

	    },

	    utils: Utils
	};


/***/ }
]);