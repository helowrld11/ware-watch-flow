
import { useEffect, useState } from "react";
import { db } from "@/lib/database";
import StatCard from "@/components/dashboard/StatCard";
import InventoryChart from "@/components/dashboard/InventoryChart";
import CategoryDistribution from "@/components/dashboard/CategoryDistribution";
import RecentMovements from "@/components/dashboard/RecentMovements";
import LowStockAlert from "@/components/dashboard/LowStockAlert";
import { BoxIcon, Boxes, PackageCheck, PackageX } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalItems: 0,
    incoming: 0,
    outgoing: 0,
    lowStockCount: 0,
    pendingOrders: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const inventoryStatus = await db.getInventoryStatus();
        const movementSummary = await db.getProductMovementSummary(30);
        const orderStatus = await db.getOrderStatus();
        
        setStats({
          totalProducts: inventoryStatus.totalProducts,
          totalItems: inventoryStatus.totalItems,
          incoming: movementSummary.incoming,
          outgoing: movementSummary.outgoing,
          lowStockCount: inventoryStatus.lowStockCount,
          pendingOrders: orderStatus.pendingSupplierOrders + orderStatus.processingCustomerOrders,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>Loading dashboard data...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your warehouse operations</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Boxes}
          description="Number of unique products"
        />
        <StatCard
          title="Total Inventory"
          value={stats.totalItems}
          icon={BoxIcon}
          description="Total items in warehouse"
        />
        <StatCard
          title="Products In"
          value={stats.incoming}
          icon={PackageCheck}
          description="Last 30 days"
          trend={{ value: 12, label: "vs previous period", positive: true }}
        />
        <StatCard
          title="Products Out"
          value={stats.outgoing}
          icon={PackageX}
          description="Last 30 days"
          trend={{ value: 5, label: "vs previous period", positive: true }}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-12 lg:grid-cols-12">
        <InventoryChart />
        <CategoryDistribution />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <RecentMovements />
        <LowStockAlert />
      </div>
    </div>
  );
}
