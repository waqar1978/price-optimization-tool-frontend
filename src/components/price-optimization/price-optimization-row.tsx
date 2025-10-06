import React from 'react';
import type {PriceOptimizationResult, Product} from "../../types/api/products.ts";
import {Stack, TableCell, TableRow, Typography} from "@mui/material";

type Props = {
    product: Product,
    optimizedPricing?: PriceOptimizationResult
}

export const PriceOptimizationRow: React.FC<Props> = ({product, optimizedPricing}: Props) => {
    return (
        <TableRow sx={{"&:nth-of-type(even)": {backgroundColor: "#111"}, height: 60}}>
            <TableCell sx={{color: "white"}}>{product.name}</TableCell>
            <TableCell sx={{color: "white"}}>{product.category}</TableCell>
            <TableCell sx={{color: "white"}}>{product.description}</TableCell>
            <TableCell sx={{color: "white"}}>{product.costPrice}</TableCell>
            <TableCell sx={{color: "white"}}>{product.sellingPrice}</TableCell>
            <TableCell sx={{color: "white"}}>
                <Stack direction="row" justifyContent={'space-between'} alignItems={'center'}>
                    <Typography color={'gray'}>${product.sellingPrice}</Typography>
                    <Typography
                        color={'primary.main'}>{`${optimizedPricing?.optimalPrice ? `${optimizedPricing?.optimalPrice}` : '-'}`}</Typography>
                </Stack>
            </TableCell>
        </TableRow>
    )
}