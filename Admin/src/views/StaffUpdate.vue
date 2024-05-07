<template>
  <div>
    <h3>Chỉnh sửa nhân viên</h3>
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
              <button class="btn-editImg" @click="editImg">
                Cập nhật hình ảnh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>Chức vụ:</label>
        <select class="form-control" v-model="user.role_id">
          <option value="2">Phục vụ</option>
          <option value="3">Thu Ngân</option>
          <option value="4">Bếp</option>
        </select>
      </div>

      <div class="d-flex justify-content-between form-group">
        <router-link to="/admin/staff">
          <button class="btn btn-primary">Quay lại</button>
        </router-link>
        <button class="btn btn-primary" @click="updateUser">
          Chỉnh sửa nhân viên
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { onBeforeMount, reactive, ref } from "vue";
import staffService from "../services/staff.service";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const toast = useToast();
    const route = useRoute();
    const router = useRouter();
    const id = route.params.id;

    const user = reactive({
      user_name: "",
      user_sex: "",
      user_birthday: "",
      user_email: "",
      role_id: "",
    });

    const user_img = ref();
    const userImg = ref();

    onBeforeMount(async () => {
      try {
        const res = await staffService.getStaffById(id);
        user.user_name = res.user_name;
        user.user_sex = res.user_sex;
        userImg.value = res.user_avatar;
        user.user_birthday = res.user_birthday;
        user.user_email = res.user_email;
        user.role_id = res.role.role_id;
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    });

    const onAvatarChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        user_img.value = file;
      }
    };

    const editImg = async () => {
      userImg.value = URL.createObjectURL(user_img.value);
      try {
        const formData = new FormData();
        formData.append("user_avatar", user_img.value);
        for (let pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        const user = await staffService.editImg(id, formData);
        userImg.value = user.user_avatar;
      } catch (error) {
        console.log(error);
      }
    };

    const updateUser = async () => {
      try {
        // Kiểm tra điều kiện dữ liệu không được để trống
        if (
          !user.user_name ||
          !user.user_sex ||
          !user.user_birthday ||
          !user.user_email ||
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
        formData.append("user_birthday", user.user_birthday);
        formData.append("user_email", user.user_email);
        formData.append("role_id", user.role_id);

        for (let pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }

        await staffService.update(id, formData);
        toast.success("Cập nhật nhân vên thành công");
        router.push({ path: "/admin/staff" });
      } catch (error) {
        console.log(error);
      }
    };
    return {
      user,
      onAvatarChange,
      updateUser,
      editImg,
      user_img,
      userImg,
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
  margin: 10px 26% 0px 26%;
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
  
