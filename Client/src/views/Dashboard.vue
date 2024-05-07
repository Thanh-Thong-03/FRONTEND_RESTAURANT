<template>
  <q-page>
    <q-drawer v-model="drawer" show-if-above>
      <q-list class="list">
        <q-item class="item" to="/" exact>
          <q-item-label>Trạng thái bàn</q-item-label>
        </q-item>
        <q-item class="item" to="/addorder">
          <q-item-label>Gọi món</q-item-label>
        </q-item>
        <q-item class="item" to="/tablestatus">
          <q-item-label>Cập nhật trạng thái món ăn</q-item-label>
        </q-item>
        <q-item class="item" to="/kitchenstaff">
          <q-item-label>Danh sách đơn hàng</q-item-label>
        </q-item>
        <q-item class="item" to="/payment">
          <q-item-label>Thanh toán</q-item-label>
        </q-item>
        <q-item class="item" to="/info">
          <q-item-label>Thông tin cá nhân</q-item-label>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-header class="header" elevated>
        <q-toolbar>
          <q-btn flat round dense icon="menu" @click="drawer = !drawer" />
          <q-toolbar-title>Thong's Restaurant</q-toolbar-title>
          <q-space />
          <q-btn to="/info" class="profile" flat round dense icon="person" />
          <q-btn class="logout" flat round dense icon="exit_to_app" @click="logout" />
        </q-toolbar>
      </q-header>

      <q-page class="content">
        <router-view></router-view>
      </q-page>
    </q-page-container>
  </q-page>
</template>
  
  <script>
import { ref } from "vue";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const drawer = ref(false);
    const toast = useToast();

    const logout = async () => {
      localStorage.removeItem("token");
      toast.success("Đăng xuất thành công");
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    };

    return {
      drawer,
      logout,
    };
  },
};
</script>
  
  <style scoped>

.header {
  padding: 10px !important;
  background: #0C5776;
}  

.list {
    background: #001C44 !important;
    padding: 10px !important;
    height: 100%;
    color: white;
    text-align: center;
}

.item {
    /* padding: 5px !important; */
    margin: 10px 0px !important;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    font-size: 16px;
}

.dashboard {
  height: 100vh;
}

.content {
  padding: 20px;
  background: #D1E8E2;
  height: 550px;
  overflow-y: auto !important;
}

.profile {
  margin-right: 10px;
  font-size: 16px;
}

.logout {
  margin-right: 10px;
  font-size: 16px;
}

/* q-item {
    padding: 10px !important;
    margin: 10px !important;
}

q-item-label {
    padding: 10px !important;
    margin: 10px !important;
} */

</style>