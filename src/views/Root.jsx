const React = require('react');
const AutoUpdateDialog = require('../components/AutoUpdateDialog');
const languageStore = require('../stores/language-store');
const { reaction } = require('mobx');

class Root extends React.Component {

    constructor() {
        super();
        languageStore.loadSavedLanguage();
        this.onLanguageChange = reaction(
            () => languageStore.language,
            () => {
                this.forceUpdate();
            }
        );
    }

    componentWillUnmount() {
        this.onLanguageChange();
    }

    render() {
        return (
            <div>
                {this.props.children}
                <AutoUpdateDialog />
            </div>
        );
    }
}

Root.propTypes = {
    children: React.PropTypes.element.isRequired
};

module.exports = Root;