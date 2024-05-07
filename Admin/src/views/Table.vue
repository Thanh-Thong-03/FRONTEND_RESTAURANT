<template>
  <div>
    <div class="card-header bg-primary text-white">
      <h3 class="mb-0">Quản lý bàn ăn</h3>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-sm-7 mb-3">
            <router-link to="/admin/table/create">
              <button class="btn">Thêm bàn ăn</button>
            </router-link>
          </div>
          <div class="col-sm-2 mb-3">
            <button class="btn" @click="searchTable">Tìm kiếm</button>
          </div>
          <div class="a col-sm-2 mb-3">
            <input
              v-model="nameTable"
              type="text"
              class="form-control"
              placeholder="Tìm kiếm..."
            />
          </div>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Tên bàn</th>
              <th scope="col">Khu Vực</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(table, id) in tables" :key="table.table_id">
              <th scope="row">{{ id+1 }}</th>
              <td>{{ table.table_name }}</td>
              <td>{{ table.area.area_name }}</td>
              <td>
                <!-- <router-link :to="`/admin/table/update/${table.table_id}`">
                  <button class="btn">Sửa</button>
                </router-link> -->
                <button
                  class="btn btn-delete"
                  @click="deleteTable(table.table_id)"
                >
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import tableService from "../services/table.service";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const toast = useToast();
    const tables = ref([]);
    const nameTable = ref();

    onBeforeMount(async () => {
      try {
        tables.value = await tableService.getAll();
        console.log(tables.value)
      } catch (error) {
        console.log(error);
      }
    });

    const searchTable = async () => {
      console.log(nameTable.value)
      tables.value = await tableService.getbyname(nameTable.value);
      console.log(tables.value);
    };

    const deleteTable = async (id) => {
      const tableId = tables.value.findIndex((table) => table.table_id === id);
      if (tableId !== -1) {
        await tableService.delete(id);
        tables.value.splice(tableId, 1);
        toast.success('Xóa bàn ăn thành công')
      } else {
        console.error("Bàn ăn với ID:{{id}} không tồn tại");
      }
    };

    return {
      tables,
      nameTable,
      deleteTable,
      searchTable,
    };
  },
};
</script>

<style scoped>
.a {
  padding: 0px !important ;
  margin: 0px !important ;
}

.card-header {
  padding: 20px;
  background: #2d99ae !important;
  margin-bottom: 15px;
}

.card-body {
  margin: 0px;
  background: #bcfefe;
}

th {
  text-align: center;
  background: #bcfefe;
  vertical-align: middle;
  display: table-cell;
}
td {
  text-align: center;
  background: #bcfefe;
  vertical-align: middle;
  display: table-cell;
}

.btn {
  background-color: #ffd342;
  color: black;
  margin-right: 10px;
}

.btn-delete {
  background-color: rgb(235, 50, 50) !important;
  color: black;
  margin-right: 10px;
}

.btn-delete:hover {
  background-color: red !important;
}

.btn:hover {
  background-color: #ffc107;
}

img {
  width: 120px;
  border: 1px solid black;
}
</style>