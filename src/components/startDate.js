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

class StartDate extends Component {
    
    changeStartDate(e) {
        this.props.actions.changeStartDate(e);
    }
    render() {
        let that = this,
            user=that.props.user;

        return <div className='startDate'>
                <label className='startDate-label'>Publish date of event</label> 
                <DateTimePicker 
                    min={new Date()}
                    max={user.eventDate}
                    defaultValue={user.startDate}
                    value={user.startDate}
                    onChange={::that.changeStartDate}
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
export default connect(mapStateToProps, mapDispatchToProps)(StartDate);