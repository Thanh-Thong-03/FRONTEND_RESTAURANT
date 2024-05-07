<template>
  <div>
    <div>
      <h4 class="page-title">Chọn món</h4>
      <h5 style="font-weight: bold">
        Bàn: {{ table_name }} - Khu Vực: {{ area_name }}
      </h5>
    </div>
    <div class="cats">
      <button
        v-for="category in categories"
        :key="category.cat_id"
        @click="getDishByCat(category.cat_id)"
        class="btn-cat"
      >
        {{ category.cat_name }}
      </button>
    </div>
    <div class="container">
      <!-- <q-form @submit="createItem">

      <q-field label="Số lượng">
        <q-input v-model="Item.quantity" type="number"/>
      </q-field>

      <q-field label="Note">
        <q-input v-model="Item.note"/>
      </q-field>

      <q-btn type="submit" label="Submit" color="primary" />
    </q-form> -->

      <div class="left">
        <button
          v-for="dish in dishes"
          :key="dish.dish_id"
          @click="addDish(dish)"
        >
          <div>
            <img :src="dish.dish_img" />
            <div class="dish-info">Món ăn: {{ dish.dish_name }}</div>
            <div class="dish-info">Giá: {{ dish.dish_price }}</div>
            <div class="dish-info">Danh mục: {{ dish.cat.cat_name }}</div>
          </div>
        </button>
      </div>

      <div class="container-right">
        <div class="right" v-show="showOrder">
          <h5>Đơn hàng của bạn</h5>
          <table class="order-list">
            <thead>
              <tr>
                <th>Tên Món Ăn</th>
                <th>Giá Tiền</th>
                <th>SL</th>
                <th>Thành Tiền</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(orderItem, index) in orderItems"
                :key="index"
                class="order-item-detail"
              >
                <td>{{ orderItem.name }}</td>
                <td>{{ orderItem.price }}</td>
                <td>{{ orderItem.quantity }}</td>
                <td>{{ orderItem.quantity * orderItem.price }}</td>
                <td>
                  <q-icon
                    class="order-item-detail"
                    name="delete"
                    size="24px"
                    color="negative"
                    @click="removeItem(orderItem.name)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <p class="dish-name">Tổng tiền: {{ totalAmount }}</p>
          <q-btn @click="createOrder" label="Đặt Hàng" class="complete-btn" />

          <!-- <div
          v-for="(orderItem, index) in orderItems"
          :key="index"
          class="order-item"
        >
          <div class="order-item-detail">
            Tên sản phẩm: {{ orderItem.name }}
          </div>
          <div class="order-item-detail">
            Số lượng: {{ orderItem.quantity }}
          </div>
          <div class="order-item-detail">Loại: {{ orderItem.cat }}</div>
          <div class="order-item-detail">Giá: {{ orderItem.price }}</div>
          <div class="order-item-detail">
            Thành tiền: {{ orderItem.quantity * orderItem.price }}
          </div>
          <q-icon
            class="order-item-detail"
            name="delete"
            size="24px"
            color="negative"
            @click="removeItem(orderItem.name)"
          />
        </div> -->

          <!-- Hiển thị tổng tiền của đơn hàng -->
          <!-- <div class="total-order">
          <div class="order-item-detail total">
            Tổng tiền: {{ totalAmount }}
          </div>
        </div>

        <q-btn @click="createOrder" color="primary">Đặt hàng</q-btn> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import dishService from "../services/dish.service";
import catService from "../services/cat.service";
import orderService from "../services/order.service";
import tableService from "../services/table.service";
import billService from "../services/bill.service";

export default {
  setup() {
    const dishes = ref([]);
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const { table_id, table_name, area_name, bill_id } = route.query; // const Item = reactive({
    const totalAmount = ref("");
    const orderItems = ref([]);
    const showOrder = ref(false);
    const categories = ref([]);

    onBeforeMount(async () => {
      try {
        categories.value = await catService.getAll();
        console.log(categories.value);
        dishes.value = await dishService.getAllDish();
        console.log(dishes.value);
      } catch (error) {
        console.log(error);
      }
    });

    const getDishByCat = async (catId) => {
      const dishByCat = await dishService.getDishByCat(catId);
      dishes.value = dishByCat
      console.log(dishes.value);
    };

    // nameDish.value = dishes.dish_name;

    // const createItem = () => {
    //     const quantity = Item.quantity;
    //     const note = Item.note;
    //     console.log(quantity, note);
    // };

    const items = ref([]);

    const addDish = (dish) => {
      const existingIndex = orderItems.value.findIndex(
        (item) => item.dish_id === dish.dish_id
      );
      if (existingIndex !== -1) {
        orderItems.value[existingIndex].quantity += 1;
        items.value[existingIndex].quantity += 1;
        totalAmount.value = orderItems.value.reduce((total, orderItem) => {
          return total + orderItem.quantity * orderItem.price;
        }, 0);
      } else {
        orderItems.value.push({
          dish_id: dish.dish_id,
          name: dish.dish_name,
          price: dish.dish_price,
          quantity: 1,
          cat: dish.cat.cat_name,
        });
        items.value.push({
          dish_id: dish.dish_id,
          quantity: 1,
        });
        totalAmount.value = orderItems.value.reduce((total, orderItem) => {
          return total + orderItem.quantity * orderItem.price;
        }, 0);
        console.log(orderItems.value);
        showOrder.value = true;
      }
    };

    const removeItem = (index) => {
      orderItems.value.splice(index, 1);
      items.value.splice(index, 1);
      totalAmount.value = orderItems.value.reduce((total, orderItem) => {
        return total + orderItem.quantity * orderItem.price;
      }, 0);
    };

    const createOrder = async () => {
      try {
        const order = await orderService.create({
          bill_id: bill_id,
          items: items.value,
        });
        console.log("Order:", order);
        console.log("Items: ", items.value);
        tableService.updateTableStatus(table_id, {
          table_status: "Đang Phục Vụ",
        });
        billService.update(bill_id, { bill_price: totalAmount.value });
        toast.success("Thêm đơn hàng thành công");
        router.push("/");
      } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
        toast.error("Đã xảy ra lỗi khi tạo đơn hàng");
      }
    };

    const searchDish = async () => {
      dishes.value = await dishService.getbyname(nameDish.value);
      console.log(dishes.value);
    };

    return {
      dishes,
      table_id,
      table_name,
      area_name,
      totalAmount,
      //   Item,
      getDishByCat,
      addDish,
      items,
      categories,
      orderItems,
      removeItem,
      createOrder,
      //   createItem,
      searchDish,
      showOrder,
    };
  },
};
</script>

<style scoped>
button {
  margin: 10px;
  padding: 10px;
}

.dish-info {
  text-align: left;
}

.container {
  display: flex; /* Hiển thị các phần tử theo chiều ngang */
  border-top: 6px solid #D1E8E2;
}

.left {
  display: flex; /* Hiển thị các thẻ q-card theo chiều ngang */
  flex-wrap: wrap; /* Cho phép các thẻ q-card wrap (xuống dòng) khi không đủ không gian */
  /* width: 65%; */
  flex: 1;
  background: #d8d6d6;
  /* justify-content: space-between; */
  border-right: 6px solid #D1E8E2;
}

.cats {
  display: flex;
  background: #d8d6d6;
}

.btn-cat {
  padding: 10px;
  background: #0515f8;
  border-radius: 4px;
  margin: 15px 15px 15px 8px;
}

.container-right {
  background: #d8d6d6;
}

.right {
  width: 370px; /* Chiều rộng cố định cho phần tử .right */
  border: 1px solid #252424;
  border-radius: 4px;
  padding: 20px;
  margin: 11px;
  background: #f3d4b7;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.page-title {
  /* text-align: center; */
  background: #06f1f1;
  padding: 15px;
  border: 1px solid #252424;
  /* border-radius: 3px; */
  margin: 0px 0px 15px 0px;
}

h5 {
  /* color: white; */
  /* background: #0237e6; */
  padding: 10px 0px;
  /* border-bottom: 1px solid #252424; */
  /* border-radius: 3px; */
  margin: 0px;
}

.order-item-detail {
  /* display: flex; */
  /* justify-content: space-between; */
  align-items: center;
  margin-bottom: 5px;
  /* width: 100%; */
}

.dish-name {
  font-weight: bold;
  text-align: right;
  margin: 15px 3px;
  /* margin: auto; */
}

th {
  text-align: center;
  font-weight: bold;
}

td {
  text-align: center;
}

.order-list {
  list-style: none;
  padding: 0px;
  width: 100%;
}

img {
  width: 140px;
  height: 120px;
}

.complete-btn {
  border: 1px solid #252424;
  border-radius: 5px;
  margin: 5px auto;
  width: 100%;
}

.complete-btn:hover {
  background: #f0c297;
}
</style>