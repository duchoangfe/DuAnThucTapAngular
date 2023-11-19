import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart, Pie,Cell
} from "recharts";
import { useGetProductsQuery } from "../../redux/api/productApi";
import { useGetAllFeedbackQuery } from "../../redux/api/feedbackApi";

const Dashboard = () => {
  const { data }:any = useGetProductsQuery({
    _page: 1,
    _limit: 12,
  });
  const {data:feedbacks}:any = useGetAllFeedbackQuery()
  console.log(feedbacks);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }:any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="flex items-center">
      <div className="">
        <BarChart
          width={500}
          height={300}
          data={data?.products}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="price" stackId="a" fill="#8884d8" />
          <Bar dataKey="rate" stackId="a" fill="#82ca9d" />
          <Bar dataKey="quantityStock" fill="#ffc658" />
        </BarChart>
      </div>
      <div className="">
      <PieChart width={400} height={300}>
          <Pie
            data={feedbacks?.feedbacks}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="rating"
          >
            {feedbacks?.feedbacks?.map(( index:any) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
};

export default Dashboard;
