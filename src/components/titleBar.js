import React, { Component } from 'react';
import { connect } from 'react-redux';

class TitleBar extends Component {
    render() {
        return <div className='app-titleBar'>
            <div className='app-titleBar-title'>
                InfoPanel Message Service
            </div>
            <div className='app-titleBar-userName'>
                {this.props.user.messageAuthor}
            </div>
        </div>
    }
}
function mapStateToProps(state) {
    return {
        user: state
    };
}

export default connect(mapStateToProps, null)(TitleBar);