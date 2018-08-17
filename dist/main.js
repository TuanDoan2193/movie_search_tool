const moviesDiv = document.querySelector("#movies");
const movieDiv = document.querySelector("#movie");
$(document).ready(() => {
  $("#searchForm").on("submit", function(e) {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  fetch("http://www.omdbapi.com/?s=" + searchText + "&apikey=71044821")
    .then(res => {
      return res.json();
    })
    .then(data => {
      let movies = data.Search;
      let output = "";
      movies.forEach(function(movie) {
        output += `
        <div class="col-md-3">
          <div class="card text-center">
            <img src="${movie.Poster}">
            <h5>${movie.Title}</h5>
            <a onclick="movieSelected('${
              movie.imdbID
            }')" class="btn btn-primary mx-auto" href="#"> Movie Details</a>
          </div>
        </div>
        `;
      });
      console.log(movies);
      moviesDiv.innerHTML = output;
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  fetch("http://www.omdbapi.com/?i=" + movieId + "&apikey=71044821")
    .then(res => res.json())
    .then(data => {
      let output = `
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <img src="${data.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${data.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${
                data.Genre
              }</li>
              <li class="list-group-item"><strong>Released:</strong> ${
                data.Released
              }</li>
              <li class="list-group-item"><strong>Rated:</strong> ${
                data.Rated
              }</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${
                data.imdbRating
              }</li>
              <li class="list-group-item"><strong>Director:</strong> ${
                data.Director
              }</li>
              <li class="list-group-item"><strong>Writer:</strong> ${
                data.Writer
              }</li>
              <li class="list-group-item"><strong>Actors:</strong> ${
                data.Actors
              }</li>
            </ul>
          </div>
        </div>
        <div class="row movie-plot-card">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">Plot</h3>
              <p class="card-text">${data.Plot}</p>
              <hr>
              <div class= "text-center">
                <a href="http://imdb.com/title/${
                  data.imdbID
                }" target="_blank" class="btn btn-primary">View IMDB</a>
                <a href="index.html" class="btn btn-primary">Go back to search</a>
              </div>
            </div>
          </div>
        </div>
      </div>`;

      movieDiv.innerHTML = output;
    });
}
