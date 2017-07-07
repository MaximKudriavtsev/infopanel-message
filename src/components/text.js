import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/actions';

import ReactDOM from 'react-dom'

class Text extends Component {
    changeText(e) {
        this.props.actions.changeText(e.target.value);
    }
    componentDidUpdate() {
        if(this.props.user.text === '') {
            ReactDOM.findDOMNode(this.refs.input_text).value = '';
        }else{
            ReactDOM.findDOMNode(this.refs.input_text).value = this.props.user.text;
        }
    }

    render() {
        let that = this;

        return <div className='text'>
                <label className='text-label' htmlFor='input-text'>Text</label>
                <input id='input-text'
                    ref='input_text'
                    className='text-input' 
                    placeholder='Enter message...'
                    onBlur={:: that.changeText}
                    maxLength='30'
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