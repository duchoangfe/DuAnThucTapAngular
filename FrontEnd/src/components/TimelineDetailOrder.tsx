import { Timeline } from "antd";
import { useGetByIdShoppingQuery } from "../redux/api/shoppingApi";
import LottieLoading from "../effect/LottieLoading";
interface Item {
  children: string;
  color: string;
}
const TimelineDetailOrder = ({ id }:any) => {
  const { data,isLoading } = useGetByIdShoppingQuery(id);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LottieLoading />
      </div>
    );
  }
  // console.log(data)
  const items: Item[] = [];
  switch (true) {
    case !data?.notProcessed:
      items.push({
        children: "Đặt hàng thành công, vui lòng đợi xác nhận!",
        color: 'green'
      });
      break;
    case data?.isProcessing:
      items.push({
        children: "Đơn hàng đang được xử lý, sẽ được giao cho đơn vị vận chuyển sớm nhất!",
        color: 'green'
      });
      break;
    case data?.isDelivering:
      items.push({
        children: "Đơn hàng đang trong quá trình vận chuyển, sẽ giao đến bạn sớm nhất!",
        color: 'green'
      });
      break;
    case data?.isDelivered:
      items.push({
        children: "Đơn hàng đã được giao thành công, Đánh giá 5 sao cho tao!",
        color: 'green'
      });
      break;

    default:
      break;
  }
  return (
    <div>
      <Timeline items={items} />
    </div>
  );
};

export default TimelineDetailOrder;
