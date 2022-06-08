<template>
  <h1> {{ movie.title}}</h1>    
  <div class ="image">
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

  <div class ="special">
  <p>
    <h2> Vote Average: {{movie.vote_average}}/10 </h2>
  </p>
  </div>

  <p>
    <h2>Release Date: {{movie.release_date}}</h2>
  </p>

  <p>
     <h2> Overview: </h2> <li> {{movie.overview}} </li>
  </p>

  <p>
    <h2> Original Language: {{movie.original_language}} </h2>
  </p>

  <p>
    <h2> Genres: </h2>
    <li> {{movie.genres[0].name}}</li>
    <li> {{movie.genres[1].name}}</li>
    <li> {{movie.genres[2].name}}</li>
  </p>

<div class="recommandation">
  <h2>The Recommend Movies: </h2>
  <Carousel_movie palmares_type="popularity" />
</div>

</template>

<script>
import axios from "axios";
import "vue3-carousel/dist/carousel.css";
import Carousel_movie from "@/components/Carousel_movie.vue";
// import StarRating from 'vue-star-rating'

export default {
  name: "Home",

  //   components: {
  //     Movie,
  //     Carousel_movie,
  //   },
  components: {
    Carousel_movie, 
    // StarRating
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
.h1 {
  color: rgb(234,168,163)
}

body {
  width: 90%;
  max-width: 900px;
  margin: 0 auto;
  font: .9em/1.2 Arial, Helvetica, sans-serif;
  font-family: 'Raleway', sans-serif;
}

.special {
  background-color: rgb(246,230,231);
  padding: 10px;
  color: rgb(234,168,163);
}

.image {
  float: left;
  margin-right: 15px;
  width: 400px;
  height: 500 px;
  border-radius: 5px;
  background-color: rgb(234,168,163);
  padding: 1em;
}

.recommandation {
  clear: left;
}

li {
  line-height: 1.5;
}

.custom-text {
  font-weight: bold;
  font-size: 1.9em;
  border: 1px solid #cfcfcf;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  color: #999;
  background: #fff;
}

</style>
