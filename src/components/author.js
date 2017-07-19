import React, { Component } from 'react';
import ReactDOM from 'react-dom'

export default class Author extends Component {
    validate = (text) => {
        let refs = this.refs,
            DOM_input_author_error = ReactDOM.findDOMNode(refs.input_author_error),
            DOM_input_author_warning = ReactDOM.findDOMNode(refs.input_author_warning);
                    
        DOM_input_author_error.className = ((text === '') ? 'error-label' : 'none');
    }
    warningMaxSize = () => {
        let refs = this.refs,
            DOM_input_author = ReactDOM.findDOMNode(refs.input_author),     
            DOM_input_author_warning = ReactDOM.findDOMNode(refs.input_author_warning);

        DOM_input_author_warning.className = ((DOM_input_author.value.length == 25) ? 'warning-label' : 'none');
    }
    changeAuthor = (e) => {
        let author = e.target.value.trim();

        this.props.actions.changeAuthor(author);
    }
    componentDidUpdate() {
        let that = this,
            author = that.props.author,
            id = that.props.id,
            DOM_input_author = ReactDOM.findDOMNode(that.refs.input_author);
/*cheack*/
        DOM_input_author.value = ((that.props.fullNameAuthor === '') ? '' : author);
        (id == -1) ? that.validate('author') : that.validate(author);
        this.warningMaxSize();
    }
    render() {
        let that = this,
            props = that.props;
        return <div className='author'>
            <label className='author-label' unselectable='on'
                htmlFor='input-author' title='Event organizer'>Author</label>
            <input id='input-author'
                ref='input_author'
                className='author-input'
                placeholder='Enter author of event...'
                onBlur={that.changeAuthor}
                onChange={that.warningMaxSize}
                maxLength='25'
                title='Maximum length is 25 symbol'
                defaultValue={props.fullNameAuthor}
            />
            <label htmlFor='input-author' ref='input_author_error' className='none' unselectable='on'>
                Please enter text message
            </label>
            <label htmlFor='input-author' ref='input_author_warning' className='none' unselectable='on'>
                Reached the maximum number(25) of characters
            </label>
        </div>
    }
}