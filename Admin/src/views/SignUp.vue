<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <!-- Thêm lớp justify-content-center để căn giữa -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-header bg-primary text-white text-center">
            <h4>Đăng Ký</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="signup">
              <div class="mb-3">
                <label for="username" class="form-label">Nhập email</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  v-model="user.email"
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Nhập mật khẩu</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="user.password"
                />
              </div>
              <button type="submit" class="btn btn-primary btn-block">
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
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

    const signup = async () => {
      //Kiem tra du lieu khong duoc de trong
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
        console.log(user);
        const userLogin = await staffService.signup(user);
        console.log(userLogin);
        if (!userLogin) {
          toast.error("Sai tên đăng nhập hoặc mật khẩu");
        } else {
          toast.success("Đăng kys thành công");
          router.push({ path: "/admin/staff" });
        }
      } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        toast.error("Đã xảy ra lỗi khi đăng nhập");
      }
    };

    return {
      user,
      signup,
    };
  },
};
</script>
  
  <style scoped>
.card {
  border-radius: 15px;
}

.card-header {
  border-radius: 15px 15px 0 0;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>