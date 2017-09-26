/**
 * Configuration variables that can be changed by a different
 * release channel/whitelabel.
 */
module.exports = {
    appId: 'com.expandoo.desktop', // must be the same as in package.json
    
    whiteLabelBuild: true,
    // App-unique name of keychain service for storing Account Key.
    // IMPORTANT: Changing this for the same app will invalidate autologin for all users.
    keychainService: 'Expandoo',

    socketServerUrl: 'wss://login.expandoo.eu',
    ghostFrontendUrl: 'https://public.expandoo.eu',

    // no payments
    disablePayments: true,

    translator: {
        stringReplacements: [
            { original: 'a <b>Peerio', replacement: 'an <b>Expandoo' },
            { original: 'a Peerio', replacement: 'an Expandoo' },
            { original: 'Peerio', replacement: 'Expandoo' }
        ],
        urlMap: {
            contactFingerprint: 'mailto:support@expandoo.eu',
            mpDetail: 'mailto:support@expandoo.eu',
            tfaDetail: 'mailto:support@expandoo.eu',
            msgSignature: 'mailto:support@expandoo.eu',
            socialShareUrl: 'https://www.expandoo.eu/',
            socialShareImage: '',
            upgrade: 'https://expandoo.eu',
            helpCenter: 'mailto:support@expandoo.eu',
            contactSupport: 'mailto:support@expandoo.eu',
            // errorServerUrl: 'https://errors.peerio.com',
            // errorServerProjectKey: 'a356be460e68de68b1d336e3bb4c06ed',
            mailSupport: 'mailto:support@expandoo.eu',
            iosApp: '',
            androidApp: '',
            googleAuthA: 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en',
            googleAuthI: 'https://itunes.apple.com/app/google-authenticator/id388497605',
            authy: 'https://authy.com'
        }
    }
};
