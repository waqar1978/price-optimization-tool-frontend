import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material";
import React, {useEffect, useState} from "react";
import type {PriceOptimizationResult, Product} from "../../types/api/products.ts";
import {useProducts} from "../../context/hooks.ts";
import {PriceOptimizationRow} from "./price-optimization-row.tsx";
import {productService} from "../../api/services/products.ts";


export const PriceOptimizationTable: React.FC = () => {
    const [optimizedPrices, setOptimizedPrices] = useState<PriceOptimizationResult[]>([])
    const {products} = useProducts();

    useEffect(() => {
        if (products.length > 0)
            productService.priceOptimize(products.filter(p => !!p.demandForecast).map(p => ({
                id: p.productId,
                costPrice: p.costPrice,
                currentPrice: p.sellingPrice,
                totalForecastedDemand: p.demandForecast!.unitsForecast
            })))
                .then(results => {
                    setOptimizedPrices(results)
                })
    }, [products]);

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{backgroundColor: "black"}}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{backgroundColor: "#111"}}>
                            <TableCell sx={{color: "white", fontWeight: "bold"}}>Product Name</TableCell>
                            <TableCell sx={{color: "white", fontWeight: "bold"}}>Product Category</TableCell>
                            <TableCell sx={{color: "white", fontWeight: "bold"}}>Description</TableCell>
                            <TableCell sx={{color: "white", fontWeight: "bold"}}>Cost Price</TableCell>
                            <TableCell sx={{color: "white", fontWeight: "bold"}}>Selling Price</TableCell>
                            <TableCell sx={{color: "white", fontWeight: "bold"}}>Optimized Price</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {products.map((product: Product, index) => {
                            const optimizedPricing = optimizedPrices.find(p => p.id === product.productId)
                            return (
                                <PriceOptimizationRow
                                    key={index}
                                    product={product}
                                    optimizedPricing={optimizedPricing}
                                />
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
