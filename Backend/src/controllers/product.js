import Product from "../models/product.js";
import Category from "../models/category.js";
import { productSchema } from "../schemas/product.js";

export const getAll = async (req, res) => {
  //Lấy giá trị mặc định trên thanh url
  const {
    _page = 1,
    _limit = 12,
    _sort = "createdAt",
    _order = "asc",
    _expand,
    _filterField,
    _filterValue,
    _search,
    _category,
  } = req.query;

  //Truy vấn sản phẩm
  const options = {
    page: _page,
    limit: _limit,
    sort: { [_sort]: _order == "desc" ? -1 : 1 },
  };
  //Hiển thị sản phảm theo danh mục
  const populateOptions = _expand
    ? [{ path: "categoryId", select: "name" }]
    : [];
  try {
    const newQuery = {};
    //tìm kiếm theo danh mục
    if (_category) {
      newQuery.categoryId = _category;
    }
    //tìm kiếm theo tên
    if (_search) {
      newQuery.name = { $regex: _search, $options: "i" };
      console.log("search name: ", newQuery.name);
    }
    // Thêm điều kiện filter dựa trên _filterField và _filterValue (nếu có)
    if (_filterField && _filterValue) {
      const operatorMap = {
        gte: "$gte",
        gt: "$gt",
        lt: "$lt",
        lte: "$lte",
      };

      const [field, operator] = _filterField.split("_");
      if (operatorMap[operator]) {
        newQuery[field] = { [operatorMap[operator]]: parseFloat(_filterValue) };
      } else {
        newQuery[_filterField] = _filterValue;
      }
    }
    //Lấy tất cả sản phẩm không theo danh mục nào thành công thì lưu vào result
    const result = await Product.paginate(newQuery, {
      ...options,
      populate: populateOptions,
    });
    // console.log("result: ", result);
    // //Không có sản phẩm nào thì trả về lỗi
    if (result.docs.length === 0) throw new Error("Không tìm thấy sản phẩm!");

    const response = {
      products: result.docs,
      pagination: {
        currentPage: result.page,
        totalPages: result.totalPages,
        totalItems: result.totalDocs,
      },
    };
    // console.log("respones: ", response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export const get = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "categoryId",
      "-__v"
    );
    const idProductSilimar = product.categoryId.products;
    const products = await Product.find({
      _id: { $in: idProductSilimar },
    });
    if (!product) throw new Error("Product not found");
    return res.status(200).json({
      message: "Get the product successfully",
      data: product,
      listProductSimilar: products,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export const create = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((message) => ({ message }));
      return res.status(400).json({ errors });
    }
    //Thêm sản phẩm vào database
    const product = await Product.create(req.body);
    //Tìm categoryId trước khi thêm không có thì thông báo có thì cho đi tiếp
    const CategoryId = await Category.findById(product.categoryId);
    if (!CategoryId) {
      return res.status(404).json({
        message: "CategoryId not found",
      });
    }
    // console.log(CategoryId);
    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: {
        products: product._id,
      },
    });

    return res.status(200).json({
      message: "Create the product successfully",
      product,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Create failed product", error: error.message });
  }
};
export const update = async (req, res) => {
  try {
    //Tìm id product từ request
    const productId = req.params.id;

    //Cập nhật product theo id tìm được
    const updateProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    // console.log('updateProduct: ',updateProduct);
    if (!updateProduct) {
      return res.status(400).json({
        message: "Cập nhật sản phẩm thất bại",
      });
    }
    //Tìm categoryId sau khi cập nhật product
    const oldCategoryId = updateProduct.categoryId;
    //Cập nhật categoryId được tìm từ product sau khi cập nhật và loại bỏ categoryId cũ
    await Category.findByIdAndUpdate(oldCategoryId, {
      $pull: { products: productId },
    });
    //Tìm categoryId sau khi gửi lên request
    const newCategoryId = req.body.categoryId;
    //Cập nhật lại trường products trong bảng Category
    if (newCategoryId) {
      await Category.findByIdAndUpdate(newCategoryId, {
        $addToSet: { products: productId },
      });
    }
    return res.status(200).json({
      message: "Update the product successfully",
      updateProduct,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Update failed product", error: error.message });
  }
};
export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOneAndDelete(id);
    //Xóa productId trong trường products ở clection Category
    await Category.findByIdAndUpdate(product.categoryId, {
      $pull: { products: product.id },
    });
    if (!product) {
      return res.status(200).json({
        message: "Product not found",
      });
    }
    return res.status(200).json({
      message: "Delete product successfully",
      data: product,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Delete failed product", error: error.message });
  }
};
// export const getSilimar = async(req,res)=>{
//   try {

//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// }
