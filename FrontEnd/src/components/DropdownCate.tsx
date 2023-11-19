import { Dropdown, MenuProps, Space } from "antd";
import { useGetCategoriesQuery } from "../redux/api/categoriesApi";
import { useAppDispatch } from "../app/hook";
import { setCategories } from "../redux/slices/paginationSlice";

const DropdownCate = () => {
  const { data }: any = useGetCategoriesQuery();
  const dispatch = useAppDispatch();
  // console.log("categories: ", data);

  const items: MenuProps["items"] = data?.result.map((item: any) => {
    return {
      key: item._id,
      label: (
        <Space onClick={() => dispatch(setCategories(item._id))}>
          {item.name}
        </Space>
      ),
    };
  });
  return (
    <div className="flex gap-8">
      <a href="/">Trang Chủ</a>
      <Dropdown
        menu={{ items }}
        placement="bottom"
        arrow={{ pointAtCenter: true }}
      >
        <button className="hover:text-custom-main duration-500 transition-colors">
          Danh Mục
        </button>
      </Dropdown>
    </div>
  );
};

export default DropdownCate;
