<template>
  <div class="title">
    <h1>{{ movie.title }}</h1>
  </div>

  <div class="image">
    <a :href="'/onemovie/' + movie.id">
      <img
        :src="'https://image.tmdb.org/t/p/w400' + movie.poster_path"
        :alt="movie.original_title"
      />
      <!-- <p>
              {{movie.original_title}} ({{movie.release_date}})
          </p> -->
    </a>
  </div>

  <div class="special">
    <h2>Average Rating: {{ movie.vote_average }}/10</h2>
  </div>

  <StarRating
    v-model:rating="rating"
    v-bind:increment="0.5"
    v-bind:maxRating="3"
    v-bind:starSize="90"
    :movie="id"
  >
  </StarRating>

  <h2>Release Date: {{ movie.release_date }}</h2>

  <h2>Overview:</h2>
  <li>{{ movie.overview }}</li>

  <h2>Original Language: {{ movie.original_language }}</h2>

  <h2>Genres:</h2>
  <Genres :genres="movie.genres"></Genres>

  <div class="recommandation">
    <h2>Recommended Movies:</h2>
    <Carousel_movie palmares_type="popularity" />
  </div>
</template>

<script>
import axios from "axios";
import "vue3-carousel/dist/carousel.css";
import Carousel_movie from "@/components/Carousel_movie.vue";
import Genres from "@/components/Genres.vue";
import StarRating from "@/components/Rating.vue";

export default {
  name: "Home",
  components: {
    Carousel_movie,
    Genres,
    StarRating,
  },
  data: function () {
    return {
      movieName: "",
      movie: {},
      id: "",
    };
  },
  methods: {
    fetchMovie: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.id}?api_key=522d421671cf75c2cba341597d86403a&language=en-US`
        )
        .then((response) => {
          this.movie = response.data;
          console.log(this.movie);
        })
        .catch((error) => {
          this.usersLoadingError = "An error occured while fetching users.";
          console.error(error);
        });
    },
  },

  created: function () {
    this.id = this.$route.params.id;
    console.log("movie id = " + this.id);
    this.fetchMovie();
  },
};
</script>

<style scoped>
.title {
  color: rgb(207, 139, 135);
  position: relative;
  left: 20px;
}

body {
  width: 90%;
  max-width: 900px;
  margin: 0 auto;
  font: 0.9em/1.2 Arial, Helvetica, sans-serif;
  font-family: "Raleway", sans-serif;
}

.special {
  background-color: rgb(246, 230, 231);
  padding: 10px;
  color: rgb(234, 168, 163);
}

.image {
  float: left;
  margin-right: 15px;
  width: 400px;
  height: 500 px;
  border-radius: 5px;
  background-color: rgb(234, 168, 163);
  padding: 1em;
}

.recommandation {
  clear: left;
}

li {
  line-height: 1.5;
}
</style>
