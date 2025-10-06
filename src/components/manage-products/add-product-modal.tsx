import React, {useCallback, useState} from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography,} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {AddProductField} from "./add-product-fields.tsx";
import {productService} from "../../api/services/products.ts";
import type {Product} from "../../types/api/products.ts";

interface AddProductModalProps {
    open: boolean;
    handleClose: () => void;
    onAddProduct: (product: Product) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({open, handleClose, onAddProduct}) => {
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [costPrice, setCostPrice] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [description, setDescription] = useState('');
    const [availableStock, setAvailableStock] = useState('');
    const [unitsSold, setUnitsSold] = useState('');

    const addProduct = useCallback(() => {
        productService.create({
            name: productName,
            category: productCategory,
            costPrice,
            sellingPrice,
            description,
            unitsSold: Number(unitsSold),
        }).then(onAddProduct);
    }, [costPrice, description, onAddProduct, productCategory, productName, sellingPrice, unitsSold]);

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
                    Add New Product
                </Typography>
                <IconButton onClick={handleClose} sx={{color: "primary.main"}}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>

            {/* Content */}
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    <AddProductField
                        label={'Product Name'}
                        placeholder={'Enter Product Name'}
                        size={'small'}
                        value={productName}
                        onChange={setProductName}
                    />
                    <AddProductField
                        label={'Product Category'}
                        placeholder={'Enter Product Category'}
                        size={'small'}
                        value={productCategory}
                        onChange={setProductCategory}
                    />
                    <Box display="flex" gap={2}>
                        <AddProductField
                            label="Cost Price"
                            placeholder={'xxx,xxx,xxx'}
                            value={costPrice}
                            onChange={setCostPrice}
                        />
                        <AddProductField
                            label="Selling Price"
                            placeholder={'xxx,xxx,xxx'}
                            value={sellingPrice}
                            onChange={setSellingPrice}
                        />
                    </Box>

                    <AddProductField
                        label="Description"
                        placeholder="Enter description"
                        multiline
                        rows={3}
                        value={description}
                        onChange={setDescription}
                    />

                    <Box display="flex" gap={2}>
                        <AddProductField
                            label="Available Stock"
                            placeholder="xxx,xxx,xxx"
                            value={availableStock}
                            onChange={setAvailableStock}

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
                    onClick={addProduct}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export {AddProductModal};
