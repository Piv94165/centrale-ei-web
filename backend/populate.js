const mongoose = require("mongoose");
const MovieModel = require("./models/movies");
const axios = require("axios");

async function fetchMoviesFromTheMovieDatabase() {
  // TODO: fetch movies from the The Movie Database API
  //   const results = await axios.get(
  //     `https://api.themoviedb.org/3/movie/popular?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&language=en-US&page=1`
  //   );
  let db_movies = [];
  for (let i = 1; i < 21; i++) {
    console.log(i);
    const results = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=522d421671cf75c2cba341597d86403a&page=${i}`
    );
    console.log("boucle " + i);
    console.log(results);
    db_movies = db_movies.concat(results.data.results);
  }
  console.log(db_movies);

  return db_movies;
}

async function populateMovies(movies) {
  // TODO: populate movies into the database
  for (const movie of movies) {
    const newMovie = new MovieModel({
      // Movie attributes
      title: movie.title,
      description: movie.description,
      url: movie.url,
      viewers: movie.viewers,
      date: movie.date,
      genre: movie.genre,
      popularity: movie.popularity,
      runtime: movie.runtime,
    });
    // Save the movie in database
    await newMovie.save();
  }
}

async function populate() {
  // Connect mongoose client
  const client = await mongoose.connect(process.env.MONGO_DB_URL);
  console.log("client créé");
  const movies = await fetchMoviesFromTheMovieDatabase();
  console.log("movies créé");
  const connection = mongoose.connection;
  console.log("connection créée");
  await connection.db.dropCollection("movies");

  await populateMovies(movies);

  // disconnect mongoose client
  await client.disconnect();
}

populate()
  .then(() => {
    console.log("All done !");
  })
  .catch((error) => {
    console.error(error);
  });
