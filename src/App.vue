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
  width:100%;
  height: 100%;
  overflow: hidden;
}
body {
  width:100%;
  height:100vh;
  background: #f3f3f3;
  overflow: hidden;
}
</style>
