const cfg = require('./icebear').config; //eslint-disable-line
const app = require('electron').app || require('electron').remote.app;
const isDevEnv = require('./helpers/is-dev-env');

cfg.appName = 'Expandoo';
cfg.updateUrl = 'https://leviosa.peerio.com/update';
cfg.currentVersion = app.getVersion();
cfg.socketServerUrl = 'wss://hocuspocus.peerio.com';
cfg.supportUrl = 'https://expandoo.eu/support-doesnt-exist-yet';
cfg.termsUrl = 'https://expandoo.eu/terms-dont-exist-yet';

cfg.stringReplacements = [
    { original: 'Peerio', replacement: 'Expandoo' }
];

if (isDevEnv) {
    try {
        cfg.autologin = require('../../autologin.json'); // eslint-disable-line
    } catch (err) {
    // don't care
    }
}

// FOR DEV ENVIRONMENT ONLY
// DEV MACHINE OVERRIDES SOCKET SERVER VALUE WITH THIS
if (process.env.PEERIO_STAGING_SOCKET_SERVER) {
    cfg.socketServerUrl = process.env.PEERIO_STAGING_SOCKET_SERVER;
}

module.exports = cfg;
