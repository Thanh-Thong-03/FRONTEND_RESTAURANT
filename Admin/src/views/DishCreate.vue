<template>
  <div>
    <h3>Thêm món ăn</h3>
    <div class="form">
      <div class="container">
        <div class="info">
          <div class="form-group">
            <label>Tên món ăn:</label>
            <input
              type="text"
              class="form-control"
              v-model="dish.name"
              placeholder="Nhập tên món ăn"
            />
          </div>

          <div class="form-group">
            <label>Giá món ăn:</label>
            <input
              type="number"
              class="form-control"
              v-model="dish.price"
              placeholder="Nhập giá món ăn"
            />
          </div>

          <div class="form-group">
            <label>Danh mục:</label>
            <div class="input-group">
              <select class="form-control" v-model="dish.cat_id">
                <option
                  v-for="(category, index) in categories"
                  :key="index"
                  :value="category.cat_id"
                >
                  {{ category.cat_name }}
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
                <h4>Thêm danh mục</h4>
                <input
                  type="text"
                  v-model="cat.cat_name"
                  class="form-control"
                  placeholder="Nhập tên danh mục"
                />
                <button
                  type="submit"
                  class="btn btn-success"
                  @click="addNewCategory"
                >
                  Thêm danh mục
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="image">
          <div class="img">
            <div>
              <img :src="userImg" />
            </div>
          </div>
          <div class="Avatar">
            <label>Avatar:</label>
            <input
              class="form-control"
              type="file"
              placeholder="Nhập hình ảnh món ăn"
              @change="onAvatarChange"
            />
            <button class="btn-showImg" @click="showImg">Xem hình ảnh</button>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-center">
        <router-link to="/admin/dish">
          <button class="btn btn-primary">Quay lại</button>
        </router-link>
        <button @click="createDish" class="btn btn-primary">Thêm món ăn</button>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive, ref } from "vue";
import dishService from "../services/dish.service";
import catService from "../services/cat.service";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export default {
  setup() {
    const toast = useToast();
    const router = useRouter();

    const dish = reactive({
      name: "",
      img: "",
      price: "",
      cat_id: "",
    });

    const cat = reactive({
      cat_name: "",
    });

    const userImg = ref();
    const categories = ref([]);
    const showAddForm = ref(false);

    onBeforeMount(async () => {
      try {
        userImg.value =
          "https://img.lovepik.com/free-png/20211119/lovepik-checker-cloth-png-image_401043972_wh1200.png";
        categories.value = await catService.getAll();
      } catch (error) {
        console.log(error);
      }
    });

    const onAvatarChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        dish.img = file;
      }
    };

    const showImg = async () => {
      userImg.value = URL.createObjectURL(dish.img);
    };

    const addNewCategory = async () => {
      try {
        const newcat = await catService.create(cat);
        console.log(newcat);
        showAddForm.value = false;
        toast.success("Thêm danh mục thành công");
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      } catch (error) {
        console.log(error);
      }
    };

    const closeForm = async () => {
      showAddForm.value = false;
    };

    const createDish = async () => {
      try {
        // Kiểm tra điều kiện dữ liệu không được để trống
        if (!dish.name || !dish.img || !dish.price || !dish.cat_id) {
          toast.error("Không được để trống");
          return;
        }
        console.log(dish);
        // Tạo đối tượng formData và thêm dữ liệu vào
        const formData = new FormData();
        formData.append("dish_name", dish.name);
        formData.append("dish_img", dish.img);
        formData.append("dish_price", dish.price);
        formData.append("cat_id", dish.cat_id);

        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
        await dishService.create(formData);
        toast.success("Thêm món ăn thành công");
        router.push({ path: "/admin/dish" });
      } catch (error) {
        console.log(error);
      }
    };

    return {
      dish,
      userImg,
      categories,
      showAddForm,
      cat,
      addNewCategory,
      closeForm,
      onAvatarChange,
      showImg,
      createDish,
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

.container {
  display: flex;
}

.info {
  width: 60%;
  padding-right: 50px;
  padding-top: 31px;
}

.image {
  width: 40%;
}

.img {
  display: flex;
  justify-content: center;
}

img {
  max-width: 250px;
  max-height: 200px;
  border-radius: 50%;
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

.btn-showImg {
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 35%;
  padding: 4px 8px;
  background-color: #12559c;
  color: #fff;
  border-radius: 5px;
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