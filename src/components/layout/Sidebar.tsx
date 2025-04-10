
import { useState } from "react";
import { 
  Sidebar as UISidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from "@/components/ui/sidebar";
import { 
  BarChartBig, 
  Boxes, 
  Package, 
  PackageCheck, 
  Settings, 
  Truck, 
  Users, 
  Warehouse 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: BarChartBig,
    path: "/"
  },
  {
    title: "Products",
    icon: Boxes,
    path: "/products"
  },
  {
    title: "Inventory",
    icon: Package,
    path: "/inventory"
  },
  {
    title: "Orders",
    icon: PackageCheck,
    path: "/orders"
  },
  {
    title: "Suppliers",
    icon: Truck,
    path: "/suppliers"
  },
  {
    title: "Customers",
    icon: Users,
    path: "/customers"
  },
  {
    title: "Warehouse",
    icon: Warehouse,
    path: "/warehouse"
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings"
  }
];

export function AppSidebar() {
  const location = useLocation();
  
  return (
    <UISidebar>
      <SidebarContent>
        <div className="mb-8 p-4">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-warehouse-primary">
            <Warehouse className="h-6 w-6" /> WareFlow
          </h1>
          <p className="text-sm text-muted-foreground">Warehouse Management System</p>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3", 
                        location.pathname === item.path && "text-warehouse-primary font-medium"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </UISidebar>
  );
}
