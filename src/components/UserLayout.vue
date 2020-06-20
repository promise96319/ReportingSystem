<template>
  <div class="user-layout">
    <img :src="logoImg" alt="" />
    <slot></slot>
  </div>
</template>

<script>

export default {
  data() {
    return {
      logoImg: require("@/assets/logo.png"),
    };
  },
};
</script>

<style scoped lang="scss">
.user-layout {
  width: 320px;
  height: 320px;
  margin: 100px auto 0;
  text-align: center;
  img {
    margin-bottom: 64px;
  }
  .el-input {
    margin-top: 20px;
  }
}
</style>
