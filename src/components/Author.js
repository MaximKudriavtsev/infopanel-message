import React, { Component } from 'react';

import { DropdownList } from 'react-widgets';
import 'react-widgets/lib/less/react-widgets.less';

export default class Author extends Component {
    changeAuthor = (e) => {
        this.props.actions.changeAuthor(e);
    }
    render() {
        let that = this,
            props = that.props;
        return <div className='author'>
            <label className='author-label' unselectable='on'
                title='Организатор мероприятия'>Докладчик</label>
            <DropdownList
                className='author-dropdownList'
                data={props.authorList}
                valueField='email' textField='displayName'
                filter='contains'
                title='Организатор мероприятия'
                value={{email: props.author, displayName: props.fullNameAuthor }}
                defaultValue={{email: props.messageAuthor, displayName: props.displayName}}
                onChange={that.changeAuthor}
                />
            </div>
    }
}