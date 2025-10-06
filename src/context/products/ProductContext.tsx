import React, {createContext, useState} from "react";
import type {Product} from "../../types/api/products.ts";

type ProductContextType = {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    withDemandForecast: boolean;
    setWithDemandForecast: React.Dispatch<React.SetStateAction<boolean>>
    selectedProductIds: number[]
    setSelectedProductIds: React.Dispatch<React.SetStateAction<number[]>>
};

type Props = {
    children: React.ReactNode
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductsProvider: React.FC<Props> = ({children}: Props) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
    const [withDemandForecast, setWithDemandForecast] = useState(false);

    return (
        <ProductContext.Provider
            value={{
                products,
                setProducts,
                withDemandForecast,
                setWithDemandForecast,
                selectedProductIds,
                setSelectedProductIds,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContext;
