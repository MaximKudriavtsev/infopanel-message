import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/actions';

class Row extends Component {
    onRowClick() {
        this.props.actions.editRowData(this.props.data);
    }
    render() {
        var that = this,
            data = that.props.data;

        return (
            <tr className='viewBar_table_tr' tabIndex='1' onClick={::that.onRowClick}>
                <td className='viewBar_table_text'>{data.text}</td>
                <td className='viewBar_table_author'>{data.author}</td>
                <td className='viewBar_table_location'>{data.location}</td>
                <td className='viewBar_table_eventDate'>{data.correctEventDate}</td>
                <td className='viewBar_table_startDate'>{data.correctStartDate}</td>
            </tr >
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}
export default connect(null, mapDispatchToProps)(Row);