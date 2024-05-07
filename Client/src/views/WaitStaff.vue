<template>
  <div>
    <div class="navbar">
      <q-navbar>
        <q-toolbar-title>
          <h4 class="page-title">Trạng thái bàn</h4>
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
    <!-- <q-item v-for="dish in dishes" :key="dish.id" class="dish-item">
          <h4>{{ dish.name }}</h4>
          <q-btn
            @click="addToCart(dish)"
            color="primary"
            label="Chọn bàn"
            class="dish-button"
            size="sm"
          />
          <q-btn
            color="primary"
            label="Xem chi tiết bàn"
            class="dish-button"
            size="sm"
          />
        </q-item> -->
    <div class="table-list" v-if="getTablesByArea">
      <q-btn
        class="btn-table"
        v-for="table in tables"
        :key="table.table_id"
        flat
        @click="
          selectTable(
            table.table_id,
            table.table_name,
            table.area.area_name,
            table.table_status
          )
        "
        :label="table.table_name"
        :class="{
          'table-empty': table.table_status === 'Trống',
          'table-serving': table.table_status === 'Đang Phục Vụ',
        }"
      />
    </div>
  </div>
</template>
  
  <script>
import { ref, onBeforeMount } from "vue";
import areaService from "../services/area.service";
import tableService from "../services/table.service";
import billService from "../services/bill.service";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const router = useRouter();
    const toast = useToast();
    const areas = ref([]);
    const tables = ref([]);

    onBeforeMount(async () => {
      areas.value = await areaService.getAll();
      tables.value = await tableService.getAll();
      //   const getTableStatus = async (tableStatus) => {
      //   switch (tableStatus) {
      //     case "Trống":
      //       return "table-empty";
      //     case "Chưa thanh toán":
      //       return "table-unpaid";
      //     case "Đã thanh toán":
      //       return "table-paid";
      //     default:
      //       return "";
      //   }
      // };
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

    const selectTable = async (
      table_id,
      table_name,
      area_name,
      table_status
    ) => {
      try {
        if (table_status == "Trống") {
          console.log(table_id, table_name, area_name);
          const bill = await billService.create({
            table_id: table_id,
            staff_id: localStorage.getItem("userId"),
          });
          console.log(bill);
          router.push({
            name: "addorder",
            query: {
              table_id: table_id,
              table_name: table_name,
              area_name: area_name,
              bill_id: bill.bill_id,
            },
          });
        } else {
          toast.warning("Bàn đã được phục vụ rồi");
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      areas,
      tables,
      // getTableStatus,
      getTablesByArea,
      selectTable,
    };
  },
};
</script>

  <style scoped>
.table-list {
  background: #d0d4d4;
  padding: 20px 20px 20px 27px;
  margin-top: 10px;
}

.info {
  background: #583737;
}

.navbar {
  align-items: center;
  justify-content: space-between;
}

.page-title {
  /* text-align: center; */
  background: #06f1f1;
  padding: 15px;
  border: 1px solid #252424;
  /* border-radius: 3px; */
  margin: 0px 0px 15px 0px;
}

.btn-area {
  margin: 20px 20px 20px 0px;
  background: #393cec;
  font-size: 20px;
}

.btn-area:hover {
  background: #0237e6;
}

.btn-table {
  width: 140px;
  height: 140px;
  margin: 20px;
  background: #999595;
  font-size: 25px;
}

.search-bar {
  width: 200px;
  margin-left: 10px;
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
}

.dish-price {
  color: #777;
}

.dish-button {
  margin-top: 10px;
}

.dish-quantity {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dish-quantity-input {
  width: 50px;
  text-align: center;
}

.table-empty {
  background-color: rgb(6, 252, 59); /* Màu xám cho bàn trống */
}

.table-serving {
  background-color: rgb(248, 24, 24); /* Màu đỏ cho bàn chưa thanh toán */
}
</style>