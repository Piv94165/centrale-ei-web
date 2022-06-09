<template>
  <div id="app">
    <h2>Rating:</h2>
    <StarRating></StarRating>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
  name: "Rating",
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
    showCurrentRating(rating) {
      this.currentSelectedRating =
        rating === 0
          ? this.currentSelectedRating
          : "Click to select " + rating + " stars";
    },
    setCurrentSelectedRating(rating) {
      this.currentSelectedRating = "You have Selected: " + rating + " stars";
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
