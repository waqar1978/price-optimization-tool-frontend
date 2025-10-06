import {Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material";
import React, {useCallback, useMemo, useState} from "react";
import type {Product} from "../../types/api/products.ts";
import {DeleteProductModal} from "./delete-product-modal.tsx";
import {useProducts} from "../../context/hooks.ts";
import {ManageProductRow} from "./manage-product-row.tsx";
import {DemandForecastChart} from "./demand-forecast-chart.tsx";
import {EditProductModal} from "./edit-product-modal.tsx";


export const ManageProductTable: React.FC = () => {
    const [deleteProduct, setDeleteProduct] = useState<Product>();
    const [editProduct, setEditProduct] = useState<Product>();
    const [forecastingProducts, setForecastingProducts] = useState<number[]>([])

    const {
        products,
        setProducts,
        withDemandForecast,
        selectedProductIds,
        setSelectedProductIds
    } = useProducts();

    const isEverythingSelected = useMemo(
        () => selectedProductIds.length === products.length,
        [products.length, selectedProductIds.length]
    );

    const updateProduct = useCallback((product: Product) => {
        setProducts(products => products.map(p => {
            if (p.productId === product.productId) return product;
            return p;
        }))
    }, [setProducts]);

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{backgroundColor: "black"}}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{backgroundColor: "#111"}}>
                            <TableCell padding="checkbox" sx={{color: "white"}}>
                                <Checkbox
                                    sx={{color: "white"}}
                                    checked={isEverythingSelected}
                                    onChange={(event) => {
                                        if (!event.target.checked)
                                            setSelectedProductIds([]);
                                        else
                                            setSelectedProductIds(products.map(p => p.productId))
                                    }}
                                />
                            </TableCell>
                            <TableCell sx={{color: "white", fontWeight: "bold"}}>Product Name</TableCell>
                            <TableCell sx={{color: "white", fontWeight: "bold"}}>Product Category</TableCell>
                            <TableCell sx={{color: "white", fontWeight: "bold"}}>Cost Price</TableCell>
                            <TableCell sx={{color: "white", fontWeight: "bold"}}>Selling Price</TableCell>
                            <TableCell sx={{color: "white", fontWeight: "bold"}}>Description</TableCell>
                            <TableCell sx={{color: "white", fontWeight: "bold"}}>Available Stock</TableCell>
                            <TableCell sx={{color: "white", fontWeight: "bold"}}>Units Sold</TableCell>
                            {withDemandForecast && (
                                <TableCell sx={{color: "white", fontWeight: "bold"}}>Calculated Demand
                                    Forecast</TableCell>
                            )}
                            <TableCell sx={{color: "white", fontWeight: "bold"}}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody sx={{height: 75}}>
                        {products.map((product: Product, index) => (
                            <ManageProductRow
                                key={index}
                                product={product}
                                setDeleteProduct={() => setDeleteProduct(product)}
                                forecastProduct={() => setForecastingProducts([product.productId])}
                                setEditProduct={() => setEditProduct(product)}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <DeleteProductModal
                open={Boolean(deleteProduct)}
                product={deleteProduct!}
                handleClose={() => {
                    setDeleteProduct(undefined);
                }}
                onDeleteProduct={(productId: number) => {
                    setProducts(prevState => prevState.filter(product => product.productId !== productId));
                }}
            />
            <EditProductModal
                open={!!editProduct}
                product={editProduct!}
                handleClose={() => setEditProduct(undefined)}
                onEditProduct={updateProduct}
            />
            <DemandForecastChart
                products={forecastingProducts}
                open={forecastingProducts.length !== 0}
                handleClose={() => setForecastingProducts([])}
            />
        </>
    );
}
