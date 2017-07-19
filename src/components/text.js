import React, { Component } from 'react';
import ReactDOM from 'react-dom'

export default class Text extends Component {
    validate(text){
        let refs = this.refs,
            DOM_input_text_error = ReactDOM.findDOMNode(refs.input_text_error),
            DOM_input_text_warning = ReactDOM.findDOMNode(refs.input_text_warning);
                    
        DOM_input_text_error.className = ((text === '') ? 'error-label' : 'none');
    }
    warningMaxSize = (e) => {
        let refs = this.refs,
            DOM_input_text = ReactDOM.findDOMNode(refs.input_text),     
            DOM_input_text_warning = ReactDOM.findDOMNode(refs.input_text_warning);

        DOM_input_text_warning.className = ((DOM_input_text.value.length == 40) ? 'warning-label' : 'none');
    }
    changeText = (e) => {
        let text = e.target.value.trim(),
            that = this;

        that.validate(text);
        that.props.actions.changeText(text);
    }
    componentDidUpdate() {
        let that = this,
            text = that.props.text,
            id = that.props.id,
            DOM_input_text = ReactDOM.findDOMNode(that.refs.input_text);

        DOM_input_text.value = ((text === '') ? '' : text);
        (id == -1) ? that.validate('text') : that.validate(text);
        this.warningMaxSize();
    }
    render() {
        let that = this;

        return <div className='text'>
                <label className='text-label' htmlFor='input-text' 
                unselectable='on' title='Your message which display on info panel'>Text</label>
                <input id='input-text'
                    ref='input_text'
                    className='text-input'
                    placeholder='Enter message...'
                    onBlur={that.changeText}
                    onChange={that.warningMaxSize}
                    maxLength='40'
                    title='Maximum length is 40 symbol'
                />
                <label htmlFor='input-text' ref='input_text_error' className='none' unselectable='on'>
                    Please enter text message
                </label>
                <label htmlFor='input-text' ref='input_text_warning' className='none' unselectable='on'>
                    Reached the maximum number(40) of characters
                </label>
            </div>
    }
}