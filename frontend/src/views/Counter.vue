<template>
  <body>
    <h1>Filter</h1>
    <!-- <div class="counter-value">Counter value is: {{ counter }}</div> -->
    <!-- <button @click="increment()">Increment</button> -->

    <div id="Search">
      <div style="text-align: right">
        Search
        <input class="search-input" placeholder="Search" />
      </div>
    </div>
    <div class="Boutons">
      <div
        @click="selectGenre(genre.name)"
        v-for="genre in genres"
        class="action-button"
        :key="genre.id"
      >
        {{ genre.name }}
      </div>
    </div>
    <div class="grid">
      <div v-for="movie in movies" :key="movie._id">
        <!-- {{ movie.title }} -->
        <router-link :to="/onemovie/ + movie._id">
          <img
            :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path"
            :alt="movie.title"
          />
        </router-link>
      </div>
    </div>
  </body>
  <!-- <div class="Images">
    <div v-for="movie in movies" :key="movie._id">
      {{ movie.title }}
      <router-link :to="/onemovie/ + movie._id">
        <img
          :src="'https://image.tmdb.org/t/p/w200' + movie.url"
          :alt="movie.title"
        />
      </router-link>
    </div> -->
  <!-- </div> -->
</template>

<style scoped>
.body {
  color: rgb(234, 168, 163);
  height: 1000px;
}

.Boutons {
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px 10px; /* row-gap column gap */
}

.action-button {
  cursor: pointer;
  padding: 5px 5px;
  float: left;
  border-radius: 6px;
  font-family: "Lobster";
  font-size: 18px;
  text-align: center;
  color: #ffffff;
  text-decoration: none;
  background-color: rgba(201, 157, 136, 255);
  border-bottom: 2px solid rgba(161, 122, 118, 255);
  text-shadow: 0px -1px rgba(161, 122, 118, 255);
  transition: all 0.1s;
  -webkit-transition: all 0.1s;
}

.action-button:active {
  transform: translate(0px, 2px);
  -webkit-transform: translate(0px, 2px);
  border-bottom: 1px solid;
}

.Images {
  height: 500px;
  position: relative;
}

.grid {
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  /* height: 1000px; */
}
</style>

<script>
import axios from "axios";
export default {
  name: "Genre",
  data: function () {
    return {
      genres: [],
      movies: [],
    };
  },
  methods: {
    fetchGenres: async function () {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=en-US"
      );
      this.genres = response.data.genres;
    },
    selectGenre: async function (genre) {
      const response = await axios.get(
        "http://localhost:3000/movies/genre/" + genre
      );
      this.movies = response.data;
    },
  },
  created() {
    this.fetchGenres();
  },
};
</script>
