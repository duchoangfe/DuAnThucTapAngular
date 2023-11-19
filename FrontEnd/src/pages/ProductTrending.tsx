import { Empty, Rate } from "antd";
import { useEffect, useState } from "react";
import "../App.css";
import { useGetProductsQuery } from "../redux/api/productApi";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { IProduct } from "../interfaces/products";
import LottieLoading from "../effect/LottieLoading";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { convertSlug } from "../utils/convertSlug";
import { addItemsCart } from "../redux/slices/orderSlice";

const ProductTrending = () => {
  const { _filterValue, _filterField } = useAppSelector(
    (state) => state.Pagination
  );
  const [products, setProducts] = useState<IProduct[]>([]);
  const dispatch = useAppDispatch();
  const {
    data: listProducts,
    isLoading,
    error,
  }: any = useGetProductsQuery({
    _filterField,
    _filterValue,
    _limit: 6,
  });
  useEffect(() => {
    const products = listProducts?.products?.map((item: IProduct[]) => item);
    setProducts(products);
  }, [listProducts]);

  if (error) {
    return <Empty />;
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LottieLoading />
      </div>
    );
  }
  // console.log("product hot trend: ", products);
  return (
    <div className="">
      <h2 className="font-bold font-poppins md:text-xl md:my-6">Sách Đã Mua</h2>
      <div className="grid md:grid-cols-3 gap-3 grid-cols-2">
        {/* item product */}
        {products?.map((items: IProduct, i) => (
          <motion.div
            className="flex md:grid grid-cols-2 gap-x-3 p-2 hover:shadow-md items-center border bg-white"
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: i * 0.3 }}
            key={items._id}
          >
            <Link
              to={`books/${convertSlug(items.name)}-${items._id}.html/detail`}
              className="md:w-auto w-2/5"
            >
              <div className="">
                <img
                  src={items?.images[0].response.uploadedFiles[0].url}
                  alt=""
                  className=""
                />
              </div>
            </Link>
            <div className="flex flex-col gap-y-3">
              <label
                htmlFor=""
                className="line-clamp-1 font-inclusiveSans text-xs md:text-base"
              >
                {items.name}
              </label>
              <div className="md:space-x-3 flex gap-x-2">
                <span className="font-poppins text-xs md:text-base">
                  {items.price / 1000 + ".000"} đ
                </span>
                <span className="line-through text-gray-400 text-xs md:text-base">
                  1.000 đ
                </span>
              </div>
              <Rate allowHalf defaultValue={items.rate} className="text-xs" />
              <div className="">
                <button
                  onClick={() =>
                    dispatch(addItemsCart([{ ...items, quantity: 1 }]))
                  }
                  className="shadow-md rounded-sm md:text-base text-xs p-1 hover:bg-custom-main hover:text-white"
                >
                  <a href={"/order"}>Mua Ngay</a>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductTrending;
