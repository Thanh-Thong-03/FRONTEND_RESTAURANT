import api from "./api.service";

class TableService {
  async getAll() {
    return (await api.get("/table")).data;
  }
  async getTableById(id) {
    return (await api.get(`/table/${id}`)).data;
  }
  async getbyname(ten) {
    return (await api.get("/table/byName", { params: { ten } })).data;
  }
  async getTablesByArea(id) {
    return (await api.get(`/table/getTablesByArea/${id}`)).data;
  }
  async updateTableStatus(id, data){
    console.log(id)
    console.log(data)
    (await api.patch(`/table/updateTableStatus/${id}`, data))
  }
}
export default new TableService();
