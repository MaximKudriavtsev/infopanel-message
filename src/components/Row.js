import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/actions';

class Row extends Component {
    onRowClick() {
        let props = this.props;
        props.actions.editRowData(props.data);
    }
    render() {
        let that  = this,
            data  = that.props.data;
        return (
            <tr className={this.props.user.focusKey == data.id ? 'viewBar_table_tr_focus' : 'viewBar_table_tr' }
              tabIndex='-1' onClick={::that.onRowClick}>
                <td className='viewBar_table_text'>{data.text}</td>
                <td className='viewBar_table_author'>{data.author}</td>
                <td className='viewBar_table_location'>{data.location}</td>
                <td className='viewBar_table_eventDate'>{data.correctEventDate}</td>
                <td className='viewBar_table_startDate'>{data.correctStartDate}</td>
            </tr >
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(Row);