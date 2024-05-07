<template>
  <div>
    <h3>Thêm nhân viên</h3>
    <div class="form">
      <div>
        <div class="container">
          <div class="info">
            <div class="form-group">
              <label>Họ và tên:</label>
              <input
                type="text"
                class="form-control"
                v-model="user.user_name"
                placeholder="Nhập họ và tên"
              />
            </div>
            <div class="form-group">
              <label>Giới tính:</label>
              <select class="form-control" v-model="user.user_sex">
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
            <div class="form-group">
              <label>Email:</label>
              <input
                type="email"
                class="form-control"
                v-model="user.user_email"
                placeholder="Nhập email"
              />
            </div>
            <div class="form-group">
              <label>Ngày sinh:</label>
              <input
                type="date"
                class="form-control"
                v-model="user.user_birthday"
              />
            </div>
          </div>
          <div class="container-img">
            <div class="image">
              <div>  
                <img :src="userImg" />
              </div>
            </div>
            <div class="avatar">
              <label for="avatarInput">Avatar:</label>
              <input
                id="avatarInput"
                class="form-control"
                type="file"
                @change="onAvatarChange"
              />
              <button class="btn-editImg" @click="showImg">
                Xem hình ảnh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>Mật khẩu:</label>
        <input class="form-control" type="password" v-model="user.user_password"  placeholder="Nhập mật khẩu">
      </div>

      <div class="form-group">
        <label>Chức vụ:</label>
        <select class="form-control" v-model="user.role_id">
          <option value="2">Phục vụ</option>
          <option value="4">Bếp</option>
          <option value="3">Thu Ngân</option>
        </select>
      </div>

      <div class="d-flex justify-content-between form-group">
        <router-link to="/admin/staff">
          <button class="btn btn-primary">Quay lại</button>
        </router-link>
        <button class="btn btn-primary" @click="createUser">
          Thêm nhân viên
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref, reactive } from "vue";
import staffService from "../services/staff.service";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export default {
  setup() {
    const toast = useToast();
    const router = useRouter();
    const user = reactive({
      user_name: "",
      user_sex: "",
      user_avatar: "",
      user_birthday: "",
      user_email: "",
      user_password: "",
      role_id: "",
    });

    const userImg = ref();

    onBeforeMount(async () => {
      try {
        userImg.value = "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg";
      } catch(error){
        console.log(error);
      }
    });

    const onAvatarChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        user.user_avatar = file;
      }
    };

    const showImg = async () => {
      userImg.value = URL.createObjectURL(user.user_avatar);
    };

    const createUser = async () => {
      // Kiểm tra điều kiện dữ liệu không được để trống
      if (
        !user.user_name ||
        !user.user_sex ||
        !user.user_avatar ||
        !user.user_birthday ||
        !user.user_email ||
        !user.user_password ||
        !user.role_id
      ) {
        toast.error("Vui lòng điền đầy đủ thông tin");
        return;
      }

      // Kiểm tra định dạng email hợp lệ
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user.user_email)) {
        toast.error("Email không đúng định dạng");
        return;
      }

      const formData = new FormData();
      formData.append("user_name", user.user_name);
      formData.append("user_sex", user.user_sex);
      formData.append("user_avatar", user.user_avatar);
      formData.append("user_birthday", user.user_birthday);
      formData.append("user_email", user.user_email);
      formData.append("user_password", user.user_password);
      formData.append("role_id", user.role_id);

      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      
      await staffService.create(formData);
      toast.success("Thêm nhân vên thành công");
      router.push({ path: "/admin/staff" });
    };

    return {
      user,
      userImg,
      showImg,
      onAvatarChange,
      createUser,
    };
  },
};
</script>

<style scoped>
.container {
  padding: 0px;
  display: flex;
  border-radius: 15px;
}

h3 {
    color: white;
    padding: 20px;
    background: #2d99ae !important;
    margin-bottom: 15px;
}

.container-img {
  margin: 15px 15px 0px 20px;
  width: 50%;
}

.image {
  display: flex;
  justify-content: center;
}

.btn-editImg {
  margin: 10px 0px 0px 180px;
  background-color: #0f4177;
  color: #fff;
  border-radius: 10px;
}

img {
    max-width: 300px;
    max-height: 220px;
    border-radius: 50%;
}
.avatar {
  margin: 10px 0px 0px 0px;
}

.form {
  padding: 20px;
    background-color: #BCFEFE;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.info {
  width: 50%;
}

.form-group {
  margin: 0px 15px 20px 20px;
}

.btn {
  background-color: #0f4177;
  color: #fff;
  border-radius: 5px;
  padding: 8px 16px;
}

.btn-primary {
  margin: 10px 10px;
}
</style>
