import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions/actions';
import EditBar from './EditBar';
import TitleBar from '../components/TitleBar';
import ViewBar from '../components/ViewBar';

class App extends Component {
  render() {

    let that = this,
      props = that.props,
      actions = props.appActions,
      client = props.client,
      messageAuthor = client.messageAuthor;
    debugger;
    
// var tmp = {
  
//   record:{
//       'text': '123',
//       'author': 'Max',
//       'location': '123',
//       'eventDate': '2017-07-13T12:53:49.241Z',
//       'startDate': '2017-07-13T12:53:49.241Z',
//       'messageAuthor': 'Max',
//       'messageDate': '123',
//   }
// }
//     this.props.appActions.addRecord('1', tmp);
// tmp = {
//   record:{
//       'text': ' ',
//       'author': ' ',
//       'location': ' ',
//       'eventDate': '0',
//       'startDate': '0',
//       'messageAuthor': ' ',
//       'messageDate': '0',
//   }
// }
//     this.props.appActions.addRecord('2', tmp);
// tmp = {
//   record:{
//       'text': '123',
//       'author': 'Max',
//       'location': '123',
//       'eventDate': '2017-07-13T12:53:49.241Z',
//       'startDate': '2017-07-13T12:53:49.241Z',
//       'messageAuthor': 'Max',
//       'messageDate': '123',
//   }
// }
//     this.props.appActions.updateRecord('2', tmp);

    return <div className='App'>
        <TitleBar messageAuthor={messageAuthor}/>
        <EditBar client={client} actions={actions}/>
        <ViewBar eventList={client.eventList} focusRow={client.focusRow} actions={actions}/>
      </div>
  }
}
const mapStateToProps = (state) => ({
  client: state.client
});
const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(App);