import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import Row from './Row.js'

export default class ViewBar extends Component {
    addScroll = () => {
        let that = this,
            elemTable = ReactDOM.findDOMNode(that.refs['table']),
            isScroll, elemHead;

        if (!elemTable) return;

        isScroll = elemTable.offsetWidth > elemTable.scrollWidth;
        elemHead = ReactDOM.findDOMNode(that.refs['viewBar_head']);

        isScroll ? elemHead.setAttribute('class', 'viewBar_head') : elemHead.setAttribute('class', '');
    }
    componentDidMount = () => {
        this.addScroll();
    }
    componentDidUpdate = () => {
        this.addScroll();
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.eventList != nextProps.eventList) || (this.props.focusRow != nextProps.focusRow) ;
    }
    render() {
        let that = this,
            template,
            allData = that.props.eventList,
            data = [],
            clientHeight = document.documentElement.clientHeight,
            height = clientHeight - 94;

        for(var key in allData) {
            if (allData[key].record.messageAuthor == that.props.messageAuthor) {
                data.push(allData[key]);
            }
        }
            
        if (data.length) {
            template = data.map(({record: item, aggregateId: aggregateId }, index) => {
                return (
                    <Row data={item} key={index} aggregateId={aggregateId} focusId={that.props.focusRow} actions={that.props.actions}/>
                )
            });
        } else {
            return (
                <div className='viewBar' >
                    <div className='' ref='viewBar_head'>
                        <table className='viewBar_table' ref='viewBar_table'>
                            <tbody>
                                <tr className='viewBar_table_head'>
                                    <td className='viewBar_table_text' unselectable='on'>Text</td>
                                    <td className='viewBar_table_author' unselectable='on'>Author</td>
                                    <td className='viewBar_table_location' unselectable='on'>Location</td>
                                    <td className='viewBar_table_eventDate' unselectable='on'>Date</td>
                                    <td className='viewBar_table_startDate' unselectable='on'>Shown since</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>No data for view</div>
                </div>)
        }
        return (
            <div className='viewBar'>
                <div className='' ref='viewBar_head'>
                    <table className='viewBar_table'>
                        <tbody>
                            <tr className='viewBar_table_head'>
                                <td className='viewBar_table_text'>Text</td>
                                <td className='viewBar_table_author'>Author</td>
                                <td className='viewBar_table_location'>Location</td>
                                <td className='viewBar_table_eventDate'>Date</td>
                                <td className='viewBar_table_startDate'>Shown since</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='table' ref='table' style={{ height: height }}>
                    <table className='viewBar_table_'>
                        <tbody className='viewBar_tbody'>
                            {template}
                        </tbody>
                    </table>
                </div>
            </div >
        )
    }
}