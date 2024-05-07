import api from "./api.service";

class DishService {
  //Hàm này lấy tất cả các món chưa bị xóa (bao gồm các món ở trạng thái còn món và hết món) ở Admin
  async getAll() {
    return (await api.get("/dish")).data;
  }
  async getDishById(id) {
    return (await api.get(`/dish/${id}`)).data;
  }
  async getbyname(ten) {
    return (await api.get("/dish/byName", { params: { ten } })).data;
  }
  async HetMon(id) {
    return (await api.put(`/dish/HetMon/${id}`)).data;
  }
  async ConMon(id) {
    return (await api.put(`/dish/ConMon/${id}`)).data;
  }
  //Hàm này lấy tất cả các món ở trạng thái còn món từ Client
  async getAllDish() {
    return (await api.get("/dish/getAll")).data;
  }
  async getDishByCat(id) {
    const data = (await api.get(`/dish/getDishByCat/${id}`)).data;
    console.log(data)
    return data
  }
}
export default new DishService();
