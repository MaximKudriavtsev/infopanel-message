import React, { Component } from 'react';

import * as actions from '../actions/actions';

export default class TitleBar extends Component {
    render() {
        return <div className='app-titleBar'>
            <div className='app-titleBar-title' unselectable='on'>
                InfoPanel Message Service
            </div>
            <div className='app-titleBar-userName'>
                {this.props.messageAuthor}
            </div>
        </div>
    }
}