import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Box, Button, Divider, IconButton, InputBase, MenuItem, Select, Stack, Switch, Typography,} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import {AddProductModal} from "./add-product-modal.tsx";
import {useNavigate} from "react-router-dom";
import {useProducts} from "../../context/hooks.ts";
import type {Product, ProductQuery} from "../../types/api/products.ts";
import {productService} from "../../api/services/products.ts";
import {DemandForecastChart} from "./demand-forecast-chart.tsx";


export const ManageProductsControls: React.FC = () => {
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [filterValues, setFilterValues] = useState<ProductQuery>({})
    const [forecastingProducts, setForecastingProducts] = useState<number[]>([])

    const {setProducts, products, setWithDemandForecast, withDemandForecast, selectedProductIds} = useProducts();
    const navigate = useNavigate();

    const addProduct = useCallback(
        (product: Product) => setProducts(prevState => ([...prevState, product])),
        [setProducts]
    );
    const categories = useMemo(
        () => [...new Set(products.map(product => product.category))],
        [products]
    );

    const fetchProducts = useCallback(() => {
        filterValues.withDemandForecast = withDemandForecast;

        productService.getAll(filterValues)
            .then(products => setProducts(products));
    }, [filterValues, setProducts, withDemandForecast]);

    useEffect(() => {
        const event = setTimeout(
            () => setFilterValues(prevState => ({...prevState, search: searchValue})),
            500
        );
        return () => {
            clearTimeout(event);
        }
    }, [searchValue]);

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts]);

    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                bgcolor="black"
                color="white"
                justifyContent={["space-between"]}
                px={2}
                py={1}
                gap={2}
            >
                <Stack direction='row' spacing={2} alignItems={'center'}>
                    {/* Left Section */}
                    <IconButton
                        sx={{color: "white"}}
                        onClick={() => {
                            navigate(-1)
                        }}
                    >
                        <ArrowBackIcon/>
                    </IconButton>
                    <Typography variant="h6">Create and Manage Product</Typography>
                </Stack>
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2">Demand Forecast</Typography>
                        <Switch
                            size="small"
                            checked={withDemandForecast}
                            onChange={(_, value) => {
                                setWithDemandForecast(value)
                                setFilterValues(prevState => ({...prevState, demandForecastInterval: 30}))
                            }}
                        />
                    </Box>
                    {withDemandForecast && (
                        <Box display="flex" alignItems="center" gap={1}>
                            <Select
                                value={filterValues.demandForecastInterval}
                                onChange={
                                    (event) =>
                                        setFilterValues(prevState => ({
                                            ...prevState,
                                            demandForecastInterval: event.target.value
                                        }))
                                }
                                size="small"
                                sx={{
                                    color: "white",
                                    backgroundColor: "#111",
                                    border: "1px solid #333",
                                    minWidth: 120,
                                }}
                            >
                                <MenuItem value={7}>Week</MenuItem>
                                <MenuItem value={30}>Month</MenuItem>
                                <MenuItem value={365}>Year</MenuItem>
                            </Select>
                        </Box>
                    )}

                    <Divider orientation="vertical" flexItem sx={{bgcolor: "#333"}}/>

                    {/* Search */}
                    <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                            backgroundColor: "#111",
                            border: "1px solid #333",
                            borderRadius: 1,
                            px: 1,
                        }}
                    >
                        <SearchIcon sx={{mr: 1, color: "#00b894"}}/>
                        <InputBase
                            placeholder="Search"
                            sx={{color: "white", width: 150}}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </Box>

                    {/* Category */}
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2">Category :</Typography>
                        <Select
                            value={selectedCategory}
                            onChange={
                                (event) =>
                                    setSelectedCategory(event.target.value)
                            }
                            size="small"
                            sx={{
                                color: "white",
                                backgroundColor: "#111",
                                border: "1px solid #333",
                                minWidth: 120,
                            }}
                        >
                            <MenuItem value=''>
                                <em>None</em>
                            </MenuItem>
                            {categories.map(category => (
                                <MenuItem value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                    </Box>

                    <Button
                        variant="outlined"
                        startIcon={<FilterListIcon/>}
                        sx={{
                            borderColor: "#333",
                            color: "white",
                            textTransform: "none",
                        }}
                        onClick={() => {
                            setFilterValues(prevState => ({
                                ...prevState,
                                category: selectedCategory,
                            }))
                        }}
                    >
                        Filter
                    </Button>

                    <Divider orientation="vertical" flexItem sx={{bgcolor: "#333"}}/>

                    {/* Right Section */}
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#00b894",
                            color: "black",
                            textTransform: "none",
                            "&:hover": {backgroundColor: "#00d6a3"},
                        }}
                        onClick={() => setIsAddProductModalOpen(!isAddProductModalOpen)}
                    >
                        Add
                    </Button>
                    {
                        selectedProductIds.length > 0 &&
                        (
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#00b894",
                                    color: "black",
                                    textTransform: "none",
                                    "&:hover": {backgroundColor: "#00d6a3"},
                                }}
                                onClick={() => {
                                    setForecastingProducts(selectedProductIds)
                                }}
                            >
                                Demand Forecast
                            </Button>
                        )
                    }
                </Stack>
            </Box>
            <AddProductModal
                open={isAddProductModalOpen}
                handleClose={() => setIsAddProductModalOpen(false)}
                onAddProduct={addProduct}
            />
            <DemandForecastChart
                products={forecastingProducts}
                open={forecastingProducts.length !== 0}
                handleClose={() => setForecastingProducts([])}
            />
        </>
    );
}
