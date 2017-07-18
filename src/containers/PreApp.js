import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions/actions';

import App from './App';
import EventPage from '../components/EventPage';

class PreApp extends Component {
  render() {
    let that  = this,
      props   = that.props,
      actions = props.appActions,
      client  = props.client,
      server  = props.server,
      messageAuthor = client.messageAuthor;
    return <div className='PreApp'>
        {/*<TitleBar messageAuthor={messageAuthor}/>
        <EditBar client={client} actions={actions}/>
        <ViewBar eventList={server.records} focusRow={client.focusRow} actions={actions}/>*/}
        <App />
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
export default connect(mapStateToProps, mapDispatchToProps)(PreApp);