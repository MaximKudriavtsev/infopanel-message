import React, { Component } from 'react';
import ReactDOM from 'react-dom'

export default class Text extends Component {
    validate = (text) => {
        let refs = this.refs,
            DOM_input_text_error = ReactDOM.findDOMNode(refs.input_text_error),
            DOM_input_text_warning = ReactDOM.findDOMNode(refs.input_text_warning);
                    
        DOM_input_text_error.className = ((text === '') ? 'error-label' : 'none');
    }
    warningMaxSize = (e) => {
        let refs = this.refs,
            DOM_input_text = ReactDOM.findDOMNode(refs.input_text),     
            DOM_input_text_warning = ReactDOM.findDOMNode(refs.input_text_warning);

        DOM_input_text_warning.className = ((DOM_input_text.value.length >= 50) ? 'warning-label' : 'none');
        if(DOM_input_text.value.length > 50){
            DOM_input_text.value = DOM_input_text.value.slice(0, 50);
        }
    }
    changeText = (e) => {
        let text = e.target.value.trim(),
            that = this;

        that.validate(text);
        that.props.actions.changeText(text);
    }
    componentDidUpdate = () => {
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
                unselectable='on' title='Сообщение которое будет публиковаться на info panel'>Тема мероприятия</label>
                <input id='input-text'
                    ref='input_text'
                    className='text-input'
                    placeholder='Введите тему мероприятия...'
                    onBlur={that.changeText}
                    onChange={that.warningMaxSize}
                    maxLength='50'
                    title='Сообщение которое будет публиковаться на info panel'
                />
                <label htmlFor='input-text' ref='input_text_error' className='none' unselectable='on'>
                    Введите тему мероприятия
                </label>
                <label htmlFor='input-text' ref='input_text_warning' className='none' unselectable='on'>
                    Reached the maximum number(50) of characters
                </label>
            </div>
    }
}