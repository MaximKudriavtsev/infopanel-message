import React, { Component } from 'react'

import EditBar from './EditBar'
import TitleBar from '../components/TitleBar'
import ViewBar from '../components/ViewBar'

export default class App extends Component {
  render() {
    return <div className='App'>
        <TitleBar />
        <EditBar />
        <ViewBar />
      </div>
  }
}
