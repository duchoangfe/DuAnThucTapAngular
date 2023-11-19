import { Breadcrumb } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const BreadcrumbAdmin = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const breadcrumbItems:any[] = [
    
  ];
  pathnames.forEach((pathname, index) => {
    const url = `/${pathnames.slice(0, index + 1).join("/")}`;
    breadcrumbItems.push({
      title: (
        <Link to={url}>
          <span>{pathname}</span>
        </Link>
      ),
    });
  });
  return (
    <div className="p-2">
      <Breadcrumb separator={<RightOutlined />}>
        {breadcrumbItems.map((item, index) => (
          <Breadcrumb.Item key={index}>{item.title}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbAdmin;
