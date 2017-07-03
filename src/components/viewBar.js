import React, { Component } from 'react';
import Griddle, { plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/actions';

class ViewBar extends Component {
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
            <Griddle data={eventList}
                plugins={[plugins.LocalPlugin]}
                styleConfig={styleConfig} 
                components={{
                    Layout:NewLayout  
                }}>        
                <RowDefinition hidden>
                    <ColumnDefinition id="text" title="Text"/>
                    <ColumnDefinition id="author" title="Author"/>
                    <ColumnDefinition id="location" title="Location"/>
                    <ColumnDefinition id="correctEventDate" title="Date of event" />
                    <ColumnDefinition id="correctStartDate" title="Publish date of event"/>
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