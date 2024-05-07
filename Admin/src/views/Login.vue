<template>
  <div class="background">
    <div>
      <h2>Welcome to Thong's Restaurant</h2>
    </div>
    <div class="container-login">
      <div class="login-card">
        <div class="icon">
          <span
            class="fas fa-user-circle fs-5 text-white"
            style="font-size: 100px !important"
          ></span>
        </div>
        <h3>Login</h3>
        <form @submit.prevent="login">
          <div>
            <input
              v-model="user.email"
              type="email"
              class="form-control btn"
              placeholder="Nhập Email"
            />
          </div>
          <div class="">
            <input
              v-model="user.password"
              type="password"
              class="form-control btn"
              placeholder="Password"
            />
          </div>
          <button class="form-control btn-login" type="submit">LOGIN</button>
        </form>
        <!-- <div class="btn-getPassword">
          <a href="#">Forgot Password</a>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import staffService from "../services/staff.service";
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
        const userLogin = await staffService.login(user);
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

.container-login {
  /* margin: 50px auto; */
  margin: auto;
  width: 330px;
  height: 450px;
  background: rgba(36, 33, 33, 0.85); /* Màu nền với độ trong suốt 50% */
  padding: 15px;
}

h2 {
  color: white;
  margin-bottom: 40px;
  text-align: center;
  padding-top: 50px;
}

h3 {
  color: white;
  text-align: center;
  padding: 15px 0px;
}

.icon {
  padding: 20px 0px;
  text-align: center;
}

.btn {
  color: black;
  background: rgb(245, 240, 240);
  margin: 10px 0px;
}

.btn-login {
  /* color: white; */
  text-align: center;
  padding: 5px 0px;
  margin: 25px 0px;
  background: #6b6a6a;
  color: black;
}

.btn-login:hover {
  background: #575353;
}

button {
  /* border-radius: 5px; */
  border: 0px;
  background-color: transparent; /* Đặt màu nền là trong suốt */
  color: black;
  font-weight: 600;
}
</style>