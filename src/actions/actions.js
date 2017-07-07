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
                var usersObj,
                    usersList = [];
                response.json().then(function (data) {
                    usersObj = data;
                    console.log('query Users => ');
                    for (var key in usersObj) {
                        usersList.push(usersObj[key].name + ' ' + usersObj[key].surname);
                    }

                    console.log(usersList);
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
                var recordList = [];

                response.json().then(function (data) {
                    console.log('query /query_user_records => ');


                    for (var key in data) {
                        var date, hours, min;

                        recordList.push(data[key]);


                        date = new Date(recordList[key].eventDate);

                        hours = date.getHours().lenght == 1 ? '0' + date.getHours() : date.getHours();
                        min = date.getMinutes().lenght == 1 ? '0' + date.getMinutes() : date.getMinutes();
                        recordList[key].correctEventDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ' ' + hours + ':' + min;

                        date = new Date(recordList[key].startDate);
                        hours = date.getHours().lenght == 1 ? '0' + date.getHours() : date.getHours();
                        min = date.getMinutes().lenght == 1 ? '0' + date.getMinutes() : date.getMinutes();
                        recordList[key].correctStartDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ' ' + hours + ':' + min;
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