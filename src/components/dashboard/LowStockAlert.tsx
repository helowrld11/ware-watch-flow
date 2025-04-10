
import { useEffect, useState } from "react";
import { db, Product } from "@/lib/database";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LowStockAlert() {
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await db.getLowStockProducts();
        setLowStockProducts(products);
      } catch (error) {
        console.error("Error fetching low stock products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <Card>
      <CardHeader className="bg-red-50 border-b">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-warehouse-error" />
          <CardTitle>Low Stock Alert</CardTitle>
        </div>
        <CardDescription>Products below reorder point</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : lowStockProducts.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            No products below reorder point
          </div>
        ) : (
          <div>
            {lowStockProducts.map((product) => (
              <div key={product.id} className="p-4 border-b last:border-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-warehouse-error font-medium">{product.quantity}</span>
                    <span className="text-muted-foreground"> / {product.reorderPoint}</span>
                    <p className="text-xs text-muted-foreground">Current / Reorder</p>
                  </div>
                </div>
                <div className="mt-2">
                  <Button size="sm" variant="outline" className="w-full text-warehouse-primary">
                    Create Order
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
