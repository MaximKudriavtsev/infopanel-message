import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/actions';

class Buttons extends Component {
    onButtonSave() {
        let user    = this.props.user,
            actions = this.props.actions;
        if(user.text && user.author && user.eventDate && user.startDate){
            if(user.focusRow != '') {
                user.focusRow.className = 'griddle-row';
            }
            actions.buttonSave();
        } else {
            actions.validateError();
        }
    }
    onButtonDelete(){
        let props = this.props,
            focusRow = props.user.focusRow;
        if(focusRow != '') {
            focusRow.className = 'griddle-row';
        }
        props.actions.buttonDelete(this.props.user.id);
    }
    onButtonCancel(){
        let props = this.props,
            focusRow = props.user.focusRow;
        if(focusRow != '') {
            focusRow.className = 'griddle-row';
        }
        props.actions.buttonCancel();
    }
    render() {
        let that = this;

        return <div className='buttons'>
                <button className='buttons-buttonSave' onClick={:: that.onButtonSave}> 
                    Save
                </button>
                <button className='buttons-buttonDelete' onClick={:: that.onButtonDelete}> 
                    Delete
                </button>
                <br></br>
                <button className='buttons-buttonCancel' onClick={:: that.onButtonCancel}> 
                    Cancel
                </button>
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
export default connect(mapStateToProps, mapDispatchToProps)(Buttons);