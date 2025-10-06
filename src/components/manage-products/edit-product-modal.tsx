import React, {useCallback, useState} from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography,} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {AddProductField} from "./add-product-fields.tsx";
import type {Product} from "../../types/api/products.ts";
import {productService} from "../../api/services/products.ts";

interface EditProductModalProps {
    open: boolean;
    handleClose: () => void;
    onEditProduct: (product: Product) => void;
    product: Product;
}

const EditProductModal: React.FC<EditProductModalProps> = ({open, handleClose, product, onEditProduct}) => {
    const [sellingPrice, setSellingPrice] = useState('');
    const [availableStock, setAvailableStock] = useState('');
    const [unitsSold, setUnitsSold] = useState('');

    const editProduct = useCallback(() => {
        productService.updateProduct(product.productId, {
            sellingPrice,
            unitsSold: Number(unitsSold),
            stockAvailable: Number(availableStock)
        }).then(onEditProduct);
    }, [availableStock, onEditProduct, product, sellingPrice, unitsSold]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: "#111",
                    color: "white",
                    borderRadius: 2,
                },
            }}
        >
            {/* Header */}
            <DialogTitle
                bgcolor={"background.paper"}
                sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}
            >
                <Typography variant="h6" component={'span'} sx={{color: "primary.main", fontWeight: "bold"}}>
                    Update
                </Typography>
                <IconButton onClick={handleClose} sx={{color: "primary.main"}}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>

            {/* Content */}
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    <AddProductField
                        label="Available Stock"
                        placeholder="xxx,xxx,xxx"
                        value={availableStock}
                        onChange={setAvailableStock}

                    />
                    <Box display="flex" gap={2}>
                        <AddProductField
                            label="Selling Price"
                            placeholder={'xxx,xxx,xxx'}
                            value={sellingPrice}
                            onChange={setSellingPrice}
                        />
                        <AddProductField
                            label="Units Sold"
                            placeholder="xxx,xxx,xxx"
                            value={unitsSold}
                            onChange={setUnitsSold}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={handleClose}
                    sx={{
                        borderColor: "#333",
                        color: "white",
                        textTransform: "none",
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#00b894",
                        color: "black",
                        textTransform: "none",
                        "&:hover": {backgroundColor: "#00d6a3"},
                    }}
                    onClick={() => {
                        editProduct();
                        handleClose();
                        setSellingPrice('');
                        setAvailableStock('');
                        setUnitsSold('');
                    }}
                >
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export {EditProductModal};
