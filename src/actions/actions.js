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

export function changeStartDate(value) {
    return {
        type: 'CHANGE_STARTDATE',
        value: value
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
                    var usersList = [];

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

export function validateError() {
    return {
        type: 'VALIDATE_ERROR'
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
                        var date, hours, min,
                            getHours, getMinutes;

                        date = new Date(time);
                        getHours = date.getHours();
                        getMinutes = date.getMinutes();

                        hours = getHours.lenght == 1 ? '0' + getHours : getHours;
                        min = getMinutes.lenght == 1 ? '0' + getMinutes : getMinutes;
                        return (date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ' ' + hours + ':' + min);
                    }

                    var recordList = [];

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