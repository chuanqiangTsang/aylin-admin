<template>
  <div class="content-top">
    <h3>{{ title }}</h3>
    <div class="content-top-right">
      <slot name="right" />
    </div>
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
    position: relative;
    &-right {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>