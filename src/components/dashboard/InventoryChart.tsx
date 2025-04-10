
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/database";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface DailyMovementData {
  name: string;
  incoming: number;
  outgoing: number;
}

export default function InventoryChart() {
  const [data, setData] = useState<DailyMovementData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const movementData = await db.getProductMovementSummary(7);
        const formattedData = movementData.dailyMovements.map(item => ({
          name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          incoming: item.incoming,
          outgoing: item.outgoing
        }));
        
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching movement data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <Card className="col-span-7">
      <CardHeader>
        <CardTitle>Inventory Movement</CardTitle>
        <CardDescription>Daily product movement for the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-80 flex items-center justify-center">
            <p>Loading chart data...</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="incoming" name="Products In" fill="#34a853" radius={[4, 4, 0, 0]} />
              <Bar dataKey="outgoing" name="Products Out" fill="#4285f4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
