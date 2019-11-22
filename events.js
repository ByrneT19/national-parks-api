'use strict'

const apiKey = '8hXcxO2cfZCudAX4QJpcfoEy6Ikfu8xweIUImtu0'
const apiUrl = 'https://developer.nps.gov/api/v1/parks?parkCode='
// const stC = $('#js-state').val().toUpperCase();

function findPark() {
    fetch(`${apiUrl}${stC}&api_key=${apiKey}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } throw new Error(response.statusText);
    })
    .then(responseJson => showPark(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    })        
}

function queryParams(params) {
    const query = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return query.join('&');
}

function getPark(query, maxResults=10) {
    const params = {
        key: apiKey,
        stateCode: query,
        maxResults
    }
    queryParams(params);
}

function showPark() {
    //will use a for loop to show the relevant data in the parkResults div via .html
}

function watchForm() {
    $('#search').on('submit', function(e) {
      e.event.preventDefault();
      console.log(e);
      const stC = $('#js-state').val().toUpperCase;
      const maxResults = $('#js-max-results').val();
      getPark(stC, maxResults);
    })
  }

function runApi() {
    watchForm();
}

$(runApi);

  
//https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=INSERT-API-KEY-HERE
//stC.toUpperCase