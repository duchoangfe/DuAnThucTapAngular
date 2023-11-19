import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderItems: [],
    shippingAddress: {},//Địa chỉ giao hàng
    paymentMethod: "",//Phương thức thanh toán
    deliveryMethod: "",//Phương giao hàng
    itemsPrice: 0,
    shippingPrice: 0,//Phí giao hàng
    totalPrice: 0,//Tổng chi phí
    user: "",
    isPaid: false,//Đã thanh toán hay chưa
    paidAt: "",//Thanh toán lúc nào
    isDelivered: false,//Đã giao hàng hay chưa
    deliveredAt: "",//Giao hàng lúc nào
  },
  reducers: {
    addItemsCart: (state, action) => {
      state.orderItems = action.payload;
    },
  },
});
export const { addItemsCart } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
