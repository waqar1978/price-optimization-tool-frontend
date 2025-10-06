import React, {useMemo} from 'react';
import type {Product} from "../../types/api/products.ts";
import {Box, Checkbox, IconButton, TableCell, TableRow} from "@mui/material";
import {useProducts} from "../../context/hooks.ts";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
    product: Product,
    setDeleteProduct: () => void
    setEditProduct: () => void
    forecastProduct: () => void
}

export const ManageProductRow: React.FC<Props> = ({product, setDeleteProduct, setEditProduct, forecastProduct}: Props) => {
    const {withDemandForecast, selectedProductIds, setSelectedProductIds} = useProducts();

    const isSelected = useMemo(
        () => selectedProductIds.includes(product.productId), 
        [product.productId, selectedProductIds]
    );

    return (
        <TableRow sx={{"&:nth-of-type(even)": {backgroundColor: "#111"}}}>
            <TableCell padding="checkbox">
                <Checkbox 
                    sx={{color: "white"}}
                    checked={isSelected}
                    onChange={(event) => {
                        if (!event.target.checked)
                            setSelectedProductIds(
                                prev => prev.filter((p) => p !== product.productId)
                            )
                        else
                            setSelectedProductIds(prev => [...prev, product.productId]);
                    }}
                />
            </TableCell>
            <TableCell sx={{color: "white"}}>{product.name}</TableCell>
            <TableCell sx={{color: "white"}}>{product.category}</TableCell>
            <TableCell sx={{color: "white"}}>{product.costPrice}</TableCell>
            <TableCell sx={{color: "white"}}>{product.sellingPrice}</TableCell>
            <TableCell sx={{color: "white"}}>{product.description}</TableCell>
            <TableCell sx={{color: "white"}}>{product.stockAvailable}</TableCell>
            <TableCell sx={{color: "white"}}>{product.unitsSold}</TableCell>
            {withDemandForecast && (
                <TableCell sx={{color: "primary.main"}}>{product.demandForecast?.unitsForecast || '-'}</TableCell>
            )}
            <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                    <IconButton
                        size="small"
                        sx={{color: "white"}}
                        onClick={forecastProduct}
                    >
                        <VisibilityIcon fontSize="small"/>
                    </IconButton>
                    <IconButton
                        size="small"
                        sx={{color: "white"}}
                        onClick={setEditProduct}
                    >
                        <EditIcon fontSize="small"/>
                    </IconButton>
                    <IconButton
                        size="small"
                        sx={{color: "red"}}
                        onClick={setDeleteProduct}
                    >
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                </Box>
            </TableCell>
        </TableRow>
    )
}