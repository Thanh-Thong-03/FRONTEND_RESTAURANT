import axios from "axios";

const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const api = axios.create({
  baseURL: "http://localhost:8000/",
  ...commonConfig,
});

// Thêm interceptor để gửi mã JWT trong tiêu đề "Authorization"
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Thêm interceptor cho mỗi phản hồi từ máy chủ
// api.interceptors.response.use(
//   (response) => {
//     // Xử lý phản hồi thành công (status code 2xx)
//     return response;
//   },
//   (error) => {
//     // Xử lý phản hồi lỗi (status code không phải 2xx)
//     if (error.response) {
//       // Phản hồi từ máy chủ có status code không phải 2xx
//       console.error(
//         "Lỗi từ máy chủ:",
//         error.response.status,
//         error.response.data
//       );
//     } else if (error.request) {
//       // Không nhận được phản hồi từ máy chủ
//       console.error("Không nhận được phản hồi từ máy chủ:", error.request);
//     } else {
//       // Xảy ra lỗi khi thiết lập yêu cầu
//       console.error("Lỗi khi thiết lập yêu cầu:", error.message);
//     }
//     // Trả về một Promise bị từ chối với lỗi
//     return Promise.reject(error);
//   }
// );

export default api;
