<template>
  <div id="app">
    <h2>Rating:</h2>
    <StarRating :rating="rating" @update:rating="setRating"></StarRating>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import axios from "axios";

export default {
  name: "Rating",
  props: {
    movie: Array,
  },
  components: {
    StarRating,
  },
  data: function () {
    return {
      rating: null,
      resetableRating: 2,
      currentRating: "No Rating",
      mouseOverRating: null,
    };
  },
  methods: {
    fetchRating: function () {
      axios
        .get("http://localhost:3000/ratings/" + this.movie)
        .then((response) => {
          this.rating = response.data === "none" ? null : response.data;
          console.log(this.rating);
        })
        .catch((error) => {
          this.usersLoadingError = "An error occured while fetching users.";
          console.error(error);
        });
    },
    setRating: function (rating) {
      axios
        .post("http://localhost:3000/ratings/" + this.movie, { rating })
        .then((response) => {
          this.rating = response.data === "none" ? null : response.data;
          console.log(this.rating);
        })
        .catch((error) => {
          this.usersLoadingError = "An error occured while fetching users.";
          console.error(error);
        });
    },

    showCurrentRating(rating) {
      this.currentSelectedRating =
        rating === 0
          ? this.currentSelectedRating
          : "Click to select " + rating + " stars";
    },
    setCurrentSelectedRating(rating) {
      this.currentSelectedRating = "You have Selected: " + rating + " stars";
      this.setRating(rating);
    },
  },
  computed: {
    currentRatingText() {
      return this.rating
        ? "You have selected " + this.rating + " stars"
        : "No rating selected";
    },
    mouseOverRatingText() {
      return this.mouseOverRating
        ? "Click to select " + this.mouseOverRating + " stars"
        : "No Rating";
    },
  },
  created: function () {
    this.id = this.$route.params.id;
    console.log("movie id = " + this.id);
    this.fetchRating();
  },
};
</script>

<style>
body {
  font-family: "Raleway", sans-serif;
}

.custom-text {
  font-weight: bold;
  font-size: 1.9em;
  border: 1px solid rgb(218, 192, 191);
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  color: rgb(218, 192, 191);
  background: rgb(218, 192, 191);
}
</style>
