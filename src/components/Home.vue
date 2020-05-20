<template>
  <el-container>
    <el-header>
      <div>
        <img src="../assets/logo.png" alt />
      </div>
      <span>电商后台管理系统</span>
      <el-button type="info" @click="logOut">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle" @click="toggleCollapse">｜｜｜</div>
        <el-menu
          :collapse-transition="false"
          :collapse="isCollapse"
          unique-opened
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          :default-active="activePath"
          
        >
         <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              @click="saveNavState(Item.path)"
              :index="Item.path"
              v-for="Item in item.children"
              :key="Item.id"
            >
              <i class="el-icon-menu"></i>
              {{Item.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      isCollapse: false,
      activePath: ""
    };
  },
  created() {
    this.getMenuList();
    this.activePath=sessionStorage.getItem('activePath')
  },
  methods: {
    logOut() {
      sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList() {
      const { data } = await this.$http.get("menus");
      if (data.meta.status != 200) return this.$message.err(data.meta.msg);
      this.menuList = data.data;
      // console.log(data.data);
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    saveNavState(activePath) {
      sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    }
  }
};
</script>


<style lang="less" scoped>
.el-header {
  background: #373d41;
  display: flex;
  justify-content: space-between;
  color: #fff;
  align-items: center;
  img {
    height: 60px;
  }
}
.el-aside {
  background: #333744;
  .toggle {
    background: #4a5064;
    text-align: center;
    color: #fff;
    cursor: pointer;
  }

  .el-menu {
    border-right: 0;
  }
}

.el-main {
  background: #eaedf1;
}

.el-container {
  height: 100%;
}
</style>