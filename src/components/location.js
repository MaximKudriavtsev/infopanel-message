import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom'

import * as actions from '../actions/actions';

class Location extends Component {
    warningMaxSize(e){
        let refs                    = this.refs,
            DOM_input_location      = ReactDOM.findDOMNode(refs.input_location),     
            DOM_input_text_warning  = ReactDOM.findDOMNode(refs.input_text_warning);

        if(DOM_input_location.value.length == 25){
            DOM_input_text_warning.className  = 'warning-label';
        } else {
            DOM_input_text_warning.className  = 'none';               
        } 
    }
    changeLocation(e) {
        this.props.actions.changeLocation(e.target.value.trim());
    }
    componentDidUpdate() {
        let input_location = this.refs.input_location,
            location = this.props.user.location;
        if(location === '') {
            ReactDOM.findDOMNode(input_location).value = '';
        }else{
            ReactDOM.findDOMNode(input_location).value = location;
        }
    }

    render() {
        let that = this;

        return <div className='location'>
                <label className='location-label' htmlFor='input-location' 
                unselectable='on' title='Maximum length is 25 symbol'>Location</label>
                <input className='location-input'
                    id='input-location'
                    ref='input_location'
                    placeholder='Enter location...'
                    onBlur={:: that.changeLocation}
                    onChange={:: that.warningMaxSize}
                    maxLength='25'
                    title='Maximum length is 25 symbol'
                /> 
                <label htmlFor='input-text' ref='input_text_warning' className='none' unselectable='on'>
                    Reached the maximum number(25) of characters
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
export default connect(mapStateToProps, mapDispatchToProps)(Location);