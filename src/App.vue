<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello'
import SirApi from '../lib/sir-api/';

const testUrl = 'https:/jsonplaceholder.typicode.com/posts/1';
const opts = {timeout: 1000, periodic: 2500};

let x = SirApi.poll(testUrl, opts)
// console.log("x:", x)
x.subscribe(r => console.log("x:", r))

setTimeout(() => {
  let y = SirApi.poll(testUrl, opts)
  // console.log("y:", y)
  x.subscribe(r => console.log("y:", r))
}, 4000)

export default {
  name: 'app',
  components: {
    Hello
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
