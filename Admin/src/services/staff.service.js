import api from "./api.service";

class staffService {
  async login(user) {
    return (await api.post("/user/login", user)).data;
  }
  async create(formData) {
    return await api.post("/user", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).data;
  }
  async getAll() {
    return (
      await api.get("/user", {
        headers: { 'token': "Bearer " + localStorage.getItem("token") },
      })
    ).data;
  }
  async getStaffById(id) {
    return (await api.get(`/user/${id}`)).data;
  }
  async getbyname(ten) {
    // console.log(ten)
    return (await api.get("/user/byname", { params: { ten } })).data;
  }
  async update(id, data) {
    return (await api.put(`/user/${id}`, data)).data;
  }
  async delete(id) {
    return (await api.delete(`/user/${id}`)).data;
  }
  async editImg(id, data) {
    return await api.put(`/user/${id}/editImg`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }).data;
  }
  async checkEmail(email) {
    return (await api.post("/user/checkemail", email)).data;
  }
  async signup(user) {
    try {
      const response = await api.post("/user/register", user);
      return response.data; // Trả về dữ liệu từ phản hồi
    } catch (error) {
      console.error("Lỗi khi đăng ký người dùng:", error);
      throw error; // Ném lỗi để bắt ở nơi gọi (nếu cần)
    }
  }
}

export default new staffService();
