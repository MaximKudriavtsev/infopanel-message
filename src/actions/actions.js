export function changeRate(value, number, chart) {
    return {
        type: 'CHANGE_RATE',
        value: value,
        number: number,
        chart: chart
    }
}

export function changeText(value) {
    return {
        type: 'CHANGE_TEXT',
        value: value
    }
}

export function changeAuthor(value) {
    return {
        type: 'CHANGE_AUTHOR',
        value: value
    }
}

export function changeLocation(value) {
    return {
        type: 'CHANGE_LOCATION',
        value: value
    }
}

export function changeEventDate(value) {
    return {
        type: 'CHANGE_EVENTDATE',
        value: value
    }
}

export function changeStartDate(day, dayRange) {
    return {
        type: 'CHANGE_STARTDATE',
        day: day,
        dayRange : dayRange
    }
}

export function buttonSave() {
    return {
        type: 'BUTTON_SAVE'
    }
}

export function userListDownload() {
    return (dispatch) => {
        dispatch({
            type: 'GET_USERS_REQUEST'
        })

        fetch('/query_users')
            .then(function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                }
                response.json().then(function (data) {
                    let usersList = [];

                    for (var key in data) {
                        usersList.push(data[key].name + ' ' + data[key].surname);
                    }

                    dispatch({
                        type: 'GET_USERS_SUCCESS',
                        value: usersList
                    });
                });
            })
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
                dispatch({
                    type: 'GET_USERS_FAILURE',
                    value: err
                })
            });
    }
}

export function editRowData(value) {
    return {
        type: 'EDIT_ROW_DATA',
        value: value
    }
}

export function buttonDelete(value) {
    return {
        type: 'BUTTON_DELETE',
        value: value
    }
}

export function buttonCancel() {
    return {
        type: 'BUTTON_CANCEL'
    }
}

export function setRowFocus(value) {
    return {
        type: 'SET_ROW_FOCUS',
        value: value
    }
}

export function validateError(value){
    return{
        type: 'VALIDATE_ERROR',
        value: value
    }
}

export function recordListDownload() {
    return (dispatch) => {
        dispatch({
            type: 'GET_RECORDS_REQUEST'
        })

        fetch('/query_user_records')
            .then(function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                }

                response.json().then(function (data) {
                    function getCorrectDate(time) {
                        let date, 
                            day, month, hours, min, 
                            getDay, getMonth, getHours, getMinutes;

                        date        = new Date(time);
                        getDay      = date.getDate().toString();
                        getMonth    = (date.getMonth() + 1).toString();
                        getHours    = date.getHours().toString();
                        getMinutes  = date.getMinutes().toString();

                        day     = getDay.length == 1 ? '0' + getDay : getDay;
                        month   = getMonth.length == 1 ? '0' + getMonth : getMonth;
                        hours   = getHours.length == 1 ? '0' + getHours : getHours;
                        min     = getMinutes.length == 1 ? '0' + getMinutes : getMinutes;
                        return (day + '.' + month + '.' + date.getFullYear() + ' ' + hours + ':' + min);
                    }

                    let recordList = [];

                    for (var key in data) {
                        recordList.push(data[key]);

                        recordList[key].correctEventDate = getCorrectDate(recordList[key].eventDate);
                        recordList[key].correctStartDate = getCorrectDate(recordList[key].startDate);
                    }
                    dispatch({
                        type: 'GET_RECORDS_SUCCESS',
                        value: recordList
                    });
                });
            })
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
                dispatch({
                    type: 'GET_RECORDS_FAILURE',
                    value: err
                })
            });
    }
}