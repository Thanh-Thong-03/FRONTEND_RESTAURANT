<template>
  <div>
    <h4 class="page-title">Danh sách đơn hàng</h4>
    <div class="container-order-item" v-if="billItems.length > 0">
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
              Trạng thái: {{ billItem.bill.bill_status_completed }}
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
        <q-btn
          @click="completeOrder(billItem.bill.bill_id)"
          label="Hoàn thành"
          class="complete-btn"
        />
      </div>
    </div>
    <div v-else>
      <p>Không có đơn nào</p>
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
      bills.value = await billService.getAllUnCompleted();
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

    const completeOrder = async (billId) => {
      await billService.update(billId, {
        bill_status_completed: "Đã Hoàn Thành",
      });
      toast.success("Đã Hoàn Thành Đơn Hàng");
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    };

    return {
      bills,
      orders,
      billItems,
      completeOrder,
    };
  },
};
</script>

<style>
.page-title {
  /* text-align: center; */
  background: #06f1f1;
  padding: 15px;
  border: 1px solid #252424;
  /* border-radius: 3px; */
  margin: 0px 0px 15px 0px;
}

.container-order-item {
  display: flex;
  flex-wrap: wrap;
  background: #d2d4d4;
  padding-left: 6px;
  /* justify-content: space-between; */
}

.order-item {
  width: 290px;
  border: 1px solid #252424;
  /* border-radius: 5px; */
  padding: 20px;
  margin: 12px;
  background: #f3d4b7;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.order-title {
  margin: 0;
  font-weight: bold;
}

.order-info {
  display: flex;
  flex-direction: column;
}

.order-info-item {
  margin: 5px 0;
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

.complete-btn {
  border: 1px solid #252424;
  border-radius: 5px;
  margin-top: 15px;
  width: 100%;
}

.complete-btn:hover {
  background: #f0c297;
}
</style>