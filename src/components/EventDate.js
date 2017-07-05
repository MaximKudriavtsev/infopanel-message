import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/actions';

import 'react-widgets/lib/less/react-widgets.less';
import {DateTimePicker} from 'react-widgets';

const Globalize = require('globalize');
const globalizeLocalizer = require('react-widgets/lib/localizers/globalize');
Globalize('ru');
globalizeLocalizer(Globalize);

class EventDate extends Component {
    
    changeEventDate(e) {
        this.props.actions.changeEventDate(e);
    }
    render() {
        let that = this;
            
        return <div className='eventDate'>
                <label className='eventDate-label'>Date of event</label> 
                <DateTimePicker 
                    min={new Date()}
                    defaultValue={new Date()}
                    onChange={::that.changeEventDate}
                    format={"d.M.yyyy hh:mm"}
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
export default connect(mapStateToProps, mapDispatchToProps)(EventDate);