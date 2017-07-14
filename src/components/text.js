import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/actions';

import ReactDOM from 'react-dom'

class Text extends Component {
    validate(text){
        let refs                   = this.refs,
            DOM_input_text_error   = ReactDOM.findDOMNode(refs.input_text_error),
            DOM_input_text_warning = ReactDOM.findDOMNode(refs.input_text_warning);
                    
        if(text === '') {
            DOM_input_text_error.className  = 'error-label';
        } else {
            DOM_input_text_error.className  = 'none';               
        }
    }
    warningMaxSize(e){
        let refs                    = this.refs,
            DOM_input_text          = ReactDOM.findDOMNode(refs.input_text),     
            DOM_input_text_warning  = ReactDOM.findDOMNode(refs.input_text_warning);

        if(DOM_input_text.value.length == 30){
            DOM_input_text_warning.className  = 'warning-label';
        } else {
            DOM_input_text_warning.className  = 'none';               
        } 
    }
    changeText(e) {
        let text = e.target.value.trim();
        //this.validate(text);

        
        this.props.actions.changeText(text);
        this.props.actions.socketIoText();
    }
    componentDidUpdate() {
        let user            = this.props.user,
            text            = user.text,
            DOM_input_text  = ReactDOM.findDOMNode(this.refs.input_text);
        
        if(text === '') {
            DOM_input_text.value = '';
        } else {
            DOM_input_text.value = text;
        }

        if(user.id == -1){
            this.validate('text');
        } else {
            this.validate(text);
        }
    }

    render() {
        let that = this;

        return <div className='text'>
                <label className='text-label' htmlFor='input-text' 
                unselectable='on' title='Maximum length is 30 symbol'>Text</label>
                <input id='input-text'
                    ref='input_text'
                    className='text-input'
                    placeholder='Enter message...'
                    onBlur={:: that.changeText}
                    onChange={:: that.warningMaxSize}
                    maxLength='30'
                    title='Maximum length is 30 symbol'
                />
                <label htmlFor='input-text' ref='input_text_error' className='none' unselectable='on'>
                    Please enter text message
                </label>
                <label htmlFor='input-text' ref='input_text_warning' className='none' unselectable='on'>
                    Reached the maximum number(30) of characters
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