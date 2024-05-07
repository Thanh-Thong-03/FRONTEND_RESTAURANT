import api from "./api.service";

class OrderService {
  async getAll() {
    return (await api.get("/order")).data;
  }
  async create(data) {
    console.log(data)
    return (await api.post("/order", data)).data;
  }
  async getOrderByBillId(id) {
    return (await api.get(`/order/${id}`)).data;
  }
  async update(id, data) {
    return (await api.put(`/order/${id}`, data)).data;
  }
  // async delete(id) {
  //   return (await api.delete(`/order/${id}`)).data;
  // }
}
export default new OrderService();
