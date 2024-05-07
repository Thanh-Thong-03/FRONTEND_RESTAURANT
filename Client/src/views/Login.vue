<template>
  <q-page class="background">
    <q-page-container>
      <div class="q-pa-md">
        <h4>Welcome to Thong's Restaurant</h4>
      </div>
      <div class="container-login q-mb-md">
        <div class="login-card">
          <div class="icon">
            <q-icon name="person" class="text-white" size="6em" />
          </div>
          <h4 class="text-white">Login</h4>
          <q-form @submit.prevent="login">
            <q-input
            class="input"
              v-model="user.email"
              filled
              color="white"
              type="email"
              placeholder="Nhập Email"
              dense
            />
            <q-input
            class="input"
              v-model="user.password"
              filled
              color="white"
              type="password"
              placeholder="Password"
              dense
            />
            <q-btn
              class="full-width q-mt-md btn-login"
              color="primary"
              label="Login"
              type="submit"
            />
          </q-form>
          <!-- <div class="btn-getPassword">
            <a href="#">Forgot Password</a>
          </div> -->
        </div>
      </div>
    </q-page-container>
  </q-page>
</template>

<script>
import { reactive } from "vue";
import userService from "../services/user.service";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export default {
  setup() {
    const toast = useToast();
    const router = useRouter();
    const user = reactive({
      email: "",
      password: "",
    });

    const login = async () => {
      //Kiểm tra dữ liệu không được để trống
      if (!user.email || !user.password) {
        toast.error("Không được để trống");
        return;
      }

      // Kiểm tra định dạng email hợp lệ
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user.email)) {
        toast.error("Email không đúng định dạng");
        return;
      }

      // Thực hiện đăng nhập
      try {
        const userLogin = await userService.login(user);
        console.log(userLogin)
        if (userLogin) {
          localStorage.setItem("userId", userLogin.user_id);
          localStorage.setItem("userRole", userLogin.role.role_name);
          localStorage.setItem("token", userLogin.accessToken);
          toast.success("Đăng nhập thành công");
          router.push({ path: "/" });
        } else {
          toast.error("Sai tên đăng nhập hoặc mật khẩu");
        }
      } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        toast.error("Email hoặc mật khẩu không đúng");
      }
    };

    return {
      user,
      login,
    };
  },
};
</script>

<style scoped>
.background {
  background-image: url("https://phongcachmoc.vn/upload/images/tin-tuc/20%20mau%20nha%20hang%20dep/update-07-2022/Thiet-ke-nha-hang-lau-Little-Dragon-Ba-Bia-khu-vuc-ghe-ngoi-12.jpg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

h4 {
  text-align: center;
  color: white;
  margin: 40px 0px;
}

.container-login {
  margin: auto;
  width: 330px;
  height: 450px;
  background: rgba(36, 33, 33, 0.85);
  /* Màu nền với độ trong suốt 50% */
  padding: 15px;
}

.icon {
  padding: 0px auto;
  text-align: center;
}

.btn-login {
  text-align: center;
  padding: 5px 0px;
  margin: 25px 0px;
  background: #6b6a6a !important;
  color: black !important;
  border-radius: 7px;
}

.btn-login:hover {
  background: #575353 ;
}

button {
  border: 0px;
  background-color: transparent;
  /* Đặt màu nền là trong suốt */
  color: black;
  font-weight: 600;
}

.input {
  background: white;
  margin: 20px 0px;
  border-radius: 7px;
}
</style>