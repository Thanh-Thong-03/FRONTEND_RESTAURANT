import api from "./api.service";

class CatService {
  async getAll() {
    return (await api.get("/cat")).data;
    
  }
}
export default new CatService();
