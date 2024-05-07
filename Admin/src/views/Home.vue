<template>
  <div>
    <h3>Home</h3>
    <div class="info">
      <div class="text-center">
        <h1>Welcome to Thong's Restaurant</h1>
        <p class="lead">
          Hãy bắt đầu quản lý nhà hàng của bạn với các chức năng sau
        </p>
      </div>
      <router-link to="/admin/dish" class="btn"
        ><h4>Quản lý món ăn</h4>
        <div>
          Thêm món ăn và danh mục món ăn đơn giản nhanh chóng
        </div></router-link
      >
      <router-link to="/admin/table" class="btn"
        ><h4>Quản lý bàn ăn</h4>
        <div>Thêm bàn và khu vực nhanh gọn</div></router-link
      >
      <router-link to="/admin/staff" class="btn"
        ><h4>Quản lý nhân viên</h4>
        <div>
          Tạo tài khoản cho nhân viên và xem thông tin nhân viên dễ dàng
        </div></router-link
      >
      <router-link to="/admin/order" class="btn">
        <h4>Quản lý đơn hàng</h4>
        <div>
          (Xem các đơn hàng chưa thanh toán và đơn hàng đã thanh toán dễ dàng)
        </div>
      </router-link>
    </div>
  </div>
</template>
  <script>
export default {
  name: "Home",
};
</script>
  
  <style scoped>
h3 {
  color: white;
  padding: 20px;
  background: #2d99ae !important;
  margin-bottom: 15px;
}

.text-center {
  padding-top: 20px;
}

.btn {
  background: #55d3e4;
  margin: 20px 70px;
  padding: 20px;
  width: 350px;
}

.info {
  padding-left: 35px;
  padding-bottom: 20px;
  background: #bcfefe;
}
</style>