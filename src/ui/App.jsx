const React = require('react');
const AppNav = require('./AppNav');

class App extends React.Component {

    render() {
        return (
            <div className="flex-row app-root">
                <AppNav />
                {this.props.children}
            </div>
        );
    }
}


module.exports = App;