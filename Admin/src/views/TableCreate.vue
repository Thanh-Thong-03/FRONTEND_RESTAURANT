<template>
  <div>
    <h3>Thêm bàn ăn</h3>
    <div class="form">
      <div class="info">
        <div class="form-group">
          <label>Tên bàn ăn:</label>
          <input
            type="text"
            class="form-control"
            v-model="table.table_name"
            placeholder="Nhập tên bàn ăn"
          />
        </div>

        <div class="form-group">
          <label>Khu vực:</label>
          <div class="input-group">
            <select class="form-control" v-model="table.area_id">
              <option
                v-for="(area, index) in areas"
                :key="index"
                :value="area.area_id"
              >
                {{ area.area_name }}
              </option>
            </select>
            <div class="input-group-append">
              <button class="btn btn-add" @click="showAddForm = true">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <div class="overlay" v-if="showAddForm" @click="closeForm">
            <div class="form-container" @click.stop>
              <h4>Thêm khu vực</h4>
              <input
                type="text"
                v-model="area.area_name"
                class="form-control"
                placeholder="Nhập tên khu vực"
              />
              <button type="submit" class="btn btn-success" @click="addNewArea">
                Thêm khu vực
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <router-link to="/admin/table">
          <button class="btn btn-primary">Quay lại</button>
        </router-link>
        <button @click="createTable" class="btn btn-primary">
          Thêm bàn ăn
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive, ref } from "vue";
import tableService from "../services/table.service";
import areaService from "../services/area.service";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export default {
  setup() {
    const toast = useToast();
    const router = useRouter();

    const table = reactive({
      table_name: "",
      area_id: "",
    });

    const area = reactive({
      area_name: "",
    });

    const areas = ref([]);
    const showAddForm = ref(false);

    onBeforeMount(async () => {
      try {
        areas.value = await areaService.getAll();
      } catch (error) {
        console.log(error);
      }
    });

    const addNewArea = async () => {
      try {
        const newArea = await areaService.create(area);
        console.log(newArea);
        showAddForm.value = false;
        toast.success("Thêm khu vực thành công");
      } catch (error) {
        console.log(error);
      }
    };

    const closeForm = async () => {
      showAddForm.value = false;
    };

    const createTable = async () => {
      try {
        // Kiểm tra điều kiện dữ liệu không được để trống
        if (!table.table_name || !table.area_id) {
          toast.error("Không được để trống");
          return;
        }
        const newTable = await tableService.create(table);
        console.log(newTable);
        toast.success("Thêm bàn ăn thành công");
        router.push({ path: "/admin/table" });
      } catch (error) {
        console.log(error);
      }
    };

    return {
      table,
      areas,
      showAddForm,
      area,
      addNewArea,
      closeForm,
      createTable,
    };
  },
};
</script>
    
    <style scoped>
.form {
  padding: 20px;
  background-color: #bcfefe;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.info {
  padding: 25px;
}

h3 {
  color: white;
  padding: 20px;
  background: #2d99ae !important;
  margin-bottom: 15px;
}

h4 {
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  border-radius: 5px;
}

.btn {
  background-color: #12559c;
  color: #fff;
  border-radius: 5px;
  padding: 8px 16px;
}

.btn-success {
  margin-top: 20px;
  margin-left: 27px;
}

.btn-primary {
  margin: 25px;
}

.btn-add {
  margin-left: 15px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.form-container {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
</style>