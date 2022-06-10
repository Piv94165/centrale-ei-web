<template>
  <div>
    <div class="titre_carousel">{{ title }}</div>
    <div class="stylee">
      <Carousel
        :itemsToShow="5.95"
        :wrapAround="true"
        paginationColor="gray"
        paginationActiveColor="red"
        navigationColor="gray"
      >
        <!-- <slide v-for="slide in 10" :key="slide">
          {{ slide }} -->
        <Slide v-for="movie in movies" v-bind:key="movie.id">
          <!-- {{movie.original_title}} -->
          <Movie class="carousel__item" :movie="movie" />
        </Slide>

        <template #addons>
          <Navigation color />
          <Pagination />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "vue3-carousel/dist/carousel.css";
import Movie from "@/components/Movie.vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  name: "Carousel_movie",
  components: {
    Movie,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  props: {
    // movie: Array,
    palmares_type: String,
  },
  data: function () {
    return {
      movies: [],
      title: "",
    };
  },
  methods: {
    fetchMovies: function () {
      let url = "";
      switch (this.palmares_type) {
        case "popularity":
          this.title = "Popular";
          url =
            "https://api.themoviedb.org/3/movie/popular?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&language=en-US&page=1";
          break;
        case "upcoming":
          this.title = "Upcoming";
          url =
            "https://api.themoviedb.org/3/movie/upcoming?api_key=522d421671cf75c2cba341597d86403a&language=en-US";
          break;
        case "toprated":
          this.title = "Top Rated";
          url =
            "https://api.themoviedb.org/3/movie/top_rated?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=en-US&page=1";
          break;
        case "nowplaying":
          this.title = "Now Playing";
          url =
            "https://api.themoviedb.org/3/movie/now_playing?api_key=522d421671cf75c2cba341597d86403a&language=en-US&page=1";
          break;
        default:
      }
      axios
        .get(url)
        .then((response) => {
          this.movies = response.data.results;
          console.log(this.movies[0]);
        })
        .catch((error) => {
          this.usersLoadingError = "An error occured while fetching users.";
          console.error(error);
        });
    },
  },
  created: function () {
    console.log(this.palmares_type);
    this.fetchMovies();
  },
};
</script>

<style scoped>
.carousel__slide > .carousel__item {
  transform: scale(1);
  opacity: 0.5;
  transition: 0.5s;
}
.carousel__slide--visible > .carousel__item {
  opacity: 1;
  transform: rotateY(0);
}
.carousel__slide--next > .carousel__item {
  transform: scale(0.9) translate(-10px);
  border: 10px solid white;
}
.carousel__slide--prev > .carousel__item {
  transform: scale(0.9) translate(10px);
  border: 10px solid white;
}
.carousel__slide--active > .carousel__item {
  transform: scale(1.2);
}

.titre_carousel {
  font-size: 20px;
  font-weight: bold;
  /* font-style: italic; */
  text-align: center;
  margin-left: 10px;
  margin-bottom: 20px;
}
</style>
