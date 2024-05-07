import api from "./api.service";

class AreaService {
  async getAll() {
    return (await api.get("/area")).data;
  }
  async getDishById(id) {
    return (await api.get(`/area/${id}`)).data;
  }
  async getbyname(ten) {
    return (await api.get("/area/byName", { params: { ten } })).data;
  }
}
export default new AreaService();
