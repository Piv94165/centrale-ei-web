<template>
  <h1>Filter</h1>
  <!-- <div class="counter-value">Counter value is: {{ counter }}</div> -->
  <!-- <button @click="increment()">Increment</button> -->
  <div>
    <div id="Search">
      <div>
        Search
        <input class="search-input" placeholder="Search" />
      </div>
    </div>
    <div>Types</div>
    <div class="Genre">
      <button>Action</button>
      <button>Adventure</button>
      <button>Animation</button>
      <button>Comedy</button>
      <button>Crime</button>
      <button>Documentary</button>
      <button>Drama</button>
      <button>Family</button>
      <button>Fantasy</button>
      <button>History</button>
      <button>Horror</button>
      <button>Music</button>
      <button>Mystery</button>
      <button>Romance</button>
      <button>Science Fiction</button>
      <button>TV Movie</button>
      <button>Thriller</button>
      <button>War</button>
      <button>Western</button>
    </div>
  </div>
  <router-view />
</template>

<style scoped>
.Genre {
  width: 100px;
  margin: 5px;
  height: 50px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  column-gap: 20px;
  text-align: center;
}
</style>

<!-- <script>
export default {
  name: "Counter",
  data: function () {
    return {
      counter: 0,
    };
  },
  methods: {
    increment: function () {
      this.counter++;
    },
  },
};
</script> -->

<!-- <style scoped>
.counter-value {
  margin-bottom: 5px;
}
</style> -->
