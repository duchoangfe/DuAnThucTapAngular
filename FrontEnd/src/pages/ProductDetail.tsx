import { Badge, Button, Rate, Tag, message } from "antd";
import { useEffect, useState } from "react";
import { InboxOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../redux/api/productApi";
import SimilarProduct from "../components/SimilarProduct";
import { IProduct } from "../interfaces/products";
import { useAppDispatch, useAppSelector } from "../app/hook";
import LottieLoading from "../effect/LottieLoading";
import { addItemCart } from "../redux/slices/cartSlice";
import { addItemsCart } from "../redux/slices/orderSlice";
import FeedBackProducts from "../components/FeedBackProducts";
import { useGetUserQuery } from "../redux/api/auth";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const [count, setCount] = useState(1);
  const [currentImage, setCurrentImage] = useState<number | string>(0);
  const { slug } = useParams();
  const slugParams = slug?.split(".html") ?? [];
  const temp = slugParams[0]?.split("-") as string[];
  const id = temp[temp.length - 1];
  const dispatch = useAppDispatch();
  const { data: productDetail, isLoading }: any = useGetProductByIdQuery(id);
  const [userId, setUserId] = useState();
  const { user: userStorage }: any = useAppSelector(
    (state) => state.Authentication
  );
  const { data: user } = useGetUserQuery(userId);
  // console.log('user: ',user)
  // kiểm tra người dùng mua sản phẩm này chưa
  const idProductToOrder = user?.user?.products.flat();
  const checkProduct = idProductToOrder?.includes(id) as boolean;
  // console.log("checkProduct: ",checkProduct)
  useEffect(() => {
    (async () => {
      const idUser = userStorage?._id;
      setUserId(idUser);
    })();
  }, [userStorage]);

  const listSilimar = productDetail?.listProductSimilar?.filter(
    (item: IProduct) => {
      return item._id !== id;
    }
  );

  const ListImage = productDetail?.data?.images?.map((items: any) => {
    return items?.response?.uploadedFiles[0].url;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LottieLoading />
      </div>
    );
  }
  const gotoImage = (index: number | string) => {
    setCurrentImage(index);
  };
  const increase = () => {
    setCount(count + 1);
  };

  const decline = () => {
    let newCount = count - 1;
    if (newCount < 1) {
      newCount = 1;
    }
    setCount(newCount);
  };
  return (
    <div className="p-4 md:max-w-6xl md:mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-white p-8 rounded-md shadow-md">
        <div className="space-y-6">
          <div className="relative h-64 overflow-hidden rounded-md">
            <motion.div
              className="duration-500 ease-in-out w-full h-full bg-center bg-cover transform hover:scale-105"
              style={{ backgroundImage: `url(${ListImage[currentImage]})` }}
            ></motion.div>
          </div>
          <div className="flex gap-2">
            {ListImage?.map((image: any, index: any) => (
              <motion.button
                onClick={() => gotoImage(index)}
                key={index}
                className="w-12 h-12 overflow-hidden rounded-md focus:outline-none transform hover:scale-105"
              >
                <img
                  className="w-full h-full object-cover"
                  src={image}
                  alt=""
                />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="">
            <span className="text-sm text-gray-400">
              Tác giả: {productDetail?.data?.author}
            </span>
            <h1 className="text-2xl font-bold font-poppins line-clamp-2">
              {productDetail?.data?.name}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <span>
              <Rate
                allowHalf
                defaultValue={productDetail?.data?.rate}
                className="text-base"
              />
            </span>
            <span className="text-gray-400">
              {productDetail?.data?.sold}k lượt bán
            </span>
          </div>
          <div className="py-2 space-x-3">
            <span className="text-gray-400">Danh Mục:</span>
            <Tag color="red">{productDetail?.data?.categoryId?.name}</Tag>
          </div>
          <div className="mt-2">
            <span className="font-poppins text-lg">Mô tả sản phẩm:</span>
            <p className="text-gray-600 line-clamp-5">
              {productDetail?.data?.description}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <span className="font-poppins text-lg">Số lượng</span>
            <div className="flex items-center space-x-3">
              <Button icon={<PlusOutlined />} onClick={increase}></Button>
              <Badge count={count}>
                <InboxOutlined className="text-xl" />
              </Badge>
              <Button icon={<MinusOutlined />} onClick={decline}></Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xl font-poppins">Tạm tính</span>
            <span className="font-poppins text-red-500">
              {(productDetail?.data?.price * count) / 1000 + ".000"} đ
            </span>
          </div>
          <div className="font-poppins flex flex-col md:flex-row gap-3 items-center space-y-3">
            <Button
              onClick={() =>
                dispatch(
                  addItemsCart([{ ...productDetail?.data, quantity: count }])
                )
              }
              className="bg-red-500 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out"
            >
              <a href={"/order"}>MUA NGAY</a>
            </Button>
            <Button
              onClick={() => {
                dispatch(
                  addItemCart({ ...productDetail?.data, quantity: count })
                );
                message.success("Đã thêm vào giỏ hàng!");
              }}
              className="bg-blue-500 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out"
            >
              THÊM VÀO GIỎ HÀNG
            </Button>
          </div>
        </div>
      </div>
      <FeedBackProducts checkProduct={checkProduct} />
      <SimilarProduct listSilimar={listSilimar} />
    </div>
  );
};

export default ProductDetail;
