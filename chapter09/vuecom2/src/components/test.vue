<template>
  <div class="example">{{text}}</div>
</template>
<script>
export default {
  name: "test",
  props: {
    text: {
      type: String,
      default: "hahaha",
    },
  },
};
</script>
<style scoped>
.example {
  color: red;
  font-size: 100px;
}
</style>