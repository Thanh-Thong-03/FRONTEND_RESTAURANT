<template>
  <div>
    <div class="card-header bg-primary text-white">
      <h3 class="mb-0">Quản lý đơn hàng</h3>
    </div>
    <div class="container-btn">
      <button @click="getBillsUnPaid()">Chưa Thanh Toán</button>
      <button @click="getBillsPaid()">Đã Thanh Toán</button>
    </div>

    <div class="container-order-item">
      <div
        v-for="(billItem, id) in billItems"
        :key="billItem.bill.bill_id"
        class="order-item"
      >
        <h5 class="order-title">Đơn hàng #{{ id + 1 }}</h5>
        <div class="order-header">
          <div class="order-info">
            <p class="order-info-item">
              Bàn: {{ billItem.bill.table.table_name }}
            </p>
            <p class="order-info-item">
              Khu vực: {{ billItem.bill.table.area.area_name }}
            </p>
            <p class="order-info-item">
              Trạng thái: {{ billItem.bill.bill_status_paid }}
            </p>
            <p class="order-info-item">
              Thời gian: {{ billItem.bill.createdAt }}
            </p>
          </div>
        </div>
        <ul class="order-list">
          <div class="order-item-detail">
            <span class="dish-name">STT</span>
            <span class="dish-name">Tên Món Ăn</span>
            <span class="dish-name">SL</span>
          </div>
          <li
            v-for="(order, index) in billItem.orders"
            :key="index"
            class="order-item-detail"
          >
            <span class="dish-name"> {{ index + 1 }}</span>
            <span class="dish-name"> {{ order.dish.dish_name }}</span>
            <span class="dish-name">{{ order.quantity }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import billService from "../services/bill.service";
import orderService from "../services/order.service";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const toast = useToast();
    const bills = ref([]);
    const orders = ref([]);
    const billItems = ref([]);

    onBeforeMount(async () => {
      bills.value = await billService.getAll();
      console.log(bills.value);
      // Lặp qua mỗi đơn hàng và lấy các món ăn tương ứng
      for (const bill of bills.value) {
        console.log(bill);
        console.log(bill.bill_id);
        orders.value = await orderService.getOrderByBillId(bill.bill_id);
        console.log(orders.value);
        // Tạo đối tượng mới chứa thông tin của bill và các order
        const billItem = {
          bill: bill,
          orders: orders.value,
        };

        // Đẩy đối tượng billItem vào mảng billItems
        billItems.value.push(billItem);
      }
      console.log(billItems.value);
    });

    const getBillsUnPaid = async () => {
      // Xóa bỏ các mục cũ trong mảng billItems
      billItems.value.splice(0, billItems.value.length);
      bills.value = await billService.getAllBillsUnPaid();
      console.log(bills.value);
      // Lặp qua mỗi đơn hàng và lấy các món ăn tương ứng
      for (const bill of bills.value) {
        console.log(bill);
        console.log(bill.bill_id);
        orders.value = await orderService.getOrderByBillId(bill.bill_id);
        console.log(orders.value);
        // Tạo đối tượng mới chứa thông tin của bill và các order
        const billItem = {
          bill: bill,
          orders: orders.value,
        };

        // Đẩy đối tượng billItem vào mảng billItems
        billItems.value.push(billItem);
      }
      console.log(billItems.value);
    };

    const getBillsPaid = async () => {
      // Xóa bỏ các mục cũ trong mảng billItems
      billItems.value.splice(0, billItems.value.length);
      bills.value = await billService.getBillsPaid();
      console.log(bills.value);
      // Lặp qua mỗi đơn hàng và lấy các món ăn tương ứng
      for (const bill of bills.value) {
        console.log(bill);
        console.log(bill.bill_id);
        orders.value = await orderService.getOrderByBillId(bill.bill_id);
        console.log(orders.value);
        // Tạo đối tượng mới chứa thông tin của bill và các order
        const billItem = {
          bill: bill,
          orders: orders.value,
        };

        // Đẩy đối tượng billItem vào mảng billItems
        billItems.value.push(billItem);
      }
      console.log(billItems.value);
    };

    return {
      bills,
      orders,
      getBillsUnPaid,
      getBillsPaid,
      billItems,
    };
  },
};
</script>

<style>
.card-header {
  padding: 20px;
  background: #2d99ae !important;
  margin-bottom: 20px;
}

.container-order-item {
  display: flex;
  flex-wrap: wrap;
  background: #bcfefe;
  padding: 8px;
  /* justify-content: space-between; */
}

.order-item {
  width: 310px;
  border: 1px solid #252424;
  border-radius: 5px;
  padding: 20px;
  margin: 13px;
  background: #f0dc9a;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.order-title {
  margin-bottom: 10px;
  font-weight: bold;
}

.order-info {
  display: flex;
  flex-direction: column;
}

.order-info-item {
  margin-bottom: 5px;
}

.order-list {
  list-style: none;
  padding: 0;
}

.order-item-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.dish-name {
  font-weight: bold;
  /* margin: auto; */
}

button {
  margin: 0px 15px;
  background: #ffd342;
  border-radius: 5px;
  padding: 5px 10px;
}

button:hover {
  background-color: #ffc107;
}

.container-btn {
  background: #bcfefe;
  padding: 20px 0px;
  /* border-bottom: 5px solid black; */
  margin-bottom: 10px;
}
</style>