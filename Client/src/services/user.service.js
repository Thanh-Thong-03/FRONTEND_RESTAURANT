import api from './api.service'

class userService {
    async login(user){
        return (await api.post('user/login', user)).data
    }
    async getStaffById(id) {
        return (await api.get(`/user/${id}`)).data;
    }
    async update(id, data) {
        return (await api.put(`/user/${id}`, data)).data;
    }
    async editImg(id, data) {
        return await api.put(`/user/${id}/editImg`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        }).data;
    }
}

export default new userService;