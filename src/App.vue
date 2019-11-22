<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
}
body {
  height: 100vh;
  background: #f3f3f3;
  overflow-x: hidden;
  overflow-y:auto;
}
</style>
