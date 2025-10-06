export type Product = {
    productId: number;
    name: string;
    description: string;
    costPrice: string;
    sellingPrice: string;
    category: string;
    stockAvailable: number;
    unitsSold: number;
    customerRating: number;
    demandForecast?: {
        profitForecast: number;
        revenueForecast: number;
        unitsForecast: number;
    };
    optimizedPrice: string
};

export type ProductQuery = {
    search?: string;
    category?: string;
    withDemandForecast?: boolean;
    demandForecastInterval?: number;
}

export type AddProductRequest = Omit<Product, 'productId' | 'customerRating' | 'optimizedPrice' | 'stockAvailable' | 'demandForecast'>;

export type Sales = {
    productId: number;
    date: string;
    unitsSold: number;
    sellingPrice: string;
}

export type ProductSales = Product & {
    completeSales: Sales[];
}

export type PriceOptimizationData = {
    id: number;
    currentPrice: string;
    totalForecastedDemand: number;
    costPrice: string;
}

export type PriceOptimizationResult = {
    id: number;
    optimalPrice: string;
    totalForecastedDemand: number;
    costPrice: string;
}

export type ProductUpdateData = {
    unitsSold: number;
    sellingPrice: string;
    stockAvailable: number;
}