<template>

    <carousel :items-to-show="5.95" :wrapAround="true">
      <!-- <slide v-for="slide in 10" :key="slide">
        {{ slide }} -->
      <slide v-for = "movie in movies" v-bind:key= movie.id>
        <!-- {{movie.original_title}} -->
        <Movie class="carousel__item" :movie = movie />
      </slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>

    
</template>

<script>
import axios from "axios";
import 'vue3-carousel/dist/carousel.css';
import Movie from "@/components/Movie.vue";
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default {
  name: "Carousel_movie",
  components: {
    Movie,
    Carousel, 
    Slide, 
    Pagination, 
    Navigation
  },
  props: {
    movie : Array
  },
  data: function () {
    return {
      movies: [],
      palmares_type : '',
    }},
  methods: {
    fetchMovies: function () {
      if (this.palmares_type = 'popularity') {
        axios
          .get(`https://api.themoviedb.org/3/movie/popular?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&language=en-US&page=1`)
          .then((response) => {
            this.movies = response.data.results;
            console.log(type(movies[0]))
          })
          .catch((error) => {
            this.usersLoadingError = "An error occured while fetching users.";
            console.error(error);
          });
      }
      
    },
  },

  created: function() {
    this.fetchMovies()
  }

}

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
}
.carousel__slide--prev > .carousel__item {
  transform: scale(0.9) translate(10px);
}
.carousel__slide--active > .carousel__item {
  transform: scale(1.0);
}

</style>
