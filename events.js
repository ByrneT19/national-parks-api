'use strict'

const apiKey = '8hXcxO2cfZCudAX4QJpcfoEy6Ikfu8xweIUImtu0'
const apiUrl = 'https://developer.nps.gov/api/v1/parks?parkCode='
const stC = $('#js-state').val();

function findPark() {
    fetch(`${apiUrl}/parks?parkCode=${stC}&${apiKey}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } throw new Error(response.statusText);
    })
    .then(responseJson => console.log(JSON.stringify(responseJson)))
    .catch(err => {
        $('#js-error-message').html(`Sorry something went wrong! Please try again!`)
    })        
}

function queryParams(params) {
    const query = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return query.join('&');
}

function getPark(maxResults=10) {
    const params = {
        key: apiKey,
        stateCode: stC,
        maxResults
    }
}

function runApi() {
    findPark();
}

$(runApi);

  
//https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=INSERT-API-KEY-HERE