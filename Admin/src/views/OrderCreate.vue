<template>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h2 class="mb-0">Thêm Hóa Đơn</h2>
        </div>
        <div class="card-body">
          <form @submit.prevent="addInvoice">
            <div class="form-group">
              <label for="customerName">Tên Khách Hàng:</label>
              <input type="text" class="form-control" id="customerName" v-model="customerName" required>
            </div>
            <div class="form-group">
              <label for="productName">Tên Sản Phẩm:</label>
              <input type="text" class="form-control" id="productName" v-model="productName" required>
            </div>
            <div class="form-group">
              <label for="quantity">Số Lượng:</label>
              <input type="number" class="form-control" id="quantity" v-model.number="quantity" required>
            </div>
            <div class="form-group">
              <label for="totalPrice">Tổng Tiền:</label>
              <input type="number" class="form-control" id="totalPrice" v-model.number="totalPrice" required>
            </div>
            <button type="submit" class="btn btn-success">Thêm Hóa Đơn</button>
          </form>
        </div>
      </div>
    </div>
  </template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    // Khai báo các biến dữ liệu
    const customerName = ref('');
    const productName = ref('');
    const quantity = ref(0);
    const totalPrice = ref(0);

    // Phương thức thêm hóa đơn mới
    const addInvoice = () => {
      const newInvoice = {
        customerName: customerName.value,
        productName: productName.value,
        quantity: quantity.value,
        totalPrice: totalPrice.value
      };
      // Truyền newInvoice đến một phương thức hoặc lưu trữ vào cơ sở dữ liệu
      // Ví dụ: this.$emit('add-invoice', newInvoice);
      // Sau đó reset các trường nhập liệu
      customerName.value = '';
      productName.value = '';
      quantity.value = 0;
      totalPrice.value = 0;
    };

    return {
      // Trả về các biến dữ liệu và phương thức cho template
      customerName,
      productName,
      quantity,
      totalPrice,
      addInvoice
    };
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}

.card {
  border-radius: 15px;
}

.card-header {
  border-radius: 15px 15px 0 0;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}
</style>