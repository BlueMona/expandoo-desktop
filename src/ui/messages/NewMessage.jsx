const React = require('react');
const { withRouter } = require('react-router');
const { observable, computed, when } = require('mobx');
const { observer } = require('mobx-react');
const { Button, Chip, IconButton, Input, List, ListItem, ListSubHeader, ProgressBar } = require('react-toolbox');
const { t } = require('peerio-translator');
const { contactStore, chatStore } = require('../../icebear'); //eslint-disable-line
const css = require('classnames');
const Avatar = require('../shared_components/Avatar');

@observer
class NewMessage extends React.Component {
    @observable selected = [];
    @observable query = '';

    @computed get options() {
        return contactStore.contacts.filter(c => !c.loading && !c.notFound && !this.selected.includes(c));
    }

    @computed get canGO() {
        return !!this.selected.find(s => !s.loading && !s.notFound);
    }

    handleTextChange = newVal => {
        if (newVal.length > 1 && ', '.includes(newVal[newVal.length - 1])) {
            this.query = newVal.substr(0, newVal.length - 1).trim();
            this.tryAcceptUsername();
            return;
        }
        this.query = newVal.trim();
    };

    // Don't use onKeyPress it won't catch backspace
    // Don't use onKeyUp - text change fires earlier
    handleKeyDown = e => {
        if (e.key === 'Enter' && this.query !== '') this.tryAcceptUsername();
        if (e.key === 'Backspace' && this.query === '' && this.selected.length > 0) {
            this.selected.remove(this.selected[this.selected.length - 1]);
        }
    };

    tryAcceptUsername() {
        if (this.selected.find(s => s.username === this.query)) {
            return;
        }
        const c = contactStore.getContact(this.query);
        this.selected.push(c);
        when(() => !c.loading, () => {
            setTimeout(() => c.notFound && this.selected.remove(c), 3000);
        });
        this.query = '';
    }
    creatingChat = false;
    go = () => {
        if (this.creatingChat || !this.canGO) return;
        this.creatingChat = true;
        this.selected.forEach(s => {
            if (s.notFound) this.selected.remove(s);
        });

        chatStore.startChat(this.selected);
        this.props.router.push('/app');
    };

    handleClose = () => {
        this.props.router.push('/app');
    };

    render() {
        return (
            <div className="create-new-message">
                <div className="flex-col"
                    style={{
                        width: '600px',
                        marginTop: '168px' }}>
                    <div className="chat-creation-header">
                        <div className="title">{t('directMessages')}</div>
                        <IconButton icon="close" onClick={this.handleClose} />
                    </div>
                    <div className="new-message-search">
                        <div className="chip-wrapper">
                            {this.selected.map(c =>
                                <Chip key={c.username} className={css('username', { 'not-found': c.notFound })}
                                      onDeleteClick={() => this.selected.remove(c)} deletable>
                                    { c.loading ? <ProgressBar type="linear" mode="indeterminate" /> : c.username }
                                </Chip>
                            )}
                            <Input placeholder={t('userSearch')} value={this.query} onChange={this.handleTextChange}
                                    onKeyDown={this.handleKeyDown} />
                        </div>
                        <Button className="confirm" label="Go" onClick={this.go} disabled={!this.canGO} />
                    </div>
                    <List selectable ripple >
                        <ListSubHeader caption="Your contacts" />
                        <div className="user-list">
                            { this.options.map(c =>
                                <ListItem key={c.username} avatar={<Avatar contact={c} />}
                                      caption={c.username} legend={`${c.firstName} ${c.lastName}`}
                                      onClick={() => this.selected.push(c)} />
                            )}
                        </div>
                    </List>
                </div>
            </div>
        );
    }
}


module.exports = withRouter(NewMessage);