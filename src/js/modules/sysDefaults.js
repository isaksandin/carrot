var storageKeyPrefix = '';
module.exports = {

        appName: 'Carrot',

        searchKeywords: {
            google: ['https://www.google.com/search?q={{query}}'],
            maps: ['https://www.google.com/maps/search/{{query}}/'],
            images: ['https://www.google.com/search?tbm=isch&q={{query}}']
        },

        shortcuts: {
            // Currently no default shortcuts
        },

        settings: {
            language: 'en',
            searchEngine: 'Google',
            placeholder: 'What can I do for you?',
            pluginFiles: ['example'],
            openInNewTab: false,
            color: '#fa7328'
        },

        stats: {
            count: 0,
            resetDate: new Date()
        },

        storageKeys: {
            shortcuts: storageKeyPrefix + 'shortcuts',
            searchKeywords: storageKeyPrefix + 'searchKeywords',
            settings: storageKeyPrefix + 'settings',
            stats: storageKeyPrefix + 'stats',
            history: storageKeyPrefix + 'history'
        }
};
