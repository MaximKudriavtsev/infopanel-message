import React, { Component } from 'react';

import * as actions from '../actions/actions';

export default class TitleBar extends Component {
    render() {
        return <div className='app-titleBar'>
            <div className='app-titleBar-title' unselectable='on'>
                InfoPanel Message Service
            </div>
            <div className='app-titleBar-userName'>
                <a className='app-titleBar-userName-logOut' 
                href = '/ClearCookies'
                title = 'Click to Log Out'>{this.props.messageAuthor}</a>
            </div>
        </div>
    }
}