import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/actions';

import 'react-widgets/lib/less/react-widgets.less';
import {DropdownList } from 'react-widgets';

class Author extends Component {
    changeAuthor(e) {
        this.props.actions.changeAuthor(e);
    }

    render() {
        let that = this,
            user = that.props.user;
        
        return <div className='author'>
                <label className='author-label' unselectable='on'>Author</label>
                <DropdownList 
                    className='author-dropdownList'
                    data={user.authorList}
                    filter='contains'
                    placeholder='Choose author...'
                    value={user.author}
                    defaultValue={user.messageAuthor}
                    onChange={::that.changeAuthor}
                />
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
export default connect(mapStateToProps, mapDispatchToProps)(Author);