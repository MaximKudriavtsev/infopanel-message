import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../actions/actions'

import 'react-widgets/lib/less/react-widgets.less';
import {DateTimePicker} from 'react-widgets'

var Globalize = require('globalize')
var globalizeLocalizer = require('react-widgets/lib/localizers/globalize')
Globalize('ru');
globalizeLocalizer(Globalize);

class EventDate extends Component {
    
    changeEventDate(e) {
        this.props.actions.changeEventDate(e);
    }
    render() {
        var that = this;
            
        return <div>
                <label>eventDate</label> 
                <DateTimePicker 
                    defaultValue={new Date()}
                    onChange={::that.changeEventDate}
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