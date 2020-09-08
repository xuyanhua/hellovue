<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <News title="xxii" content="123121212"></News>
    <Title title="这是一个标题组件"></Title>
    <Button color="red" @click="handleClick()">这是按钮文本</Button>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import News from "./components/News";
import Title from "./components/Title";
import Button from "./components/Button";

export default {
  name: "App",
  components: {
    HelloWorld,
    News,
    Title,
    Button,
  },
  methods: {
    handleClick() {
      console.log("hhhhhh");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
