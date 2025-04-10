
// This file simulates a SQL database interface for the warehouse management system

// Define types for our database entities
export interface Product {
  id: number;
  name: string;
  category: string;
  sku: string;
  description: string;
  quantity: number;
  reorderPoint: number;
  unitPrice: number;
  location: string;
  lastUpdated: Date;
}

export interface ProductMovement {
  id: number;
  productId: number;
  quantity: number;
  direction: 'in' | 'out';
  reason: string;
  timestamp: Date;
}

export interface SupplierOrder {
  id: number;
  supplierId: number;
  orderDate: Date;
  expectedDelivery: Date;
  status: 'pending' | 'delivered' | 'cancelled';
  products: { productId: number; quantity: number }[];
}

export interface CustomerOrder {
  id: number;
  customerId: number;
  orderDate: Date;
  shipDate: Date | null;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  products: { productId: number; quantity: number }[];
}

export interface Supplier {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

// Mock data for our simulated database
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    sku: "EL-WH-001",
    description: "Premium noise-cancelling wireless headphones",
    quantity: 120,
    reorderPoint: 20,
    unitPrice: 89.99,
    location: "A-101",
    lastUpdated: new Date("2024-04-01")
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    category: "Furniture",
    sku: "FN-CH-002",
    description: "Adjustable ergonomic office chair with lumbar support",
    quantity: 45,
    reorderPoint: 10,
    unitPrice: 199.99,
    location: "B-203",
    lastUpdated: new Date("2024-04-03")
  },
  {
    id: 3,
    name: "Smartphone Charger",
    category: "Electronics",
    sku: "EL-SC-003",
    description: "Fast-charging USB-C smartphone charger",
    quantity: 250,
    reorderPoint: 50,
    unitPrice: 19.99,
    location: "A-102",
    lastUpdated: new Date("2024-04-05")
  },
  {
    id: 4,
    name: "LED Desk Lamp",
    category: "Lighting",
    sku: "LT-DL-004",
    description: "Adjustable LED desk lamp with multiple brightness settings",
    quantity: 75,
    reorderPoint: 15,
    unitPrice: 34.99,
    location: "C-105",
    lastUpdated: new Date("2024-04-02")
  },
  {
    id: 5,
    name: "Notebook Set",
    category: "Office Supplies",
    sku: "OS-NB-005",
    description: "Set of 5 premium hardcover notebooks",
    quantity: 180,
    reorderPoint: 30,
    unitPrice: 24.99,
    location: "D-301",
    lastUpdated: new Date("2024-04-04")
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    category: "Electronics",
    sku: "EL-BS-006",
    description: "Portable waterproof Bluetooth speaker",
    quantity: 95,
    reorderPoint: 20,
    unitPrice: 59.99,
    location: "A-103",
    lastUpdated: new Date("2024-04-06")
  },
  {
    id: 7,
    name: "Coffee Maker",
    category: "Appliances",
    sku: "AP-CM-007",
    description: "Programmable coffee maker with thermal carafe",
    quantity: 35,
    reorderPoint: 8,
    unitPrice: 79.99,
    location: "E-401",
    lastUpdated: new Date("2024-04-07")
  },
  {
    id: 8,
    name: "Wireless Mouse",
    category: "Electronics",
    sku: "EL-WM-008",
    description: "Ergonomic wireless mouse with adjustable DPI",
    quantity: 150,
    reorderPoint: 30,
    unitPrice: 29.99,
    location: "A-104",
    lastUpdated: new Date("2024-04-08")
  }
];

const mockMovements: ProductMovement[] = [
  {
    id: 1,
    productId: 1,
    quantity: 20,
    direction: 'in',
    reason: 'Supplier delivery',
    timestamp: new Date("2024-04-01T09:30:00")
  },
  {
    id: 2,
    productId: 2,
    quantity: 5,
    direction: 'out',
    reason: 'Customer order #A12345',
    timestamp: new Date("2024-04-02T14:15:00")
  },
  {
    id: 3,
    productId: 3,
    quantity: 50,
    direction: 'in',
    reason: 'Supplier delivery',
    timestamp: new Date("2024-04-03T10:45:00")
  },
  {
    id: 4,
    productId: 1,
    quantity: 10,
    direction: 'out',
    reason: 'Customer order #B67890',
    timestamp: new Date("2024-04-04T11:20:00")
  },
  {
    id: 5,
    productId: 4,
    quantity: 15,
    direction: 'in',
    reason: 'Supplier delivery',
    timestamp: new Date("2024-04-05T15:30:00")
  },
  {
    id: 6,
    productId: 5,
    quantity: 20,
    direction: 'out',
    reason: 'Customer order #C13579',
    timestamp: new Date("2024-04-06T09:10:00")
  },
  {
    id: 7,
    productId: 2,
    quantity: 10,
    direction: 'in',
    reason: 'Return from customer',
    timestamp: new Date("2024-04-07T13:45:00")
  },
  {
    id: 8,
    productId: 6,
    quantity: 15,
    direction: 'out',
    reason: 'Customer order #D24680',
    timestamp: new Date("2024-04-08T10:20:00")
  }
];

const mockSuppliers: Supplier[] = [
  {
    id: 1,
    name: "TechSource Inc.",
    contactPerson: "John Smith",
    email: "john.smith@techsource.com",
    phone: "555-123-4567"
  },
  {
    id: 2,
    name: "Office Essentials",
    contactPerson: "Sarah Johnson",
    email: "sarah@officeessentials.com",
    phone: "555-234-5678"
  },
  {
    id: 3,
    name: "Global Electronics",
    contactPerson: "Michael Chen",
    email: "mchen@globalelectronics.com",
    phone: "555-345-6789"
  }
];

const mockCustomers: Customer[] = [
  {
    id: 1,
    name: "Bright Ideas Co.",
    email: "orders@brightideas.com",
    phone: "555-876-5432"
  },
  {
    id: 2,
    name: "Urban Office Solutions",
    email: "purchasing@urbanoffice.com",
    phone: "555-765-4321"
  },
  {
    id: 3,
    name: "TechStart Innovations",
    email: "supply@techstart.com",
    phone: "555-654-3210"
  }
];

const mockSupplierOrders: SupplierOrder[] = [
  {
    id: 1,
    supplierId: 1,
    orderDate: new Date("2024-03-28"),
    expectedDelivery: new Date("2024-04-04"),
    status: 'delivered',
    products: [
      { productId: 1, quantity: 20 },
      { productId: 3, quantity: 50 }
    ]
  },
  {
    id: 2,
    supplierId: 2,
    orderDate: new Date("2024-04-01"),
    expectedDelivery: new Date("2024-04-08"),
    status: 'pending',
    products: [
      { productId: 2, quantity: 15 },
      { productId: 5, quantity: 30 }
    ]
  },
  {
    id: 3,
    supplierId: 3,
    orderDate: new Date("2024-04-03"),
    expectedDelivery: new Date("2024-04-10"),
    status: 'pending',
    products: [
      { productId: 6, quantity: 25 },
      { productId: 8, quantity: 40 }
    ]
  }
];

const mockCustomerOrders: CustomerOrder[] = [
  {
    id: 1,
    customerId: 1,
    orderDate: new Date("2024-04-02"),
    shipDate: new Date("2024-04-04"),
    status: 'shipped',
    products: [
      { productId: 1, quantity: 5 },
      { productId: 8, quantity: 10 }
    ]
  },
  {
    id: 2,
    customerId: 2,
    orderDate: new Date("2024-04-03"),
    shipDate: new Date("2024-04-05"),
    status: 'shipped',
    products: [
      { productId: 2, quantity: 3 },
      { productId: 7, quantity: 2 }
    ]
  },
  {
    id: 3,
    customerId: 3,
    orderDate: new Date("2024-04-05"),
    shipDate: null,
    status: 'processing',
    products: [
      { productId: 3, quantity: 20 },
      { productId: 6, quantity: 8 }
    ]
  },
  {
    id: 4,
    customerId: 1,
    orderDate: new Date("2024-04-06"),
    shipDate: null,
    status: 'pending',
    products: [
      { productId: 4, quantity: 12 },
      { productId: 5, quantity: 15 }
    ]
  }
];

// Database service class to handle all database operations
class DatabaseService {
  private products: Product[] = [...mockProducts];
  private movements: ProductMovement[] = [...mockMovements];
  private suppliers: Supplier[] = [...mockSuppliers];
  private customers: Customer[] = [...mockCustomers];
  private supplierOrders: SupplierOrder[] = [...mockSupplierOrders];
  private customerOrders: CustomerOrder[] = [...mockCustomerOrders];

  // Product methods
  getAllProducts(): Promise<Product[]> {
    return Promise.resolve([...this.products]);
  }

  getProductById(id: number): Promise<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return Promise.resolve(product);
  }

  searchProducts(query: string): Promise<Product[]> {
    const normalizedQuery = query.toLowerCase();
    const results = this.products.filter(p => 
      p.name.toLowerCase().includes(normalizedQuery) ||
      p.category.toLowerCase().includes(normalizedQuery) ||
      p.sku.toLowerCase().includes(normalizedQuery)
    );
    return Promise.resolve(results);
  }

  addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const newId = Math.max(...this.products.map(p => p.id), 0) + 1;
    const newProduct = { ...product, id: newId };
    this.products.push(newProduct);
    return Promise.resolve(newProduct);
  }

  updateProduct(id: number, updates: Partial<Product>): Promise<Product | null> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return Promise.resolve(null);
    
    this.products[index] = { ...this.products[index], ...updates, lastUpdated: new Date() };
    return Promise.resolve(this.products[index]);
  }

  deleteProduct(id: number): Promise<boolean> {
    const initialLength = this.products.length;
    this.products = this.products.filter(p => p.id !== id);
    return Promise.resolve(this.products.length < initialLength);
  }

  // Movement methods
  getAllMovements(): Promise<ProductMovement[]> {
    return Promise.resolve([...this.movements]);
  }

  getRecentMovements(limit: number = 10): Promise<ProductMovement[]> {
    return Promise.resolve(
      [...this.movements]
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, limit)
    );
  }

  getMovementsByProduct(productId: number): Promise<ProductMovement[]> {
    return Promise.resolve(this.movements.filter(m => m.productId === productId));
  }

  addMovement(movement: Omit<ProductMovement, 'id'>): Promise<ProductMovement> {
    const newId = Math.max(...this.movements.map(m => m.id), 0) + 1;
    const newMovement = { ...movement, id: newId };
    this.movements.push(newMovement);
    
    // Update product quantity
    const product = this.products.find(p => p.id === movement.productId);
    if (product) {
      const quantityChange = movement.direction === 'in' ? movement.quantity : -movement.quantity;
      this.updateProduct(product.id, { 
        quantity: product.quantity + quantityChange,
        lastUpdated: new Date()
      });
    }
    
    return Promise.resolve(newMovement);
  }

  // Analytics methods
  getInventoryStatus(): Promise<{ 
    totalProducts: number;
    totalItems: number;
    lowStockCount: number;
    categories: { category: string; count: number }[];
  }> {
    const totalProducts = this.products.length;
    const totalItems = this.products.reduce((sum, p) => sum + p.quantity, 0);
    const lowStockCount = this.products.filter(p => p.quantity <= p.reorderPoint).length;
    
    // Count by category
    const categoryMap = new Map<string, number>();
    this.products.forEach(p => {
      const currentCount = categoryMap.get(p.category) || 0;
      categoryMap.set(p.category, currentCount + 1);
    });
    
    const categories = Array.from(categoryMap.entries()).map(([category, count]) => ({
      category,
      count
    }));
    
    return Promise.resolve({
      totalProducts,
      totalItems,
      lowStockCount,
      categories
    });
  }

  getProductMovementSummary(days: number = 30): Promise<{
    incoming: number;
    outgoing: number;
    dailyMovements: { date: string; incoming: number; outgoing: number }[];
  }> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const recentMovements = this.movements.filter(m => m.timestamp >= cutoffDate);
    
    const incoming = recentMovements
      .filter(m => m.direction === 'in')
      .reduce((sum, m) => sum + m.quantity, 0);
      
    const outgoing = recentMovements
      .filter(m => m.direction === 'out')
      .reduce((sum, m) => sum + m.quantity, 0);
      
    // Create daily movement data
    const dailyData = new Map<string, { incoming: number; outgoing: number }>();
    
    // Initialize all days in the range
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      dailyData.set(dateString, { incoming: 0, outgoing: 0 });
    }
    
    // Fill in the data
    recentMovements.forEach(movement => {
      const dateString = movement.timestamp.toISOString().split('T')[0];
      const currentData = dailyData.get(dateString) || { incoming: 0, outgoing: 0 };
      
      if (movement.direction === 'in') {
        currentData.incoming += movement.quantity;
      } else {
        currentData.outgoing += movement.quantity;
      }
      
      dailyData.set(dateString, currentData);
    });
    
    // Convert to array and sort by date
    const dailyMovements = Array.from(dailyData.entries())
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => a.date.localeCompare(b.date));
    
    return Promise.resolve({
      incoming,
      outgoing,
      dailyMovements
    });
  }

  getOrderStatus(): Promise<{
    pendingSupplierOrders: number;
    processingCustomerOrders: number;
  }> {
    const pendingSupplierOrders = this.supplierOrders.filter(o => o.status === 'pending').length;
    const processingCustomerOrders = this.customerOrders.filter(o => 
      o.status === 'pending' || o.status === 'processing'
    ).length;
    
    return Promise.resolve({
      pendingSupplierOrders,
      processingCustomerOrders
    });
  }

  getLowStockProducts(): Promise<Product[]> {
    return Promise.resolve(
      this.products.filter(p => p.quantity <= p.reorderPoint)
    );
  }

  // Order methods
  getCustomerOrders(status?: CustomerOrder['status']): Promise<CustomerOrder[]> {
    let orders = [...this.customerOrders];
    if (status) {
      orders = orders.filter(o => o.status === status);
    }
    return Promise.resolve(orders);
  }

  getSupplierOrders(status?: SupplierOrder['status']): Promise<SupplierOrder[]> {
    let orders = [...this.supplierOrders];
    if (status) {
      orders = orders.filter(o => o.status === status);
    }
    return Promise.resolve(orders);
  }
}

// Export singleton instance
export const db = new DatabaseService();
