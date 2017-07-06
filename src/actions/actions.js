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

    setTimeout(() => {
      dispatch({
        type: 'GET_USERS_SUCCESS',
        value: [1,2,3,4,5]
      })
    }, 1000)
  }
}