import React, { Component } from 'react';

import EditBar from './EditBar';
import TitleBar from '../components/TitleBar';
import ViewBar_table from '../components/ViewBar_table';

export default class App extends Component {
  render() {
    return <div className='App'>
        <TitleBar />
        <EditBar />
        <ViewBar_table />
      </div>
  }
}
