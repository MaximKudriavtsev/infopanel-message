export function createRecord(sData) {
    fetch('/create_data', {
        method: 'POST',
        body: JSON.stringify(sData),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then(function () {
        console.log('Send data succeeded');
    }).catch(function (error) {
        console.log('Request failed', error);
    });
}

export function updateRecord(sData) {
    fetch('/update_data', {
        method: 'POST',
        body: JSON.stringify(sData),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then(function () {
        console.log('Send data succeeded');
    }).catch(function (error) {
        console.log('Request failed', error);
    });
}

export function deleteData(data) {
    fetch('/delete_data', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then(function () {
        console.log('Delete data succeeded');
    }).catch(function (error) {
        console.log('Request failed', error);
    });
}