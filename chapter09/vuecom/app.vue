<template>
  <div class="example">
    {{ msg }}
    <v-title title="Vue组件化"></v-title>
    <v-button @click="handleClick" color='red'>点击按钮</v-button>
    <img src="https://camo.githubusercontent.com/d18f4a7a64244f703efcb322bf298dcb4ca38856/68747470733a2f2f7765627061636b2e6a732e6f72672f6173736574732f69636f6e2d7371756172652d6269672e737667"/>
  </div>
</template>

<script>
import vTitle from "./title.vue";
import vButton from "./button.vue";
export default {
  components: {
    vTitle,
    vButton,
  },
  data() {
    return {
      msg: "Hello world!",
    };
  },
  methods: {
      handleClick(e){
          console.log(e)
      }
  },
};
</script>

<style scoped>
.example {
  color: #f60;
  font-size: 200px;
}
</style>