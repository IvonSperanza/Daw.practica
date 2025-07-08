var getAllBtn = document.getElementById('getAllBtn');
var filterForm = document.getElementById('filterForm');
var resultsDiv = document.getElementById('results');
var errorDiv = document.getElementById('error');

getAllBtn.addEventListener('click', function () {
  fetchCharacters('https://rickandmortyapi.com/api/character');
});

filterForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var name = document.getElementById('name').value;
  var status = document.getElementById('status').value;
  var species = document.getElementById('species').value;
  var type = document.getElementById('type').value;
  var gender = document.getElementById('gender').value;

  var url = 'https://rickandmortyapi.com/api/character/?';
  if (name) url += 'name=' + encodeURIComponent(name) + '&';
  if (status) url += 'status=' + encodeURIComponent(status) + '&';
  if (species) url += 'species=' + encodeURIComponent(species) + '&';
  if (type) url += 'type=' + encodeURIComponent(type) + '&';
  if (gender) url += 'gender=' + encodeURIComponent(gender);

  fetchCharacters(url);
});

function fetchCharacters(url) {
  errorDiv.textContent = '';
  resultsDiv.innerHTML = '';

  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('No se encontraron personajes');
      }
      return response.json();
    })
    .then(function (data) {
      displayCharacters(data.results);
    })
    .catch(function (error) {
      errorDiv.textContent = error.message;
    });
}

function displayCharacters(characters) {
  resultsDiv.innerHTML = '';
  for (var i = 0; i < characters.length; i++) {
    var character = characters[i];
    var card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = '<img src="' + character.image + '" alt="' + character.name + '">' +
                     '<h3>' + character.name + '</h3>' +
                     '<p>' + character.status + ' - ' + character.species + '</p>';
    resultsDiv.appendChild(card);
  }
}
