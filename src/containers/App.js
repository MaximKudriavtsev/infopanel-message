import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions/actions';

import EditBar from './EditBar';
import TitleBar from '../components/TitleBar';
import ViewBar from '../components/ViewBar';
import EventPage from '../components/EventPage';

class App extends Component {
  render() {
    let that  = this,
      props   = that.props,
      actions = props.appActions,
      client  = props.client,
      server  = props.server,
      messageAuthor = client.messageAuthor;
      
    return <div>
      <div className={!client.preview ? 'App' : 'none'}>
        <TitleBar messageAuthor={messageAuthor}/>
        <EditBar client={client} actions={actions}/>
        <ViewBar eventList={server.records} focusRow={client.focusRow} actions={actions}/>
      </div>
        <EventPage preview={client.preview} actions={actions}/>
      </div>
  }
}
const mapStateToProps = (state) => ({
  client: state.client,
  server: state.server
});
const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(App);