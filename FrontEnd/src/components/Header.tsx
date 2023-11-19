import {
  HeartOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  QqOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Button, Drawer, Dropdown, MenuProps, Modal, Image } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import CartShop from "./CartShop";
import { useAppDispatch, useAppSelector } from "../app/hook";
import SearchComponent from "./SearchComponent";
import DropdownCate from "./DropdownCate";
import NavbarMenu from "./NavbarMenu";
import { logout } from "../redux/slices/authSlice";
import { motion } from "framer-motion";
import { setIsOpenToggleDrawer } from "../redux/slices/toggleDrawerSlice";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fixNavba, setFixNavba] = useState(false);
  const { items: itemsCart } = useAppSelector((state) => state.Cart);
  const { user }: any = useAppSelector((state) => state.Authentication);
  const { open: openToggle } = useAppSelector((state) => state.ToggleDrawer);
  const dispatch = useAppDispatch();
  // console.log("openToggle: ", openToggle);

  const setFixedNavba = () => {
    if (window.scrollY >= 38) {
      setFixNavba(true);
    } else {
      setFixNavba(false);
    }
  };
  window.addEventListener("scroll", setFixedNavba);

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: user ? (
        <Link to={`/update-user`}>
          <Button icon={<QqOutlined />} type="text">
            Tài Khoản
          </Button>
        </Link>
      ) : (
        <Link to={"/account"}>
          <Button type="text" icon={<UserOutlined />}>
            Tài Khoản
          </Button>
        </Link>
      ),
    },
    {
      key: 2,
      label: (
        <Link to={"my-order"}>
          <Button type="text" icon={<HeartOutlined />}>
            Đơn Mua Hàng
          </Button>
        </Link>
      ),
    },
  ];

  if (user) {
    items.push({
      key: items.length + 1,
      label: (
        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={() => dispatch(logout())}
        >
          Đăng Xuất
        </Button>
      ),
    });
  }
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showDrawer = () => {
    dispatch(setIsOpenToggleDrawer(true));
  };

  const onClose = () => {
    dispatch(setIsOpenToggleDrawer(false));
  };
  return (
    <div
      className={
        "bg-blue-500 text-[white] fixed top-0 left-0 right-0 z-50 shadow-sm fixed top-0 left-0 right-0 z-50 shadow-sm"
      }
    >
      <div className="md:max-w-6xl mx-auto space-y-6 ">
        <div
          className={
            fixNavba
              ? "hidden"
              : "md:relative md:w-full transition-all duration-500"
          }
        ></div>
        <div className="flex justify-between items-center">
          <motion.div
            className={`font-dancingScript font-bold md:text-4xl FrontEnd duration-500 transition-colors ease-in-out ${
              !fixNavba ? "hidden" : "md:block hidden"
            }`}
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{
              opacity: fixNavba ? 1 : 0,
              x: fixNavba ? 0 : 20,
              y: fixNavba ? 0 : -20,
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Image
              width={80}
              src="https://cdn.tgdd.vn/2020/03/GameApp/tiki-200x200.jpg"
              alt="logo"
            />
          </motion.div>

          <div className="">
            {/* tính */}
            <div
              className={`hidden md:flex items-center space-x-6 font-poppins`}
            >
              <DropdownCate />
            </div>
            {/* không tính */}
            <div className="md:hidden">
              <Button
                icon={<MenuFoldOutlined />}
                type="text"
                onClick={showDrawer}
              />
              <Drawer
                placement="left"
                onClose={onClose}
                open={openToggle}
                width={240}
              >
                <NavbarMenu />
              </Drawer>
            </div>
          </div>

          <SearchComponent />

          <div className="">
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Button
                icon={<UserOutlined />}
                type="text"
                style={{ color: "white" }}
              >
                {user ? user?.name : ""}
              </Button>
            </Dropdown>
            <Badge count={itemsCart.length} size="small">
              <Button
                style={{ color: "white" }}
                icon={<ShoppingCartOutlined />}
                type="text"
                onClick={showModal}
              />
            </Badge>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        okType="default"
        onCancel={handleCancel}
        width={1000}
      >
        <CartShop />
      </Modal>
    </div>
  );
};

export default Header;
