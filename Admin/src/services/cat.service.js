import api from "./api.service";

class CatService {
  async getAll() {
    return (await api.get("/cat")).data;
  }
  async create(data) {
    return (await api.post("/cat", data)).data;;
  }
//   async getDishById(id) {
//     return (await api.get(`/dish/${id}`)).data;
//   }
//   async getbyname(ten) {
//     return (await api.get("/dish/byName", { params: { ten } })).data;
//   }
//   async update(id, data) {
//     return await api.put(`/dish/${id}`, data).data;
//   }
//   async editImg(id, formdata) {
//     return (await api.put(`/dish/${id}/updateImg`, formdata, {
//       headers: { "Content-Type": "multipart/form-data" },
//     })).data
//   }
//   async delete(id) {
//     return (await api.delete(`/dish/${id}`)).data;
//   }
}
export default new CatService();
