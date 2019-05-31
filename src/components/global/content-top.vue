<template>
  <div class="content-top">
    <h3>{{ title }}</h3>
  </div>
</template>
<script>
  export default {
    name: "content-top",
    props: ["title"]
  }
</script>
<style lang="less">
  .content-top {
    text-align: left;
    margin-bottom: 16px;
  }
</style>