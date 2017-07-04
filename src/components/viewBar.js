import React, { Component } from 'react';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/actions';

class ViewBar extends Component {
    render() {
        let that = this,
            eventList = that.props.user.eventList;

        const styleConfig = {
            classNames: {
                Cell: 'griddle-cell',
                Filter: 'griddle-filter',
                Loading: 'griddle-loadingResults',
                NextButton: 'griddle-next-button',
                NoResults: 'griddle-noResults',
                PageDropdown: 'griddle-page-select',
                Pagination: 'griddle-pagination',
                PreviousButton: 'griddle-previous-button',
                Row: 'griddle-row',
                RowDefinition: 'griddle-row-definition',
                Settings: 'griddle-settings',
                SettingsToggle: 'griddle-settings-toggle',
                Table: 'griddle-table',
                TableBody: 'griddle-table-body',
                TableHeading: 'griddle-table-heading',
                TableHeadingCell: 'griddle-table-heading-cell',
                TableHeadingCellAscending: 'griddle-heading-ascending',
                TableHeadingCellDescending: 'griddle-heading-descending',
                PageDropdownContainer:'griddle-page-dropdown-container'
            },
            icons: {},
            styles: {}
        };
        const NewLayout = ({ Table, Pagination, Filter }) => (
            <div>
                <Filter />
                <Table />
                <Pagination />
            </div>
        );

        return <div className='app-viewBar'>
            <Griddle data={eventList}
                plugins={[plugins.LocalPlugin]}
                styleConfig={styleConfig}
                components={{
                    Layout: NewLayout
                }}
                pageProperties={{
                    currentPage: 1,
                    pageSize: 17,
                    recordCount: 100
                }}>
                <RowDefinition >
                    <ColumnDefinition id="text" title="Text" width="18%" />
                    <ColumnDefinition id="author" title="Author" width="10%" />
                    <ColumnDefinition id="location" title="Location" width="18%" />
                    <ColumnDefinition id="correctEventDate" title="Date of event" width="12%" />
                    <ColumnDefinition id="correctStartDate" title="Publish date of event" width="12%" />
                </RowDefinition>
            </Griddle>
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewBar);