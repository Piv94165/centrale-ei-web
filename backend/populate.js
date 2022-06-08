const mongoose = require("mongoose");
const MovieModel = require("./models/movies");
const CastingModel = require("./models/castings");
const ActorModel = require("./models/actors");
const axios = require("axios");

async function fetchMoviesFromTheMovieDatabase() {
  // TODO: fetch movies from the The Movie Database API
  //   const results = await axios.get(
  //     `https://api.themoviedb.org/3/movie/popular?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&language=en-US&page=1`
  //   );
  let db_movies = [];
  for (let i = 1; i < 2; i++) {
    const results = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=522d421671cf75c2cba341597d86403a&page=${i}`
    );
    db_movies = db_movies.concat(results.data.results);
  }
  return db_movies;
}

async function fetchActorsByMovieId(id_movie) {
  // TODO: fetch movies from the The Movie Database API
  //   const results = await axios.get(
  //     `https://api.themoviedb.org/3/movie/popular?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&language=en-US&page=1`
  //   );
  const results = axios
    .get(
      `http://api.themoviedb.org/3/movie/${id_movie}/casts?api_key=522d421671cf75c2cba341597d86403a`
    )
    .then((result) => {
      return result.data.cast;
    });
  return results;
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
    const casting = await fetchActorsByMovieId(movie.id);
    // Save the movie in database
    let id_movie = await MovieModel.findOne({ title: movie.title });
    console.log("id_movie =" + id_movie);
    if (id_movie == null) {
      id_movie = await newMovie.save();
    }

    console.log(id_movie.id);
    // for (const actor of casting) {
    //   const newActor = new ActorModel({
    //     name: actor.name,
    //     popularity: actor.popularity,
    //     profile_path: actor.profile_path,
    //   });
    //   // const id_actor = await newActor.updateOne({name: actor.name}, {"id_movie": movie["id_movie"], "id_user": movie["id_user"], "score": movie["rating"]}, True)
    //   const id_actor = await newActor.save();
    // const newCasting = new CastingModel({
    //   id_actor: id
    // })
    // }
  }
}

// async function fetchActorsFromTheMovieDatabase() {
//   // TODO: fetch movies from the The Movie Database API
//   //   const results = await axios.get(
//   //     `https://api.themoviedb.org/3/movie/popular?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&language=en-US&page=1`
//   //   );

//   const newCasting = new CastingModel({
//     // Rating attributes
//     id_movie: req.params["id"],
//     id_user: id_user,
//     rating: req.body.rating,
//   });
//   // Save the movie in database
//   const createdRating = await newRating.save();
//   }
//   return ;
// }

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
