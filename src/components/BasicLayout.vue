<template>
  <div class="basic-layout">
    <Header></Header>
    <SideBar></SideBar>
    <div class="container">
      <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import SideBar from '@/components/SideBar'

export default {
  components: {
    Header,
    SideBar
  }
}
</script>

<style lang="scss" scoped>
.basic-layout {
  .container {
    padding: 60px 0 0 60px;
    background-color: #feffff;
  }
}
</style>
