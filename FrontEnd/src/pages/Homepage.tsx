import { Button, Rate } from "antd";
import Slider from "react-slick";
import Products from "./Products";
import ProductTrending from "./ProductTrending";

import "../App.css";
import { useGetProductsQuery } from "../redux/api/productApi";
import { IProduct } from "../interfaces/products";
import { Link } from "react-router-dom";
import LottieLoading from "../effect/LottieLoading";
import { convertSlug } from "../utils/convertSlug";
const Homepage = () => {
  const { data, isLoading }: any = useGetProductsQuery({
    _order: "desc",
    _limit: 5,
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LottieLoading />
      </div>
    );
  }
  const setting = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <div className="bg-gray-100 ">
      <div className="p-2 md:max-w-6xl md:mx-auto md:space-y-12 ">
        <h2 className="font-bold font-poppins text-xl my-6 md:text-2xl">
          Các Loại Sách Mới
        </h2>

        <Slider {...setting}>
          {data?.products?.map((product: IProduct) => (
            <div className="mb-12" key={product._id}>
              <div className="md:border md:rounded-md md:shadow-md bg-white p-2 border">
                <div className="md:grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Link
                    to={`books/${convertSlug(product.name)}-${
                      product._id
                    }.html/detail`}
                    className="hover:no-underline"
                  >
                    <div className="flex justify-center md:justify-start">
                      <img
                        src={product?.images[0].response.uploadedFiles[0].url}
                        alt={product.name}
                        className="md:w-full md:h-auto md:max-h-80 object-cover"
                      />
                    </div>
                  </Link>

                  <div className="flex flex-col justify-center">
                    <span className="line-clamp-1 text-lg sm:text-sm md:text-xl">
                      {product.name}
                    </span>
                    <span className="line-clamp-1 text-lg sm:text-xs md:text-xl">
                      {product.description}
                    </span>

                    <span className="text-gray-400 sm:text-xs sm:line-clamp-1">
                      {product.author}
                    </span>

                    <div className="hidden md:flex flex-col space-y-2">
                      <span className="">
                        <Rate
                          allowHalf
                          value={product.rate}
                          className="md:text-sm"
                        />
                      </span>

                      <Link
                        to={`books/${convertSlug(product.name)}-${
                          product._id
                        }.html/detail`}
                      >
                        <Button>Xem chi tiết</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <Products />
        <ProductTrending />
      </div>
    </div>
  );
};

export default Homepage;
