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
            <div onClick={this.editRowData.bind(this, rowData)}>
                <div className='griddle-div'>{value == '' ? ' ' : value}</div>
            </div>
        );
    }
    testFunc(e) {
        let that = this,
            rowGriddle = that.props.user.focusRow;

        if (rowGriddle != '') {
            rowGriddle.className = 'griddle-row';
        }

        var tegs = e.path, i = 0,
            newRow;
        while (tegs[i].tagName != 'TR') {
            i++;
        }
        newRow = tegs[i];
        newRow.className = 'griddle-row-focus';

        this.props.actions.setRowFocus(newRow);
    }
    componentDidMount() {
        this.props.actions.recordListDownload();

    }

    componentDidUpdate(prevProps, prevState) {

        console.log('prevProps', prevProps.user.eventList);
        console.log('this props', this.props.user.eventList);

        if (prevProps.user.eventList.length !== this.props.user.eventList.length/* || prevProps.user.focusRow !== this.props.user.focusRow*/) {
            var tegs = document.getElementsByClassName('griddle-row'), i;
            for (i = 0; i < tegs.length; i++) {
                tegs[i].setAttribute('tabIndex', '-1');
                tegs[i].addEventListener('click', (e) => this.testFunc(e));
            }

            tegs = document.getElementsByClassName('griddle-table-heading-cell');
            while (tegs[0]) {
                tegs[0].setAttribute('class', 'griddle-table-heading-cell-' + tegs[0].innerText);
            }
        }
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
                PageDropdownContainer: 'griddle-page-dropdown-container'
            },
            icons: {},
            styles: {}
        };
        const NewLayout = ({ Table, Filter }) => (
            <div>
                <Filter />
                <Table />
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
                    recordCount: 100,
                    pageSize: 100
                }}
                sortProperties={[{ id: 'eventDate', sortAscending: false }]}
            >
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