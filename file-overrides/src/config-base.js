/**
 * Configuration variables that can be changed by a different
 * release channel/whitelabel.
 */
module.exports = {
    appId: 'com.expandoo.messenger', // must be the same as in package.json

    // App-unique name of keychain service for storing Account Key.
    // IMPORTANT: Changing this for the same app will invalidate autologin for all users.
    keychainService: 'ExpandooMessenger',

    socketServerUrl: 'wss://hocuspocus.peerio.com',
    ghostFrontendUrl: 'https://mail.peerio.com',

    // TODO: is this needed?
    updateUrl: 'https://expandoo-update.peerio.com/update',

    translator: {
        stringReplacements: [
            { original: 'a Peerio', replacement: 'an Expandoo' },
            { original: 'Peerio', replacement: 'Expandoo' }
        ],
        urlMap: {
            contactFingerprint: 'https://expandoo.eu/doesnt-exist-yet',
            mpDetail: 'https://expandoo.eu/doesnt-exist-yet',
            tfaDetail: 'https://expandoo.eu/doesnt-exist-yet',
            msgSignature: 'https://expandoo.eu/doesnt-exist-yet',
            upgrade: 'https://expandoo.eu/doesnt-exist-yet',
            proWelcome: 'https://expandoo.eu/doesnt-exist-yet',
            proAccount: 'https://expandoo.eu/doesnt-exist-yet',
            helpCenter: 'https://expandoo.eu/doesnt-exist-yet',
            contactSupport: 'https://expandoo.eu/doesnt-exist-yet'
        }
    }
};
