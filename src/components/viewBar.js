import React, { Component } from 'react';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/actions';

const rowDataSelector = (state, { griddleKey }) => {
    return state
            .get('data')
            .find(rowMap => rowMap.get('griddleKey') === griddleKey)
            .toJSON();
};

const enhancedWithRowData = connect((state, props) => {
    return {
        rowData: rowDataSelector(state, props)
    };
});

class ViewBar extends Component {
    editRowData(value, e) {
        e.target;
        this.props.actions.editRowData(value);
    }

    MyCustomComponent({ value, rowData }) {
            return (
                <span onClick={this.editRowData.bind(this, rowData)}>{value}</span>
            );
        }

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
                    pageSize: 17,
                    recordCount: 100
                }}>
                <RowDefinition >
                    <ColumnDefinition id="text" title="Text" width="20%" customComponent={enhancedWithRowData(::this.MyCustomComponent)} />
                    <ColumnDefinition id="author" title="Author" width="10%" customComponent={enhancedWithRowData(::this.MyCustomComponent)} />
                    <ColumnDefinition id="location" title="Location" width="18%" customComponent={enhancedWithRowData(::this.MyCustomComponent)} />
                    <ColumnDefinition id="correctEventDate" title="Date of event" width="8%" customComponent={enhancedWithRowData(::this.MyCustomComponent)} />
                    <ColumnDefinition id="correctStartDate" title="Publish date of event" width="10%" customComponent={enhancedWithRowData(::this.MyCustomComponent)} />
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