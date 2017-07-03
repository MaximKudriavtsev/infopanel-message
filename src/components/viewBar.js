import React, { Component } from 'react';
import Griddle, { plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
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
    logg(value, e){
        e.target;
        console.log(value);
    }

    MyCustomComponent({ value, rowData }) {
            return (
                <span onClick={this.logg.bind(this, rowData)}>{value}</span>
            );
        }

    render() {
        let that = this,
            eventList = that.props.user.eventList;

        const styleConfig =  {
            classNames: {},
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
            <p>View Bar</p>
            <Griddle data={eventList}
            plugins={[plugins.LocalPlugin]}
            styleConfig={styleConfig} 
            components={{
              Layout:NewLayout
            }}>        

                <RowDefinition >
                    <ColumnDefinition id="text" title="Text" customComponent={enhancedWithRowData(::this.MyCustomComponent)}/>
                    <ColumnDefinition id="author" title="Author" customComponent={enhancedWithRowData(::this.MyCustomComponent)}/>
                    <ColumnDefinition id="location" title="Location" customComponent={enhancedWithRowData(::this.MyCustomComponent)}/>
                    <ColumnDefinition id="correctEventDate" title="Date of event" customComponent={enhancedWithRowData(::this.MyCustomComponent)} />
                    <ColumnDefinition id="correctStartDate" title="Publish date of event" customComponent={enhancedWithRowData(::this.MyCustomComponent)}/>
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