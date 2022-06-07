<template>
  <div>
    <div class="banniere">
      <img class="logo" src="./assets/logo_test.jpg" alt="logo test" />
      <div class="banniere_centre">
        MAP
        <div class="nav">
          <router-link class="nav-link" to="/">Home</router-link>
          <router-link class="nav-link" to="/counter">Counter</router-link>
          <router-link class="nav-link" to="/users">Users</router-link>
          <router-link class="nav-link" to="/about">About</router-link>
        </div>
      </div>
      <img class="pp" src="./assets/logo_test.jpg" alt="logo test" />
    </div>
    <router-view />
  </div>
</template>

<style scoped>
@import url(//fonts.googleapis.com/css?family=Blaka);
@import url(//fonts.googleapis.com/css?family=Pacifico);

.banniere {
  --logo_size: 200px;
  --pp_size: 200px;
  display: flex;
  flex-wrap: wrap;
  background: linear-gradient(to right, rgba(255, 191, 0, 0.794), pink);
}

.banniere_centre {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - var(--logo_size) - var(--pp_size));
  margin-top: 10px;
  font-size: 50pt;
}

.nav {
  text-align: left;
  padding: 10px;
  align-self: flex-start;
  font-size: 15pt;
  /* margin-bottom: 10px; */
}

.nav-link {
  font-weight: bold;
  color: #2c3e50;
  margin: 20px;
}

.nav-link.router-link-exact-active {
  color: #42b983;
}

.nav a {
  text-decoration: none;
}

.logo {
  width: var(--logo_size);
  margin: 0px;
}

.pp {
  width: var(--pp_size);
  margin: 0px;
  justify-self: flex-end;
}
</style>
