<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <h1>Relax and Enjoy !</h1>
    <!-- <div class="titre_carousel">Your Suggestions</div> -->
    <Carousel_movie palmares_type="popularity" />
    <Carousel_movie palmares_type="upcoming" />
    <Carousel_movie palmares_type="toprated" />
    <input type="text" v-model="movieName" />
    <div>
      <span>Mon film: {{ movieName }}</span>
    </div>
    <ul style="list-style-type: circle">
      <li v-for="movie in movies" v-bind:key="movie.id">
        {{ movie.original_title }}
      </li>
    </ul>
    <div class="grid">
      <Movie v-for="movie in movies" v-bind:key="movie.id" :movie="movie" />
    </div>
    <!-- <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank">vue-cli documentation</a>.
    </p> -->
    <!-- <h3>Installed CLI Plugins</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          >babel</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router"
          target="_blank"
          >router</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          >eslint</a
        >
      </li> -->
    <!-- </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank">Forum</a>
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank">Community Chat</a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank">Twitter</a>
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank">News</a>
      </li>
    </ul> -->
    <!-- <h3>Ecosystem</h3> -->
    <!-- <ul>
      <li>
        <a href="https://router.vuejs.org" target="_blank">vue-router</a>
      </li>
      <li>
        <a href="https://vuex.vuejs.org" target="_blank">vuex</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          >vue-devtools</a
        >
      </li>
      <li>
        <a href="https://vue-loader.vuejs.org" target="_blank">vue-loader</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank"
          >awesome-vue</a
        >
      </li>
    </ul> -->
  </div>
</template>

<script>
import axios from "axios";
import Movie from "@/components/Movie.vue";
import "vue3-carousel/dist/carousel.css";
import Carousel_movie from "../components/Carousel_movie.vue";

export default {
  name: "Home",
  components: {
    Movie,
    Carousel_movie,
  },
  data: function () {
    return {
      movieName: "",
      movies: [],
    };
  },
  methods: {
    fetchMovies: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&language=en-US&page=1`
        )
        .then((response) => {
          this.movies = response.data.results;
          console.log(type(movies[0]));
        })
        .catch((error) => {
          this.usersLoadingError = "An error occured while fetching users.";
          console.error(error);
        });
    },
  },

  created: function () {
    this.fetchMovies();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.titre_carousel {
  font-size: 15px;
  justify-content: center;
}
</style>
