import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/actions';

import 'react-widgets/lib/less/react-widgets.less';
import {DateTimePicker} from 'react-widgets';

import ReactDOM from 'react-dom'

const Globalize = require('globalize');
const globalizeLocalizer = require('react-widgets/lib/localizers/globalize');
Globalize('ru');
globalizeLocalizer(Globalize);

class EventDate extends Component {
    validate(e){
        let DOM_input_eventDate_error = ReactDOM.findDOMNode(this.refs.input_eventDate_error);
        if(e == null) {
            DOM_input_eventDate_error.className  = 'error-label';
        } else {
            DOM_input_eventDate_error.className  = 'none';
        }
    }
    changeEventDate(e) {
        this.validate(e);
        this.props.actions.changeEventDate(e);
    }
    componentDidUpdate(){
        this.validate(this.props.user.eventDate);
    }
    render() {
        let that = this;

        console.log(that.props.user);
            
        return <div className='eventDate'>
                <label className='eventDate-label' unselectable='on'>Date of event</label> 
                <DateTimePicker 
                    min={new Date()}
                    defaultValue={new Date()}
                    value={new Date(that.props.user.eventDate)}
                    onChange={::that.changeEventDate}
                    format={"dd.MM.yyyy HH:mm"}
                    timeFormat={"HH:mm"}
                />
                <label ref='input_eventDate_error' className='none' unselectable='on'>
                    Please choose event date
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
export default connect(mapStateToProps, mapDispatchToProps)(EventDate);