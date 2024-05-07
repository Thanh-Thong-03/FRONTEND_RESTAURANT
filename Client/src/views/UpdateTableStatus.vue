<template>
  <div class="container">
    <div class="card-header bg-primary text-white">
      <h4 class="page-title">Cập nhật trạng thái món ăn</h4>
    </div>
    <div>
      <div class="row mb-3">
        <div>
          <button class="btn-search" @click="searchDish">Tìm kiếm</button>
        </div>
        <div>
          <input
            class="input-search"
            v-model="nameDish"
            placeholder="Tìm kiếm..."
          />
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tên món ăn</th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Hết Món</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dish, index) in dishes" :key="dish.dish_id">
            <td scope="row">{{ index+1 }}</td>
            <td>{{ dish.dish_name }}</td>
            <td><img :src="dish.dish_img" /></td>
            <td>{{ dish.dish_status }}</td>
            <td>
              <div>
                <q-toggle
                  v-model="dish.status"
                  @click="UpdateStatusDish(dish.dish_id, dish.status)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
        // Thiết lập giá trị ban đầu cho toggle dựa trên trạng thái của món ăn
        dishes.value.forEach((dish) => {
          if (dish.dish_status === "Hết Món") {
            dish.status = true;
          } else {
            dish.status = false;
          }
        });
      } catch (error) {
        console.log(error);
      }
    });

    const searchDish = async () => {
      dishes.value = await dishService.getbyname(nameDish.value);
      dishes.value.forEach((dish) => {
        if (dish.dish_status === "Hết Món") {
          dish.status = true;
        } else {
          dish.status = false;
        }
      });
    };

    const UpdateStatusDish = (id, statusDish) => {
      console.log(id, statusDish);
      if (statusDish == true) {
        dishService.HetMon(id);
        toast.success("Đã cập nhật trạng thái hết món");
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      } else {
        dishService.ConMon(id);
        toast.success("Đã cập nhật trạng thái còn món");
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }
    };

    return {
      dishes,
      nameDish,
      searchDish,
      UpdateStatusDish,
    };
  },
};
</script>
  
  <style scoped>
.page-title {
  /* text-align: center; */
  color: black;
  background: #06f1f1;
  padding: 15px;
  border: 1px solid #252424;
  /* border-radius: 3px; */
  margin: 0px 0px 15px 0px;
}

.dish-list {
  display: flex;
  flex-wrap: wrap;
}

.table {
  width: 100%;
  /* background: #a8a3a3; */
  /* margin-top: 10px; */
  padding: 15px 0px;
}

.dish-item {
  width: 300px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
}

.a {
  display: flex;
  height: 40px;
}

.btn-search {
  color: white;
  padding: 8px;
  margin: 10px 10px 10px 0px;
  display: flex;
  background: #365ad3;
  border: 0px;
  border-radius: 3px;
}

.input-search {
  padding: 8px;
  background: #f5f0f0;
  border: 1px solid #424141;
  /* height: 40px; */
  /* padding: 10px; */
  margin: 10px;
}

img {
  max-width: 80px;
  border: 1px solid black;
}

th {
  background: #37bdf1;
  padding: 10px;
}

td {
  text-align: center;
  background: #f3d4b7;
}
</style>