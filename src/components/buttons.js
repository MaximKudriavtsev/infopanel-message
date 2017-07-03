import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/actions';

class Buttons extends Component {
    onButtonSave() {
        let user = this.props.user;
        if(user.text && user.author && user.eventDate && user.startDate){
            this.props.actions.buttonSave();
        } else {
            alert('Не все поля заполнены');           
        }
    }
    render() {
        let that = this;

        return <div>
                <button className='edit-buttonSave' onClick={:: that.onButtonSave}> 
                    Save
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