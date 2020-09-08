<template>
  <div>
    <h2>{{title}}</h2>
    <div class="content">{{content}}</div>
  </div>
</template>
<script>
export default {
  name: "test",
  props: {
    title: {
      type: String,
      default: "hahaha",
    },
    content: {
      type: String,
      default: "hahaha",
    },
  },
};
</script>
<style scoped>
.content {
  color: red;
  font-size: 24px;
}
</style>