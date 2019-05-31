<template>
  <div class="content">
    <section class="header-box">
      <app-header />
    </section>

    <div class="main">
      <section class="main-left">
        <app-aside />
      </section>

      <section class="main-right">
        <router-view />
      </section>
    </div>
  </div>
</template>

<script>
  import AppHeader from '@/components/global/header/header.vue';
  import Aside from '@/components/global/aside.vue';
  export default {
    name: 'common',
    components: {
      AppHeader,
      AppAside: Aside
    }
  }
</script>

<style lang="less">
  .content {
    height: 100%;
    .header-box { 
      height: 64px;
      line-height: 64px;
      padding: 0 24px;
      box-shadow: 0 2px 8px rgba(30,85,255,.1)
    }
    .main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #F4F6FC;
      height: calc( 100% - 64px );
      width: 100%;
      &-left, &-right{
        height: 100%;
      }
      &-right {
        width: calc( 100% - 200px );
        padding: 16px;
        box-sizing: border-box;
      }
    }
  }
</style>




