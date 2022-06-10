<template>
  <div>
    <div class="banniere">
      <img
        class="logo"
        src="./assets/test2.png"
        alt="logo test"
        width="100"
        height="100"
      />
      <div class="banniere_centre">
        MAP
        <div class="nav">
          <router-link class="nav-link" to="/">Home</router-link>
          <router-link class="nav-link" to="/counter">Movies</router-link>
          <!-- <router-link class="nav-link" to="/users">Preferences</router-link>
          <router-link class="nav-link" to="/about">About</router-link> -->
        </div>
      </div>
      <img
        class="pp"
        src="./assets/pngegg.png"
        alt="logo test"
        width="100"
        height="100"
      />
    </div>
    <router-view />
  </div>
</template>

<style scoped>
@import url(//fonts.googleapis.com/css?family=Lobster);
@import url(//fonts.googleapis.com/css?family=Pacifico);

.banniere {
  --logo_size: 8%;
  --pp_size: 8%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background: rgba(201, 157, 136, 255);
}

.banniere_centre {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100% - var(--logo_size) - var(--pp_size));
  margin-top: 10px;
  font-size: 30pt;
}

.nav {
  text-align: center;
  padding: 10px;
  align-self: center;
  font-size: 20pt;
  /* margin-bottom: 10px; */
}

.nav-link {
  font-weight: bold;
  color: rgba(161, 122, 118, 255);
  margin: 20px;
}

.nav-link.router-link-exact-active {
  color: #2c3e50;
}

.nav a {
  text-decoration: none;
}

.logo {
  width: var(--logo_size);
  margin-left: 10px;
  margin-top: 5px;
}

.pp {
  width: var(--pp_size);
  margin: 5px;
  justify-self: right;
}
</style>
