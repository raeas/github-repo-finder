'use strict';

function getRepo(searchTerm) {
  fetch(`https://api.github.com/users/${searchTerm}/repos`)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
        throw new Error(response.statusText);
    })
    .then(responseJson => {
        showResults(responseJson)
      })
    .catch (err => {
      showError(err.message);
    });
}

//show result if found
function showResults(responseJson) {
  $('.results-header').empty();
  $('.results-list').empty();
  let userHandle = responseJson[0].owner.login
  $('.results-container').removeClass('hidden')
  $('.results-header').append(`<h3>Results for: <span class="handle">${userHandle}</span></h3>`)
  for (let i = 0; i < responseJson.length; i++) {
      let repoInfo = `
      <ul class="items">
        <li>
        <p>${responseJson[i].name}</p>
        <p><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p>
        </li>
        <hr>
      </ul>  `
      $('.results-list').append(repoInfo)
  }
}

//show error if caught
function showError(error) {
  $('.results-container').removeClass('hidden');
  $('.results-header').html(`<h4>Error message: ${error}.</h4>`);
}

//event listner function
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#github-handle').val();
    getRepo(searchTerm);
  });
};

$(watchForm);