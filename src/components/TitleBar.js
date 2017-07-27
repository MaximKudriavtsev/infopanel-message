import React, { Component } from 'react';

import * as actions from '../actions/actions';

export default class TitleBar extends Component {
    render() {
        return <div className='app-titleBar'>
            <div className='app-titleBar-title' unselectable='on'>
                MESSAGE SERVICE
            </div>
            <div className='app-titleBar-userName'>
                <a className='app-titleBar-userName-logOut'
                  title = 'Click to Log Out'
                  href = '/infopanel-message/clearCookies'>
                  {this.props.messageAuthor}
                </a>
            </div>
        </div>
    }
}