export function getEventList() {
    var list = [];

    for (var i = 0, len = localStorage.length; i < len; i++) {
        var key = localStorage.key(i),
            date, hours, min;

        list.push(JSON.parse(localStorage[key]));

        date = new Date(list[i].eventDate);
        hours = date.getHours().lenght == 1 ? '0' + date.getHours() : date.getHours();
        min = date.getMinutes().lenght == 1 ? '0' + date.getMinutes() : date.getMinutes();
        list[i].correctEventDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + ' ' + hours + ':' + min;

        date = new Date(list[i].startDate);
        hours = date.getHours().lenght == 1 ? '0' + date.getHours() : date.getHours();
        min = date.getMinutes().lenght == 1 ? '0' + date.getMinutes() : date.getMinutes();
        list[i].correctStartDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + ' ' + hours + ':' + min;
    }

    return list;
}

export function queryUsers() {
    var usersObj,
        usersList = [];

    fetch('/query_users')
        .then(function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
 
            response.json().then(function (data) {
                usersObj = data;
                console.log('query Users => ');

                for(var key in usersObj) {
                    usersList.push(usersObj[key].name +' '+ usersObj[key].surname);
                }

                console.log(usersList);
                return usersList;
            });
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

export function sendData(sData) {
    fetch('/send_data', {
            method: 'POST',
            body: JSON.stringify(sData),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        .then(function () {
            console.log('Request succeeded');
        })
        .catch(function (error) {
            console.log('Request failed', error);
    });
}

