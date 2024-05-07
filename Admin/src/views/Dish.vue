<template>
  <div>
    <div class="card-header bg-primary text-white">
      <h3 class="mb-0">Quản lý món ăn</h3>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-sm-7 mb-3">
            <router-link to="/admin/dish/create">
              <button class="btn">Thêm món ăn</button>
            </router-link>
          </div>
          <div class="col-sm-2 mb-3">
            <button class="btn" @click="searchDish">Tìm kiếm</button>
          </div>
          <div class="a col-sm-2 mb-3">
            <input
              v-model="nameDish"
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
              <th scope="col">Tên</th>
              <th scope="col">Hình ảnh</th>
              <th scope="col">Giá</th>
              <th scope="col">Danh mục</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(dish, id) in dishes" :key="dish.dish_id">
              <th scope="row">{{ id+1 }}</th>
              <td>{{ dish.dish_name }}</td>
              <td><img :src="dish.dish_img" alt="Avatar" /></td>
              <td>{{ dish.dish_price }}</td>
              <td>{{ dish.cat.cat_name }}</td>
              <td>
                <router-link :to="`/admin/dish/update/${dish.dish_id}`">
                  <button class="btn">Sửa</button>
                </router-link>
                <button
                  class="btn btn-delete"
                  @click="deleteDish(dish.dish_id)"
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
import dishService from "../services/dish.service";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const toast = useToast();

    const dishes = ref([]);
    const nameDish = ref();

    onBeforeMount(async () => {
      try {
        dishes.value = await dishService.getAll();
      } catch (error) {
        console.log(error);
      }
    });

    const searchDish = async () => {
      dishes.value = await dishService.getbyname(nameDish.value);
      console.log(dishes.value);
    };

    const deleteDish = async (id) => {
      const dishId = dishes.value.findIndex((dish) => dish.dish_id === id);
      if (dishId !== -1) {
        await dishService.delete(id);
        dishes.value.splice(dishId, 1);
        toast.success('Xóa món ăn thành công')
      } else {
        console.error("Sản phẩm với ID:{{id}} không tồn tại");
      }
    };

    return {
      dishes,
      nameDish,
      deleteDish,
      searchDish,
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