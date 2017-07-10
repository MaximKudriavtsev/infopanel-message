import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/actions';

class Buttons extends Component {
    onButtonSave() {
        this.props.actions.recordListDownload();
        let user    = this.props.user,
            actions = this.props.actions;
        if(user.text && user.author && user.eventDate && user.startDate){
            actions.buttonSave();
        } else {
            actions.validateError(user.id);
        }
    }
    onButtonDelete(){
        this.props.actions.buttonDelete(this.props.user.id);
    }
    onButtonCancel(){
        this.props.actions.buttonCancel();
    }
    render() {
        let that = this;

        return <div className='buttons'>
                <button className='buttons-buttonSave' onClick={:: that.onButtonSave}> 
                    Save
                </button>
                <button className={this.props.user.id >= 0 ? 'buttons-buttonDelete' : 'none' }
                    onClick={:: that.onButtonDelete}> 
                    Delete
                </button>
                <br></br>
                <button className={this.props.user.id >= 0 ? 'buttons-buttonCancel' : 'none' }
                    onClick={:: that.onButtonCancel}> 
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