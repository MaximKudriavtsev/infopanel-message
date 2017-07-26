import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions/actions';

import EditBar from '../components/EditBar';
import ViewBar from '../components/ViewBar';
// import MessageComponent from '../components/MessageComponent';
import '../styles/MessageComponent.css';

class App extends Component {
  render() {
    let that = this,
      props = that.props,
      actions = props.appActions,
      client = props.client,
      server = props.server,
      messageAuthor = client.messageAuthor;

    return <div className={!client.preview ? 'app' : 'none'}>
       <ViewBar client={client} messageAuthor={messageAuthor} eventList={server.records} focusRow={client.focusRow} messageAuthor={messageAuthor} actions={actions}/> 
      <EditBar client={client} actions={actions} />
      {/* <div className='forMessageComponent'>
        <MessageComponent data={data}  index={0}/>
      </div> */}
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