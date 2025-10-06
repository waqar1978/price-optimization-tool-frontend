import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Box, Button, IconButton, InputBase, MenuItem, Select, Stack, Typography,} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import {useNavigate} from "react-router-dom";
import {useProducts} from "../../context/hooks.ts";
import type {ProductQuery} from "../../types/api/products.ts";
import {productService} from "../../api/services/products.ts";


export const PriceOptimizationControls: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [filterValues, setFilterValues] = useState<ProductQuery>({withDemandForecast: true})

    const {setProducts, products} = useProducts();
    const navigate = useNavigate();

    const categories = useMemo(
        () => [...new Set(products.map(product => product.category))],
        [products]
    );

    const fetchProducts = useCallback(() => {
        productService.getAll(filterValues)
            .then(products => setProducts(products));
    }, [filterValues, setProducts]);

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
                <Typography variant="h6">Pricing Optimization</Typography>
            </Stack>
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
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
            </Stack>
        </Box>
    );
}
