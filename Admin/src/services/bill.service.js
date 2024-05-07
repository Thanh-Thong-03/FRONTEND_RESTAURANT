import api from "./api.service";

class BillService {
  async getAll() {
    return (await api.get("/bill")).data;
  }
  async getAllUnCompleted() {
    return (await api.get("/bill/getAllUnCompleted")).data;
  }
  async create(data) {
    console.log(data)
    return (await api.post("/bill", data)).data;
  }
  async update(id, data) {
    return (await api.patch(`/bill/${id}`, data)).data;
  }
  async getBillByTableId(id) {
    console.log(id)
    return (await api.get(`/bill/getBillByTableId/${id}`)).data;
  }
  async getAllBillsUnPaid() {
    return (await api.get("/bill/getAllBillsUnPaid")).data
  }  
  async getBillsPaid() {
    return (await api.get("/bill/getBillsPaid")).data
  } 
}
export default new BillService();
