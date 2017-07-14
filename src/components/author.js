import React, { Component } from 'react';

import { DropdownList } from 'react-widgets';
import 'react-widgets/lib/less/react-widgets.less';

export default class Author extends Component {
    changeAuthor(e) {
        this.props.actions.changeAuthor(e);
    }
    render() {
        let that = this,
            props = that.props;

        return <div className='author'>
            <label className='author-label' unselectable='on'
                title='Event organizer'>Author</label>
            <DropdownList
                className='author-dropdownList'
                data={props.authorList}
                filter='contains'
                placeholder='Choose author...'
                value={props.author}
                defaultValue={props.messageAuthor}
                onChange={::that.changeAuthor}
                />
            </div>
    }
}