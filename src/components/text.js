import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/actions';

import ReactDOM from 'react-dom'

class Text extends Component {
    validate(text){
        let refs                 = this.refs,
            DOM_input_text       = ReactDOM.findDOMNode(refs.input_text),        
            DOM_input_text_error = ReactDOM.findDOMNode(refs.input_text_error);  
        
        if(text === '') {
            if(DOM_input_text.className.search('error-input') == -1) {
                DOM_input_text.className += ' error-input';      
            }
            DOM_input_text_error.className  = 'error-label';
        } else {
            DOM_input_text.className        = DOM_input_text.className.replace(' error-input','');
            DOM_input_text_error.className  = 'none';               
        }
    }

    changeText(e) {
        let text = e.target.value.trim();
        this.validate(text);

        this.props.actions.changeText(text);
    }
    componentDidUpdate() {
        let text            = this.props.user.text,
            DOM_input_text  = ReactDOM.findDOMNode(this.refs.input_text);
        
        if(text === '') {
            DOM_input_text.value = '';                   
        } else {
            DOM_input_text.value = text;
            this.validate(text);              
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
                <label htmlFor='input-text' ref='input_text_error' className='none'>
                    Please enter text message
                </label>
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