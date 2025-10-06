import {useContext} from "react";
import ProductContext from "./ProductContext.tsx";

export const useProducts = () => {
    const ctx = useContext(ProductContext);
    if (!ctx) throw new Error("useProducts must be used within UserProvider");
    return ctx;
};