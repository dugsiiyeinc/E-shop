import dayjs from "dayjs";
import { TrendingUp } from "lucide-react"
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import supabase from "../lib/supabase"
// import { ResponsiveContainer } from "recharts"


const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },

]



  
  

export default function StackedAreaChart() {

    const [data,setData]=useState([])

useEffect(()=>{
  getSells()
},[])

const getSells = async () => {
    try {
      const sixMonthsAgo = dayjs().subtract(6, "month").startOf("month").toISOString();
  
      const { data: orders } = await supabase
        .from("orders")
        .select("*")
        .gte("created_at", sixMonthsAgo)
        .eq("status", "done");
      
        // console.log(orders)
      const formatted = transformChartData(orders);
      setData(formatted);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };



  const transformChartData = (orders) => {
    const now = new Date();
    const months = [];
  
 
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = date.toLocaleString("default", { month: "long" });
      months.push(month);
    }
  
    const grouped = {};
  
  
    orders.forEach((order) => {
      const date = new Date(order.created_at);
      const month = date.toLocaleString("default", { month: "long" });
  
      if (!grouped[month]) {
        grouped[month] = { totalPrice: 0 };
      }
      grouped[month].totalPrice += order.total_price || 0;
    });
  
    return months.map((month) => ({
      month,
      totalPrice: grouped[month]?.totalPrice || 0,
    }));
  };
  


// console.log(data)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Sells</CardTitle>
        <CardDescription>
          Showing total sells in the last 6 months
        </CardDescription>
      </CardHeader>

      <CardContent>
  <div className="w-full h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
       data={data}
    //    data={chartData}
        margin={{ left: 12, right: 12 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <RechartsTooltip />
        <Area
          type="monotone"
          dataKey="totalPrice"
          stackId="1"
          stroke="#60a5fa"
          fill="#bfdbfe"
        />
       
     

      </AreaChart>
    </ResponsiveContainer>
  </div>
</CardContent>


      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground">
  {new Date().toLocaleString()}
</div>

          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
