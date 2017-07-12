import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/actions';

class Buttons extends Component {
    onButtonSave() {
        let user    = this.props.user,
            actions = this.props.actions;

        if(user.text && user.author && user.eventDate && user.startDate){
            (user.id < 0) ? actions.createRecord() : actions.updateRecord();
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
        let that = this,
          user = that.props.user,
          idUser = user.id;

        return <div className='buttons'>
                <button className={idUser >= 0 ? 'buttons-buttonDelete' : 'none' }
                    onClick={:: that.onButtonDelete}
                    unselectable='on'> 
                    Delete
                </button>
                <button className={idUser >= 0 ? 'buttons-buttonCancel' : 'none' }
                    onClick={:: that.onButtonCancel}
                    unselectable='on'> 
                    Cancel
                </button>
                <button className='buttons-buttonSave' 
                  onClick={:: that.onButtonSave}
                  unselectable='on'> 
                    { idUser < 0 ? 'Create' : 'Save' }
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