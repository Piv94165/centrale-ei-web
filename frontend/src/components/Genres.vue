<template>
    <p>
        <ul id="genres">
            <li v-for="genre in genres" :key="genre.name">
                {{ genre.name }}
            </li>
        </ul>
    </p>
  
</template>

<script>
export default {
  name: "Genres",
  url_img: "",
  props: {
    genres: Array,
  },
};
</script>

<style scoped>
li {
  line-height: 1.5;
}

/* p{
    margin: 0 auto;
} */
</style>
