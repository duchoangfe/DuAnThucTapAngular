import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, Button, theme, Space, Badge, Avatar, Image } from "antd";
import { AiFillDashboard } from "@react-icons/all-files/ai/AiFillDashboard";
import { BiUser } from "@react-icons/all-files/bi/BiUser";
import { AiOutlineInbox } from "@react-icons/all-files/ai/AiOutlineInbox";
import { FcAddressBook } from "@react-icons/all-files/fc/FcAddressBook";
import { FaProductHunt } from "@react-icons/all-files/fa/FaProductHunt";

import {
  BellOutlined,
  LogoutOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PictureOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { logout } from "../redux/slices/authSlice";
import BreadcrumbAdmin from "../components/BreadcrumbAdmin";
import Search, { SearchProps } from "antd/es/input/Search";
// import '../App.css'
const LayoutAdmin = () => {
  const { Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const { useToken } = theme;
  const { token } = useToken();
  const { bgColormain }: any = token;
  const dispatch = useAppDispatch();
  const { user }: any = useAppSelector((state) => state.Authentication);
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible theme="light" collapsed={collapsed}>
        <div className="py-5 text-2xl flex items-center justify-center">
          <Image
            width={80}
            src="https://cdn.tgdd.vn/2020/03/GameApp/tiki-200x200.jpg"
            alt="logo"
          />
        </div>
        <Menu
          style={{}}
          mode="inline"
          items={[
            {
              key: "1",
              icon: <AiFillDashboard />,
              label: <Link to={"dashboard"}>Dashboard</Link>,
            },
            {
              key: "2",
              icon: <FaProductHunt />,
              label: <Link to={"products"}>Product</Link>,
            },
            {
              key: "3",
              icon: <AiOutlineInbox />,
              label: <Link to={"categories"}>Categories</Link>,
            },
            {
              key: "4",
              icon: <ShoppingOutlined />,
              label: <Link to={"order"}>Order</Link>,
            },
            {
              key: "5",
              icon: <BiUser />,
              label: <Link to={"profile"}>User</Link>,
            },

            {
              key: "6",
              label: (
                <Button
                  icon={<LogoutOutlined />}
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </Button>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
        >
          <div className="">
            <Button
              type="text"
              icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
          <div className=""></div>
          <div className="flex gap-x-6 items-center">
            <Space>
              <Avatar size="small" icon={<UserOutlined />} />
              <span className="text-black">{user ? user.name : "HO TEN"}</span>
            </Space>
          </div>
        </header>
        <BreadcrumbAdmin />
        <Content
          style={{
            padding: 10,
            height: "100%",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
