import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React, {useCallback} from "react";
import type {Product} from "../../types/api/products.ts";
import {productService} from "../../api/services/products.ts";

type Props = {
    open: boolean;
    handleClose: () => void;
    product: Product;
    onDeleteProduct: (productId: number) => void;
}

export const DeleteProductModal: React.FC<Props> = (props: Props) => {
    const deleteProduct = useCallback(() => {
        productService.delete(props.product.productId)
            .then(() => {
                props.onDeleteProduct(props.product.productId);
                props.handleClose();
            })
    }, [props]);

    return (
        <Dialog open={props.open}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent sx={{mt: 2}}>
                By clicking Yes, you want to delete this product, you want to delete this product?
            </DialogContent>
            <DialogActions>
                <Button
                    variant={'outlined'}
                    onClick={props.handleClose}
                >
                    Cancel
                </Button>
                <Button
                    variant={'contained'}
                    color={'error'}
                    onClick={deleteProduct}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}