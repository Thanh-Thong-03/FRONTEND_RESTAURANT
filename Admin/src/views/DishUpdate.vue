<template>
    <div>
      <h3>Cập nhật món ăn</h3>
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
              <select class="form-control" v-model="dish.cat_id">
                <option v-for="(category, index) in categories" :key="index" :value="category.cat_id">{{ category.cat_name }}</option>
              </select>
            </div>
          </div>
          <div class="image">
            <div class="img"> 
              <div>
                <img :src="dishImg" />
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
              <button class="btn-showImg" @click="editImg">Xem hình ảnh</button>
            </div>
          </div>
        </div>
  
        <div class="d-flex justify-content-center">
          <router-link to="/admin/dish">
            <button class="btn btn-primary">Quay lại</button>
          </router-link>
          <button @click="updateDish" class="btn btn-primary">Cập nhật món ăn</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { onBeforeMount, reactive, ref } from "vue";
  import dishService from "../services/dish.service";
  import catService from "../services/cat.service";
  import { useToast } from "vue-toastification";
  import { useRouter, useRoute } from "vue-router";
  
  export default {
    setup() {
      const toast = useToast();
      const router = useRouter();
      const route = useRoute();
      const id = route.params.id
  
      const dish = reactive({
        name: "",
        price: "",
        cat_id: "",
      });
      
      const dish_img = ref();
      const dishImg = ref();

      const categories = ref([])
  
      onBeforeMount(async () => {
        try {
            const res = await dishService.getDishById(id)
            dish.name = res.dish_name;
            dishImg.value = res.dish_img;
            dish.img = res.dish_img;
            dish.price = res.dish_price;
            dish.cat_id = res.cat_id;
            console.log(res)
            categories.value = await catService.getAll();
            console.log(categories)
        } catch(error){
          console.log(error);
        }
      });
  
      const onAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          dish_img.value = file;
        }
      };
  
      const editImg = async () => {
        //để xuất ra URL hình ảnh tạm thời
      dishImg.value = URL.createObjectURL(dish_img.value);
      try {

        const formData = new FormData();
        formData.append("dish_img", dish_img.value);
        // vòng lập for để hiện từng trường với giá trị tương ứng ra console bên client
        for (let pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        const dish = await dishService.editImg(id, formData);
        // dishImg giờ là một url được trả về từ server và cập nhật lại hình ảnh trước đó
        dishImg.value = dish.dish_img;
      } catch (error) {
        console.log(error);
      }
    };
  
      const updateDish = async () => {
        try {
          // Kiểm tra điều kiện dữ liệu không được để trống
          if (!dish.name || !dish.price || !dish.cat_id) {
            toast.error("Không được để trống");
            return;
          }
  
          // Tạo đối tượng formData và thêm dữ liệu vào
          const formData = new FormData();
          formData.append("dish_name", dish.name);
          formData.append("dish_price", dish.price);
          formData.append("cat_id", dish.cat_id);
  
          for(let pair of formData.entries()){
            console.log(pair[0] + ': ' + pair[1]);
          }
          await dishService.update(id, formData);
  
          toast.success("Thêm món ăn thành công");
          router.push({ path: "/admin/dish" });
        } catch (error) {
          console.log(error);
        }
      };
  
      return {
        dish,
        dishImg,
        dish_img,
        categories,
        onAvatarChange,
        editImg,
        updateDish,
      };
    },
  };
  </script>
      
      <style scoped>
  .form {
    padding: 20px;
    background-color: #BCFEFE;
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
    max-width: 280px;
    max-height: 200px;
    border-radius: 50%;
  }
  
  h3 {
    color: white;
    padding: 20px;
    background: #2d99ae !important;
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
  
  .btn-showImg {
    margin-top: 10px ;
    margin-bottom: 20px;
    margin-left: 30%;
    padding: 4px 8px;
    background-color: #12559c;
    color: #fff;
    border-radius: 5px;
  }
  
  .btn-primary {
    margin: 25px;
  }
  </style>