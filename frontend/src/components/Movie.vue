<template>
  <a :href="'/onemovie/' + movie.id">
    <!-- rooter link to au lieu de href -->
    <img
      :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path"
      :alt="movie.original_title"
    />
    <!-- <p>
            {{movie.original_title}} ({{movie.release_date}})
        </p> -->
  </a>
</template>

<script>
import axios from "axios";

export default {
  name: "Movie",
  url_img: "",
  props: {
    movie: Array,
  },
};
</script>

<style scoped>
@import url(//fonts.googleapis.com/css?family=Blaka);

p {
  width: 200px;
  font-family: "Blaka";
}

div {
  margin-left: 10px;
}
</style>
