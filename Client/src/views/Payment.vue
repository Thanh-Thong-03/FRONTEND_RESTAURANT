<template>
  <div>
    <div class="navbar">
      <q-navbar>
        <q-toolbar-title>
          <h4 class="page-title">Thanh toán</h4>
        </q-toolbar-title>
        <q-btn
          class="btn-area"
          v-for="area in areas"
          :key="area.area_id"
          flat
          @click="getTablesByArea(area.area_id)"
          :label="area.area_name"
        />
      </q-navbar>
    </div>
    <!-- <div>
      <q-icon name="search" size="sm" color="primary" slot="prepend" />

      Input search
      <q-input
        type="search"
        placeholder="Tìm kiếm tên bàn"
        class="search-bar"
        v-model="searchQuery"
      ></q-input>

      Button search
      <q-btn @click="search" label="Tìm kiếm"></q-btn>
    </div> -->
    <div class="container">
      <div class="table-list">
        <div v-if="getTablesByArea">
          <q-btn
            class="btn-table"
            v-for="table in tables"
            :key="table.table_id"
            flat
            @click="selectTable(table.table_id, table.table_status)"
            :label="table.table_name"
            :class="{
              'table-empty': table.table_status === 'Trống',
              'table-serving': table.table_status === 'Đang Phục Vụ',
            }"
          />
        </div>
      </div>
      <div class="info">
        <div>
          <div v-if="billDetail">
            <div class="order-item">
              <h5>Thông tin của bàn {{ billDetail.bill.table.table_name }}</h5>
              <p>Bàn: {{ billDetail.bill.table.table_name }}</p>
              <p>Khu vực: {{ billDetail.bill.table.area.area_name }}</p>
              <div>  
                <table class="order-list">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên Món Ăn</th>
                    <th>Giá Tiền</th>
                    <th>SL</th>
                    <th>Thành Tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(order, index) in billDetail.orders"
                    :key="index"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ order.dish.dish_name }}</td>
                    <td>{{ order.dish.dish_price }}</td>
                    <td>{{ order.quantity }}</td>
                    <td>{{ order.dish.dish_price * order.quantity }}</td>
                  </tr>
                </tbody>
              </table>
              </div>
              <p class="dish-total" >Tổng tiền: {{ billDetail.bill.bill_price }}</p>
              <q-btn
                @click="
                  Paidment(
                    billDetail.bill.bill_id,
                    billDetail.bill.table.table_id
                  )
                "
                label="Thanh Toán"
                class="complete-btn"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { ref, onBeforeMount } from "vue";
import areaService from "../services/area.service";
import tableService from "../services/table.service";
import billService from "../services/bill.service";
import orderService from "../services/order.service";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const areas = ref([]);
    const tables = ref([]);
    const billDetail = ref();
    const toast = useToast();

    onBeforeMount(async () => {
      areas.value = await areaService.getAll();
      tables.value = await tableService.getAll();
    });

    const getTablesByArea = async (area_id) => {
      try {
        const tablesByArea = await tableService.getTablesByArea(area_id);
        tables.value = tablesByArea;
        console.log(tables.value);
      } catch (error) {
        console.log(error);
      }
    };

    const selectTable = async (table_id, table_status) => {
      try {
        if (table_status == "Đang Phục Vụ") {
          const bill = await billService.getBillByTableId(table_id);
          console.log(bill);
          const orders = await orderService.getOrderByBillId(bill.bill_id);
          console.log(orders);
          billDetail.value = {
            bill: bill,
            orders: orders,
          };
          console.log(billDetail.value);
        } else {
          toast.warning("Bàn đang trống");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const Paidment = async (billId, tableId) => {
      try {
        console.log(billId, tableId);
        await billService.update(billId, {
          bill_status_paid: "Đã Thanh Toán",
        });
        tableService.updateTableStatus(tableId, {
          table_status: "Trống",
        });
        toast.success("Thanh toán thành công");
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      } catch (error) {
        console.log(error);
      }
    };

    return {
      areas,
      tables,
      billDetail,
      getTablesByArea,
      Paidment,
      selectTable,
    };
  },
};
</script>

  <style scoped>
.container {
  background: white;
  display: flex;
}

.table-list {
  /* background: #f0ecec; */
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px;
  border-right: 20px solid #d1e8e2;
}

.page-title {
  /* text-align: center; */
  background: #06f1f1;
  padding: 15px;
  border: 1px solid #252424;
  /* border-radius: 3px; */
  margin: 0px 0px 15px 0px;
}

.info {
  background: #583737;
}

.order-item {
  width: 330px;
  border: 1px solid #252424;
  border-radius: 5px;
  padding: 20px;
  margin: 10px;
  background: #f3d4b7;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.navbar {
  align-items: center;
  justify-content: space-between;
}

.btn-area {
  margin: 20px;
  background: #393cec;
  font-size: 20px;
}

.btn-area:hover {
  background: #0237e6;
}

.btn-table {
  width: 100px;
  height: 100px;
  margin: 20px;
  background: #999595;
  font-size: 25px;
}

.search-bar {
  width: 200px;
  margin-left: 10px;
}

h5 {
  margin: 15px 0px;
}

.dish-item {
  margin: 20px 30px;
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  flex-direction: column;
}

.dish-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.dish-info {
  padding: 10px;
}

.dish-name {
  font-weight: bold;
  /* margin: auto; */
}

.order-list {
  list-style: none;
  padding: 0px;
  width: 100%;
}

.table-empty {
  background-color: rgb(183, 184, 181); /* Màu xám cho bàn trống */
}

.table-serving {
  background-color: rgb(250, 53, 27); /* Màu đỏ cho bàn chưa thanh toán */
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

th {
  text-align: center;
  font-weight: bold;
  /* background: #f080e1; */
  padding: 5px 0px;
}

td {
  text-align: center;
  /* background: #66f779; */
  padding: 5px;
}

.dish-total {
  text-align: right;
  font-weight: bold;
  margin-top: 15px;
}
</style>