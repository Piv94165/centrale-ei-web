const mongoose = require("mongoose");
const MovieModel = require("./models/movies");
const axios = require("axios");

async function fetchMoviesFromTheMovieDatabase() {
  // TODO: fetch movies from the The Movie Database API
  const results = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&language=en-US&page=1`
  );

  return results.data.results;
}

async function populateMovies(movies) {
  // TODO: populate movies into the database
  for (const movie of movies) {
    const newMovie = new MovieModel({
      // Movie attributes
      title: movie.title,
    });
    // Save the movie in database
    await newMovie.save();
  }
}

async function populate() {
  // Connect mongoose client
  const client = await mongoose.connect(process.env.MONGO_DB_URL);

  const movies = await fetchMoviesFromTheMovieDatabase();

  const connection = mongoose.connection;

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
