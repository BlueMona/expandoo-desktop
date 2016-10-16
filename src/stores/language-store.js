const { observable, action } = require('mobx');
const { setLocale } = require('peerio-translator');
const normalizeError = require('../icebear').errors.normalize; //eslint-disable-line

class LanguageStore {
    @observable language = '';

    constructor() {
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    languages = {
        en: 'English',
        cs: 'Čeština',
        'zh-CN': '汉语',
        de: 'Deutsch',
        es: 'Español',
        fr: 'Francais',
        it: 'Italiano',
        ja: '日本語',
        hu: 'Magyar',
        'nb-NO': 'Norsk (Bokmål)',
        'pt-BR': 'Português (Brasileiro)',
        ru: 'Русский',
        tr: 'Türkçe'
    };
    translationLangs = ['en', 'cs', 'zh-CN', 'de', 'es', 'fr', 'it', 'ja', 'hu', 'nb-NO', 'pt-BR', 'ru', 'tr'];
    dictionaryLangs = ['en', 'cs', 'zh-CN', 'de', 'es', 'fr', 'it', 'ja', 'hu', 'nb-NO', 'pt-BR', 'ru', 'tr'];

    get translationLangsDataSource() {
        if (!this._translationLangsCache) {
            this._translationLangsCache = this.translationLangs.map(code => {
                return { value: code, label: this.languages[code] };
            });
        }
        return this._translationLangsCache;
    }

    get dictionaryLangsDataSource() {
        if (!this._dictionaryLangsCache) {
            this._dictionaryLangsCache = this.dictionaryLangs.map(code => {
                return { value: code, label: this.languages[code] };
            });
        }
        return this._dictionaryLangsCache;
    }

    @action changeLanguage(code) {
        try {
            const translation = require(`../locales/${code.replace('-', '_')}.json`);
            setLocale(code, translation);
            this.language = code;
        } catch (err) {
            console.error(`Failed switch language to: ${code} ${normalizeError(err)}`);
        }
    }

}

module.exports = new LanguageStore();