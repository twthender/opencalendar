<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Notes</router-link> |
      <router-link to="/tasks">Tasks</router-link> |
      <router-link to="/calendar">Calendar</router-link>
    </div>
    <router-view/>
    <div class="footer">
      <p>GitHub repository link <a href="https://github.com/twthender/opencalendar">here</a>. </p>
    </div>
  </div>
</template>

<style>

* {
  padding: 0;
  margin: 0;
}

.footer {
  width: 100%;
  height: 50px;
  margin-top: 50px;
  background-color: #222222;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

body {
  background-color: #111111;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  color: #2c3e50;
}

#nav {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #444444;
  margin-bottom: 30px;
}

h1 {
  margin: 20px;
  color: white;
}

#nav a {
  margin: 20px 30px;
  text-decoration: none;
  color: white;
}

#nav a.router-link-exact-active {
  color: #aaaaaa;
}
</style>
