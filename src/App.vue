<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
  </div>
</template>

<script>
import Rx from 'rxjs';
import Hello from './components/Hello'
import ReactivePoller from '../lib/reactive-poller/';

const strategyModifier = (strategy, result) => {
  return {...strategy, interval: 10000}
  // return {...strategy, interval: result.interval}
}

const resource = {url: 'https:/jsonplaceholder.typicode.com/posts/1'};
// const resource = {url: 'http://localhost:3000/api/event-info'};
const strategy = {timeout: 1000, interval: 5000, modifier: strategyModifier};

let x = ReactivePoller.run(resource, strategy)

setTimeout(() => {
  console.log('new sub x')
  x.subscribe(
    r => console.log("x r: ", r),
    e => console.error('error: ', e))
}, 500)

setTimeout(() => {
  console.log('new sub y')
  x.subscribe(
    r => console.log("y r:"),
    e => console.log("y e:", e))
}, 6000)

// setTimeout(() => {
//   console.log('new sub z')
//   x.subscribe(
//     r => console.log("z r:", r),
//     e => console.log("z e:", e))
// }, 7000)

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
