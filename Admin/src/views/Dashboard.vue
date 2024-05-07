<template>
  <div class="dashboard">
    <div class="sidebar">
      <div class="sidebar-header">
        <h3>Thong's Restaurant</h3>
      </div>
      <ul class="sidebar-menu">
        <li><router-link to="/" class="nav-link active">Home</router-link></li>
        <li>
          <router-link to="/admin/dish" class="nav-link"
            >Quản lý món ăn</router-link
          >
        </li>
        <li>
          <router-link to="/admin/table" class="nav-link"
            >Quản lý bàn ăn</router-link
          >
        </li>
        <li>
          <router-link to="/admin/staff" class="nav-link"
            >Quản lý nhân viên</router-link
          >
        </li>
        <li>
          <router-link to="/admin/order" class="nav-link"
            >Quản lý đơn hàng</router-link
          >
        </li>
        <li>
          <router-link to="/admin/info" class="nav-link"
            >Thông tin cá nhân</router-link
          >
        </li>
      </ul>
    </div>
    <div class="a">
      <div class="content">
        <div class="header">
          <div class="d-flex justify-content-between align-items-center">
            <div></div>
            <div class="d-flex align-items-center">
              <a href="/admin/info" class="me-3">
                <span class="c fas fa-user-circle fs-5 text-white"></span>
              </a>
              <a href="#" @click="logout">
                <span class="c fas fa-sign-out-alt fs-5 text-white"></span>
              </a>
            </div>
          </div>
        </div>
        <div class="b">  
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useToast} from 'vue-toastification'

export default {
  setup(){
    const toast = useToast();

    const logout = async () => {
      //Khi xóa token thì trang sẽ tự động chuyển về trang đăng nhập
      localStorage.removeItem('token');
      toast.success('Đăng xuất thành công')
    }
    return {
      logout
    }
  }
};
</script>

<style scoped>
.a {
  width: 100%;
}
.b{
  margin: 20px;
}
.c {
  margin-right: 30px;
}

.header {
  padding: 15px 20px 20px 10px;
  border-bottom: 1px solid black;
  background: #0C5776;
}

h3 {
  margin: 0px;
}

.dashboard {
  display: flex;
  height: 100vh;
  margin: 0px;
  padding: 0px;
}

.sidebar {
  background-color: #001C44;
  color: #fff;
  flex: 0 0 auto;
  width: 230px;
}

.sidebar-header {
  padding: 40px;
  text-align: center;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
}

.sidebar-menu li {
  margin-bottom: 10px;
}

.sidebar-menu li a {
  display: block;
  padding: 10px;
  color: #fff;
  text-decoration: none;
}

.sidebar-menu li a:hover {
  background-color: #495057;
}

.content {
  overflow-y: auto;
  width: 100%;
  background-color: #f1ebeb;
  height: 100vh;
}
</style>