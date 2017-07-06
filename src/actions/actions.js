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
                });
                dispatch({
                    type: 'GET_USERS_SUCCESS',
                    value: usersList
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