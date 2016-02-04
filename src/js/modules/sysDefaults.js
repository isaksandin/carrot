var storageKeyPrefix = '';
module.exports = {

        appName: 'Carrot',

        searchKeywords: {
            google: 'https://www.google.com/search?q={{query}}',
            maps: 'https://www.google.com/maps/search/{{query}}/',
            images: 'https://www.google.com/search?tbm=isch&q={{query}}'
        },

        shortcuts: {},

        settings: {
            language: 'en',
            searchEngine: 'Google',
            placeholder: 'What can I do for you?',
            pluginFiles: ['memory', 'translate', 'rng'],
            openInNewTab: false,
            color: '#fa7328'
        },

        storageKeys: {
            shortcuts: storageKeyPrefix + 'shortcuts',
            searchKeywords: storageKeyPrefix + 'searchKeywords',
            settings: storageKeyPrefix + 'settings'
        }
};
