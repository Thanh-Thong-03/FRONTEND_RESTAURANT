import api from "./api.service";

class TableService {
  async getAll() {
    return (await api.get("/table")).data;
  }
  async create(data) {
    return (await api.post("/table", data)).data;;
  }
  async getTableById(id) {
    return (await api.get(`/table/${id}`)).data;
  }
  async getbyname(ten) {
    return (await api.get("/table/byname", { params: { ten } })).data;
  }
  async update(id, data) {
    return await api.put(`/table/${id}`, data).data;
  }
  async delete(id) {
    return (await api.delete(`/table/${id}`)).data;
  }
}
export default new TableService();
