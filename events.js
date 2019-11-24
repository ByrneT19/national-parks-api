'use strict'

const apiKey = '8hXcxO2cfZCudAX4QJpcfoEy6Ikfu8xweIUImtu0'
const apiUrl = 'https://developer.nps.gov/api/v1/parks?stateCode='
const stC = $('#js-state').val();
const maxResults = $('#js-max-results').val();

function findPark(stC, maxResults = 10) {
    fetch(`${apiUrl}${stC}&limit=${maxResults}&api_key=${apiKey}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        } 
        return response.json();
    })
    .then(responseJson => showPark(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    })        
}

function showPark(responseJson) {
    $('#js-state').val("");
    $('#js-max-results').val("");
    $('#park-list').empty();
    let i = null;
    for(i = 0; i < responseJson.data.length; i++) {
        $('#park-list').append(
        `<li class=actualResults>
        <h3><a href="${responseJson.data[i].url == null ? '' : responseJson.data[i].url}" target="_blank">${responseJson.data[i].fullName}</a></h3>
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
      const stC = $('#js-state').val().toUpperCase().split(' ', 3);
      const maxResults = $('#js-max-results').val();
        if(stC && maxResults){
            findPark(stC, maxResults);
            } else {
                alert("error in form")
            }
        })
        
}

function runApi() {
    watchForm();
}

$(runApi);

  
//https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=INSERT-API-KEY-HERE
//stC.toUpperCase
//fetch(`${apiUrl}${stC}&limit=${maxResults}&api_key=${apiKey}`)