import cloudinary from "../config/cloudinary.js";
export const uploadImage = async (req, res) => {
  const files = req.files;
  // const producId = req.params.id;
  if (!Array.isArray(files))
    return res.status(400).json({ error: "Không có file nào được tải lên" });
  try {
    const uploadPromises = files.map((file) => {
      //Sử dụng cloudinary API để up ảnh lên
      return cloudinary.uploader.upload(file.path);
    });
    // //Chờ cho ảnh được up lên
    const results = await Promise.all(uploadPromises);
    // //Trả về mảng chứa các ảnh
    // console.log('uploadPromises: ',uploadPromises)
    const uploadedFiles = results.map((result) => ({
      publicId: result.public_id,
      url: result.secure_url,
    }));
    // if (!producId) {
    //   return res.status(400).json({ message: "Id sản phẩm không tồn tại" });
    // }
    // const product = await Products.findById(producId);
    // // console.log(product);
    // await Products.findByIdAndUpdate(producId, {
    //   $addToSet: {
    //     images: uploadedFiles,
    //   },
    // });
    // await Upload.create(uploadedFiles)
    return res
      .status(200)
      .json({ message: `Ảnh đã up lên thành công`, uploadedFiles });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
