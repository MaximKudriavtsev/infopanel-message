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

export function updateRecord() {
    return {
        type: 'UPDATE_RECORD'
    }
}

export function createRecord() {
    return {
        type: 'CREATE_RECORD'
    }
}

export function buttonSave() {
    return {
        type: 'BUTTON_SAVE'
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