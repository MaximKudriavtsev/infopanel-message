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

class StartDate extends Component {
    validate(e){
        let DOM_input_startDate_error = ReactDOM.findDOMNode(this.refs.input_startDate_error);        
        if(e == null) {
            DOM_input_startDate_error.className  = 'error-label';
        } else {
            DOM_input_startDate_error.className  = 'none';
        }
    }
    changeStartDate(e) {
        this.validate(e);
        this.props.actions.changeStartDate(e);
    }
    componentDidUpdate(){
        this.validate(this.props.user.startDate);
    }
    render() {
        let that = this,
            user=that.props.user;

        return <div className='startDate'>
                <label className='startDate-label' unselectable='on'>Show message from date</label> 
                <DateTimePicker 
                    min={new Date()}
                    max={new Date(user.eventDate)}
                    defaultValue={new Date(user.startDate)}
                    value={new Date(user.startDate)}
                    onChange={::that.changeStartDate}
                    format={"dd.MM.yyyy HH:mm"}
                    timeFormat={"HH:mm"}
                />
                <label ref='input_startDate_error' className='none' unselectable='on'>
                    Please choose start date
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
export default connect(mapStateToProps, mapDispatchToProps)(StartDate);