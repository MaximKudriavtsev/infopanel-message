import React, { Component } from 'react';

export default class TitleBar extends Component {
    render() {
        return <div className='app-titleBar'>
            <div className='app-titleBar-title'>
                InfoPanel Message Service
            </div>
            <div className='app-titleBar-userName'>
                User15
            </div>
        </div>
    }
}