var storageKeyPrefix = '';
module.exports = {

        appName: 'project-carrot',

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
            pluginFiles: ['default'],
            color: '#fa7328'
        },

        storageKeys: {
            shortcuts: storageKeyPrefix + 'shortcuts',
            searchKeywords: storageKeyPrefix + 'searchKeywords',
            settings: storageKeyPrefix + 'settings'
        }
};
