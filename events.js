'use strict'

const apiKey = '8hXcxO2cfZCudAX4QJpcfoEy6Ikfu8xweIUImtu0'
const apiUrl = 'https://developer.nps.gov/api/v1/parks?stateCode='
const stC = $('#js-state').val().toUpperCase();

function findPark(stC, maxResults) {
    fetch(`${apiUrl}${stC}&limit=${maxResults}&api_key=${apiKey}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        } return response.json();
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

function showPark(responseJson) {
    $('#js-state').empty();
    $('#js-max-results').empty();
    let i = responseJson;
    for(i = 0; responseJson.data.length; i++) {
        $('#park-list').append(
        `<li class=actualResults>
        <h3><a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].fullName}</a></h3>
        <p>States: ${responseJson.data[i].states}</p>
        <p class="details">${responseJson.data[i].description}</p>
        <p class="details">${responseJson.data[i].weatherInfo}</p>
        </li>`
        )
    }
   
}

function watchForm() {
    $('#search').on('submit', function(e) {
      e.preventDefault();
      console.log(e);
      const stC = $('#js-state').val().toUpperCase();
      const maxResults = $('#js-max-results').val();
    //   getPark(maxResults);
       findPark(stC, maxResults);
    })
  }

function runApi() {
    watchForm();
    // getPark(maxResults)
}

$(runApi);

  
//https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=INSERT-API-KEY-HERE
//stC.toUpperCase
//fetch(`${apiUrl}${stC}&limit=${maxResults}&api_key=${apiKey}`)