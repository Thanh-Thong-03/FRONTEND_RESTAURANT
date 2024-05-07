<template>
  <div>
    <div class="card-header bg-primary text-white">
      <h3 class="mb-0">Quản lý nhân viên</h3>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-sm-7 mb-3">
            <router-link to="/admin/staff/create">
              <button class="btn">Thêm nhân viên</button>
            </router-link>
          </div>
          <div class="col-sm-2 mb-3">
            <button class="btn" @click="searchStaff">Tìm kiếm</button>
          </div>
          <div class="a col-sm-2 mb-3">
            <input
              v-model="nameStaff"
              type="text"
              class="form-control"
              placeholder="Tìm kiếm..."
            />
          </div>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Tên</th>
              <th scope="col">Avatar</th>
              <th scope="col">Email</th>
              <th scope="col">Giới tính</th>
              <th scope="col">Ngày Sinh</th>
              <th scope="col">Chức vụ</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(staff, id) in staffs" :key="staff.user_id">
              <th scope="row">{{ id + 1 }}</th>
              <td>{{ staff.user_name }}</td>
              <td><img :src="staff.user_avatar" alt="Avatar" /></td>
              <td>{{ staff.user_email }}</td>
              <td>{{ staff.user_sex }}</td>
              <td>{{ staff.user_birthday }}</td>
              <td>{{ staff.role.role_name }}</td>
              <td>
                <router-link :to="`/admin/staff/update/${staff.user_id}`">
                  <button class="btn">Sửa</button>
                </router-link>
                <button
                  class="btn btn-delete"
                  @click="deleteStaff(staff.user_id)"
                >
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import staffService from "../services/staff.service";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const toast = useToast();
    const staffs = ref([]);
    const nameStaff = ref();

    onBeforeMount(async () => {
      try {
        staffs.value = await staffService.getAll();
        console.log(staffs.value);
      } catch (error) {
        console.log(error);
      }
    });

    const searchStaff = async () => {
      staffs.value = await staffService.getbyname(nameStaff.value);
      console.log(staffs.value);
    };

    const deleteStaff = async (id) => {
      const staffId = staffs.value.findIndex((staff) => staff.user_id === id);
        if (staffId !== -1) {
          await staffService.delete(id);
          staffs.value.splice(staffId, 1);
          toast.success("Xóa nhân viên thành công");
        } else {
          console.error("Sản phẩm với ID:{{id}} không tồn tại");
        }
    };

    return {
      staffs,
      nameStaff,
      deleteStaff,
      searchStaff,
    };
  },
};
</script>

<style scoped>
.a {
  padding: 0px !important ;
  margin: 0px !important ;
}

.card-header {
  padding: 20px;
  background: #2d99ae !important;
  margin-bottom: 15px;
}

.card-body {
  margin: 0px;
  background: #bcfefe;
}

th {
  text-align: center;
  background: #bcfefe;
  vertical-align: middle;
  display: table-cell;
}
td {
  text-align: center;
  background: #bcfefe;
  vertical-align: middle;
  display: table-cell;
}

.btn {
  background-color: #ffd342;
  color: black;
  margin-right: 10px;
}

.btn:hover {
  background-color: #ffc107;
}

.btn-delete {
  background-color: rgb(235, 50, 50) !important;
  color: black;
  margin-right: 10px;
}

.btn-delete:hover {
  background-color: red !important;
}

img {
  max-width: 80px;
  border: 1px solid black;
}
</style>