import {
  Button,
  Form,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
  notification,
} from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { Link, useNavigate } from "react-router-dom";
import { useCreateShoppingMutation } from "../redux/api/shoppingApi";
import { afterAddItemCart } from "../redux/slices/cartSlice";
import { LoadingOutlined } from "@ant-design/icons";

const OrderPage = () => {
  const { orderItems }: any = useAppSelector((state) => state.Order);
  const { user }: any = useAppSelector((state) => state.Authentication);
  const [value, setValue] = useState("");
  const [addOrder, { isLoading }] = useCreateShoppingMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const productOrder = orderItems.map(
    ({ _id, name, images, price, quantity }: any) => {
      return {
        _id,
        name,
        images,
        price,
        quantity,
      };
    }
  );
  // console.log("order item: ", productOrder);

  const onChange = (e: RadioChangeEvent) => {
    // console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const totalPriceItem = orderItems.reduce(
    (accumulator: any, currentValue: any) => {
      return accumulator + currentValue.price * currentValue.quantity;
    },
    0
  );
  const onFinishOrder = (value: any) => {
    addOrder({ value, productOrder, user: user?._id, shippingPrice: 15000 })
      .unwrap()
      .then(() => {
        notification.success({
          message: "Đặt hàng thành công",
        });
        dispatch(afterAddItemCart([]));
        navigate("/my-order");
      });
    // console.log("values: ", value);
  };
  // console.log("total price: ", totalPrice);
  return (
    <div className="max-w-6xl mx-auto">
      <Form layout="vertical" onFinish={onFinishOrder}>
        {/* sản phẩm */}
        <Form.Item className="bg-white rounded-md shadow-sm p-2">
          <div className="md:grid md:grid-cols-2 md:gap-x-8">
            <div className="">
              <h3 className="ml-3 mt-3 text-xl font-poppins">Đơn Hàng</h3>
              {orderItems.map((item: any) => (
                <div
                  className="flex space-x-6 items-center my-3"
                  key={item._id}
                >
                  <div className="">
                    <img
                      src={item.images[0].response.uploadedFiles[0].url}
                      alt="img sp"
                      className="w-24"
                    />
                  </div>
                  <div className="">
                    <span>{item?.name}</span>
                    <div className="flex justify-between gap-x-3">
                      <span>SL: x{item?.quantity}</span>
                      <span>
                        {(item?.price * item?.quantity) / 1000 + ".000"} đ
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="">
              {/* phương thức giao hàng */}
              <Form.Item
                label="Phương thức giao hàng"
                name="deliveryMethod"
                rules={[
                  {
                    message: "Vui lòng chọn phương thức giao hàng",
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Vui lòng chọn phương thức giao hàng"
                  options={[
                    {
                      key: 1,
                      label: "Giao hàng nhanh",
                      value: "Giao hàng nhanh",
                    },
                    {
                      key: 2,
                      label: "Giao tiết kiệm",
                      value: "Giao tiết kiệm",
                    },
                  ]}
                />
              </Form.Item>
              {/* hình thức thanh toán */}
              <Form.Item
                label="Phương thức thanh toán"
                name="paymentMethod"
                rules={[
                  {
                    message: "Vui lòng chọn phương thức thanh toán",
                    required: true,
                  },
                ]}
              >
                <Radio.Group onChange={onChange} value={value}>
                  <Space direction="vertical">
                    <Radio value={"tiền mặt"}>
                      Thanh toán tiền mặt khi nhận hàng
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <div className="md:flex justify-between space-y-6 md:space-y-0">
                  {user ? (
                    <div className="">
                      <div className="flex justify-between">
                        <span>Giao tới</span>
                        <Link to={"/update-user"}>Thay đổi</Link>
                      </div>
                      <div className="flex flex-col gap-y-1 text-gray-500">
                        <span>{user?.address}</span>
                        <span>+84 {user?.phone}</span>
                        <span>{user?.name}</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-red-500">Vui lòng đăng nhập</span>
                  )}
                  <div className="space-y-1">
                    <div className="flex flex-col gap-y-1">
                      <span>Tạm tính: {totalPriceItem / 1000 + ".000"} đ</span>
                      <span>Phí vận chuyển: 15.000 đ</span>
                    </div>
                    <div className="flex flex-col gap-y-3">
                      <span>
                        Tổng tiền: {(totalPriceItem + 15000) / 1000 + ".000"} đ
                      </span>
                      <div className="">
                        <Button danger disabled={!user} htmlType="submit">
                          {isLoading ? <LoadingOutlined /> : "Đặt Hàng"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form.Item>
            </div>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderPage;
