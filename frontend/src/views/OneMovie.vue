<template>
  <h1>{{ movie.title }}</h1>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",

  //   components: {
  //     Movie,
  //     Carousel_movie,
  //   },
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
