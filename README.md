# Price Optimization Tool

A modern web application for managing products and optimizing pricing strategies using demand forecasting and data-driven insights.

## Overview

The Price Optimization Tool is a comprehensive solution designed to help businesses manage their product catalog and make informed pricing decisions. The application provides intuitive interfaces for product management, demand forecasting visualization, and price optimization based on historical sales data and market trends.

## Features

### Product Management
- **CRUD Operations**: Create, read, update, and delete products with detailed information
- **Product Catalog**: Manage product details including name, description, cost price, selling price, category, and stock levels
- **Search & Filter**: Search products by name and filter by category
- **Bulk Selection**: Select multiple products for batch operations

### Demand Forecasting
- **Visual Analytics**: Interactive charts displaying demand forecasts using Chart.js
- **Forecast Metrics**: View profit forecast, revenue forecast, and units forecast
- **Configurable Intervals**: Adjust demand forecast intervals for different time periods
- **Real-time Updates**: Toggle demand forecast data on/off for products

### Price Optimization
- **Optimal Pricing**: Calculate optimal prices based on demand forecasts and cost data
- **Comparative Analysis**: View current prices alongside optimized pricing recommendations
- **Data-Driven Decisions**: Leverage forecasted demand and cost price for pricing strategies

### User Interface
- **Responsive Design**: Built with Material-UI for a modern, responsive experience
- **Dashboard**: Central hub with quick access to main features
- **Data Tables**: Advanced table functionality powered by TanStack React Table
- **Modal Dialogs**: Intuitive modals for adding, editing, and deleting products

## Tech Stack

### Frontend Framework
- **React 19.1.1**: Modern React with latest features
- **TypeScript 5.8.3**: Type-safe development
- **Vite 7.1.7**: Fast build tool and development server

### UI Libraries
- **Material-UI (MUI) 7.3.2**: Comprehensive component library
  - @mui/material: Core components
  - @mui/icons-material: Icon set
  - @emotion/react & @emotion/styled: CSS-in-JS styling
- **TanStack React Table 8.21.3**: Powerful table management
- **Chart.js 4.5.0 & React-ChartJS-2 5.3.0**: Data visualization

### Routing & State Management
- **React Router DOM 7.9.3**: Client-side routing
- **React Context API**: Global state management

### HTTP & API
- **Axios 1.12.2**: HTTP client with interceptors
- **qs 6.14.0**: Query string parsing and serialization

### Development Tools
- **ESLint 9.36.0**: Code linting with TypeScript support
- **TypeScript ESLint 8.44.0**: TypeScript-specific linting rules

## Project Structure

```
price-optimization-tool/
├── public/                      # Static assets
├── src/
│   ├── api/                     # API layer
│   │   ├── http/               # HTTP client configuration
│   │   │   ├── axiosInstance.ts    # Axios setup
│   │   │   └── interceptors.ts     # Request/response interceptors
│   │   └── services/           # API service modules
│   │       └── products.ts         # Product API calls
│   ├── assets/                 # Images and static files
│   ├── components/             # React components
│   │   ├── common/            # Shared components
│   │   │   └── navbar.tsx         # Navigation bar
│   │   ├── dashboard/         # Dashboard components
│   │   │   └── dashboard-card.tsx # Dashboard cards
│   │   ├── manage-products/   # Product management components
│   │   │   ├── add-product-modal.tsx
│   │   │   ├── edit-product-modal.tsx
│   │   │   ├── delete-product-modal.tsx
│   │   │   ├── manage-product-table.tsx
│   │   │   ├── manage-product-row.tsx
│   │   │   ├── demand-forecast-chart.tsx
│   │   │   └── ...
│   │   ├── price-optimization/ # Price optimization components
│   │   │   ├── price-optimization-table.tsx
│   │   │   ├── price-optimization-row.tsx
│   │   │   └── ...
│   │   └── index.ts           # Component exports
│   ├── context/               # React Context providers
│   │   ├── AppContext.tsx     # Root context provider
│   │   ├── hooks.ts           # Custom hooks
│   │   └── products/          # Product-specific context
│   │       ├── ProductContext.tsx
│   │       └── useProducts.ts
│   ├── pages/                 # Page components
│   │   ├── dashboard.tsx      # Home dashboard
│   │   ├── manage-products.tsx # Product management page
│   │   ├── price-optimization.tsx # Price optimization page
│   │   └── index.ts           # Page exports
│   ├── routers/               # Routing configuration
│   ├── types/                 # TypeScript type definitions
│   │   └── api/
│   │       └── products.ts    # Product-related types
│   ├── App.tsx                # Root component
│   ├── main.tsx               # Application entry point
│   ├── App.css                # App styles
│   └── index.css              # Global styles
├── theme.ts                   # MUI theme configuration
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
├── eslint.config.js           # ESLint configuration
└── package.json               # Dependencies and scripts
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd price-optimization-tool
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Development

### Path Aliases
The project uses `@` as an alias for the `src` directory:
```typescript
import { Component } from '@/components'
```

### API Integration
API calls are centralized in `src/api/services/` with axios interceptors configured in `src/api/http/` for request/response handling.

### State Management
The application uses React Context API for global state management, with specific contexts for products and other features.

### Styling
Material-UI components are styled using the Emotion CSS-in-JS library, with custom theme configuration in `theme.ts`.

## Building for Production

```bash
npm run build
```

The optimized production build will be generated in the `dist` directory.

## License

This project is private and not licensed for public use.
