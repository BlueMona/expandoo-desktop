/**
 * Configuration variables that can be changed by a different
 * release channel/whitelabel.
 */
module.exports = {
    appId: 'com.expandoo.desktop', // must be the same as in package.json

    // App-unique name of keychain service for storing Account Key.
    // IMPORTANT: Changing this for the same app will invalidate autologin for all users.
    keychainService: 'Expandoo',

    socketServerUrl: 'wss://login.expandoo.eu',
    ghostFrontendUrl: 'https://mail.peerio.com',
    // no payments
    disablePayments: true,

    translator: {
        stringReplacements: [
            { original: 'a <b>Peerio', replacement: 'an <b>Expandoo' },
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
