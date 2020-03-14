<template>
  <div class="header">
    <div class="container">
      <div class="user-menu">
        <el-dropdown>
          <span class="el-dropdown-link">
            <div class="setting">
              <i class="el-icon-s-tools"></i>
            </div>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div @click="$router.push({ name: 'Home' })">
              <el-dropdown-item icon="el-icon-price-tag">
                Home</el-dropdown-item
              >
            </div>
            <div @click="$router.push({ name: 'Profile' })">
              <el-dropdown-item icon="el-icon-office-building">
                Profile</el-dropdown-item
              >
            </div>

            <div @click="$router.push({ name: 'UserManagement' })">
              <el-dropdown-item icon="el-icon-user">
                User management</el-dropdown-item
              >
            </div>

            <div @click="$router.push({ name: 'Settings' })">
              <el-dropdown-item icon="el-icon-setting">
                Settings</el-dropdown-item
              >
            </div>

            <div @click="$router.push({ name: 'Login' })">
              <el-dropdown-item icon="el-icon-remove-outline">
                Logout</el-dropdown-item
              >
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="company-name">123's Company Name</div>
      <img :src="logoImg" alt="" @click="()=>{$router.push('/')}"/>
      
      <!-- <AsideBar class="side-bar" :active="active"></AsideBar> -->
    </div>
  </div>
</template>

<script>
// import AsideBar from "@/components/AsideBar";
export default {
  props: ["active"],
  data() {
    return {
      logoImg: require("@/assets/logo.gif")
    };
  },
  components: {
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1000;
  width: 100%;
  min-width: 800px;
  height: 60px;
  border-bottom: 1px #dcdfe6 solid;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  .container {
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    vertical-align: middle;
    position: relative;
    .setting {
      width: 60px;
      height: 60px;
      font-size: 28px;
      position: relative;
      i {
        transform: translateX(-15px);
        margin-top: -10px;
        // color: #303133!important;
        color: #409EFF!important;
      }
      // &:hover i {
      //   color: #409EFF!important;
      // }
    }
    img {
      margin-top: 14px;
      margin-right: 30px;
      height: 32px;
      line-height: 60px;
      border-radius: 4px;
      cursor: pointer;
    }
    .company-name {
      font-weight: 500;
      font-size: 20px;
    }
    .user-menu {
      position: relative;
      .el-dropdown {
        height: 50px;
      }
      .el-avatar {
        margin: 10px 16px 0 0;
      }
      i {
        position: absolute;
        right: 0;
        top: 26px;
        size: 16px;
        color: #606266;
      }
      .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
      .demonstration {
        display: block;
        color: #8492a6;
        font-size: 14px;
        margin-bottom: 20px;
      }
    }
    .side-bar {
      position: absolute;
      left: 30px;
      top: 90px;
    }
  }
}

li.el-dropdown-menu__item {
  min-width: 150px;
}
</style>
