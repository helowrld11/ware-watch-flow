A web-based warehouse inventory management dashboard that makes day-to-day inventory tracking easier to follow. It brings the important parts of warehouse operations into one place (products, stock levels, recent movements, low-stock items, suppliers, customers and order status), so you don't have to jump between screens to see what is happening.
Features
Dashboard overview: a snapshot of inventory health, incoming and outgoing movement, and items that need attention.
Product management: browse the product catalogue with search and quick actions.
Stock tracking: monitor stock levels and recent inventory movements.
Low-stock identification: surface items running low so they can be restocked early.
Suppliers and customers: keep supplier and customer records alongside inventory data.
Order status: follow orders from a single view.
Tech Stack
Area	Tools
Framework	React.js, TypeScript
Build tool	Vite
Styling	Tailwind CSS, shadcn/ui
Tooling	ESLint, PostCSS
Data (current)	Seeded mock data with an in-memory database service
Getting Started
Prerequisites
Node.js 18 or later
npm (or Bun)
Installation
bash
# Clone the repository
git clone https://github.com/helowrld11/ware-watch-flow.git
cd ware-watch-flow

# Install dependencies
npm install

# Start the development server
npm run dev

Then open the local URL shown in your terminal (Vite usually serves at http://localhost:5173).

Build for production
bash
npm run build
npm run preview
Project Structure
ware-watch-flow/
├── public/            # Static assets
├── src/               # Application source (components, pages, data service)
├── index.html         # App entry point
├── vite.config.ts     # Vite configuration
├── tailwind.config.ts # Tailwind configuration
└── tsconfig*.json     # TypeScript configuration
How the Data Works

This version runs on seeded mock data served through an in-memory database service. That makes the app easy to run, test and extend without setting up a backend first. Data resets when the page is refreshed.

Roadmap
 Persistent storage with a relational database (schema for products, suppliers, customers, orders and stock movements)
 Backend API to replace the in-memory service
 Role-based access control
 Advanced reporting and analytics
 Exporting inventory and order reports
