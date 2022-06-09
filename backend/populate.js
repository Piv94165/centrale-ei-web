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
  for (let i = 1; i < 20; i++) {
    console.log(i);
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
  const results = await axios.get(
    `http://api.themoviedb.org/3/movie/${id_movie}/casts?api_key=522d421671cf75c2cba341597d86403a`
  );
  return results.data.cast;
}

async function fetchGenres() {
  const response = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=en-US"
  );
  const genres = {};
  for (const genre of response.data.genres) {
    genres[genre.id] = genre.name;
  }
  return genres;
}

async function populateMovies(movies) {
  // TODO: populate movies into the database
  const genres = await fetchGenres();

  for (const movie of movies) {
    const newMovie = new MovieModel({
      // Movie attributes
      title: movie.title,
      description: movie.overview,
      url: movie.poster_path,
      viewers: movie.viewers,
      date: movie.release_date,
      genre: movie.genre_ids.map((genre) => genres[genre]),
      popularity: movie.popularity,
      id_tmdb: movie.id,
      // runtime: movie.runtime,
    });

    const createdMovie = await newMovie.save();
    const casting = await fetchActorsByMovieId(movie.id);
    // Save the movie in database
    // let id_movie = await MovieModel.findOne({ title: movie.title });
    // console.log("id_movie =" + id_movie);
    // if (id_movie == null) {
    //   id_movie = await newMovie.save();
    // }

    // console.log(id_movie.id);
    // MovieModel.findOneAndUpdate(
    //   { title: movie.title },
    //   newMovie,
    //   { upsert: true },
    //   function (error, result) {
    //     if (!error) {
    //       // If the document doesn't exist
    //       if (!result) {
    //         // Create it
    //         result = newMovie; //MovieModel();
    //       }
    //       // Save the document
    //       result.save(function (error) {
    //         if (!error) {
    //           // Do something with the document
    //         } else {
    //           throw error;
    //         }
    //       });
    //     }
    //   }
    // );
    for (const actor of casting) {
      const newActor = new ActorModel({
        name: actor.name,
        popularity: actor.popularity,
        profile_path: actor.profile_path,
      });

      const existingActor = await ActorModel.findOne({ name: actor.name });

      if (existingActor === null) {
        const createdActor = await newActor.save();
        const newCasting = new CastingModel({
          id_actor: createdActor._id,
          id_movie: createdMovie._id,
          order: 0,
        });
        const createdCasting = await newCasting.save();
      } else {
        const newCasting = new CastingModel({
          id_actor: existingActor._id,
          id_movie: createdMovie._id,
          order: 0,
        });
        const createdCasting = await newCasting.save();
      }
    }
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
  await connection.db.dropCollection("actors");
  await connection.db.dropCollection("castings");
  await connection.db.dropCollection("ratings");
  try {
    await connection.db.dropCollection("scores");
  } catch (e) {}

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
