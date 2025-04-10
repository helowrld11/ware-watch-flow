
import { useEffect, useState } from "react";
import { db, ProductMovement } from "@/lib/database";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RecentMovements() {
  const [movements, setMovements] = useState<ProductMovement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productNames, setProductNames] = useState<Record<number, string>>({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const recentMovements = await db.getRecentMovements(5);
        setMovements(recentMovements);
        
        // Get product names
        const products = await db.getAllProducts();
        const productMap: Record<number, string> = {};
        products.forEach(product => {
          productMap[product.id] = product.name;
        });
        
        setProductNames(productMap);
      } catch (error) {
        console.error("Error fetching recent movements:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Movements</CardTitle>
        <CardDescription>Latest product movements in the warehouse</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-6 text-center">Loading...</div>
        ) : (
          <div className="space-y-4">
            {movements.map((movement) => (
              <div key={movement.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      movement.direction === 'in' ? "bg-green-100" : "bg-blue-100"
                    )}
                  >
                    {movement.direction === 'in' ? (
                      <ArrowDown className="h-4 w-4 text-warehouse-accent" />
                    ) : (
                      <ArrowUp className="h-4 w-4 text-warehouse-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{productNames[movement.productId]}</p>
                    <p className="text-xs text-muted-foreground">{movement.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p 
                    className={cn(
                      "font-medium text-sm",
                      movement.direction === 'in' ? "text-warehouse-accent" : "text-warehouse-primary"
                    )}
                  >
                    {movement.direction === 'in' ? '+' : '-'}{movement.quantity} units
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {movement.timestamp.toLocaleDateString()} {movement.timestamp.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
