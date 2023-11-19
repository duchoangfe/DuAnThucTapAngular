import { Breadcrumb } from "antd";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const BreadcrumbClient = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  // console.log('pathnames: ',pathnames)
  const breadcrumbItems = [
    {
      title: (
        <>
          <Link to="/">
            <HomeOutlined />
            <span>Trang Chủ</span>
          </Link>
        </>
      ),
    },
  ];
  if (pathnames) {
    breadcrumbItems.push({
      title: (
        <>
          <Link to={`/${pathnames[0]}`}>
            <span>{pathnames[0]}</span>
          </Link>
        </>
      ),
    });
  }
  return (
    <div className="md:max-w-6xl mx-auto p-2 mt-[96px]">
      <Breadcrumb separator={<RightOutlined />}>
        {breadcrumbItems.map((item, index) => (
          <Breadcrumb.Item key={index}>{item.title}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbClient;
