import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions/actions';
import EditBar from './EditBar';
import TitleBar from '../components/TitleBar';
import ViewBar_table from '../components/ViewBar_table';

class App extends Component {
  render() {
    console.log(this.props.appActions);

    return <div className='App'>
        <TitleBar />
        <EditBar />
        <ViewBar_table />
      </div>
  }
}

const mapStateToProps = (state) => ({
  record: state
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
