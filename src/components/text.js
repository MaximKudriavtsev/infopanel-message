import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../actions/actions'

class Text extends Component {
    changeText(e) {
        this.props.actions.changeText(e.target.value);
    }
    render() {
        var that = this;

        return <div>
                <label htmlFor='input-text'>Text</label> {that.props.user.text}
                <input id='input-text'
                className='input-text' 
                placeholder='Введите текс'
                onBlur={:: that.changeText}
                maxLength='25'
                /> 
            </div>
    }
}

function mapStateToProps(state) {
    return {
        user: state
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Text);