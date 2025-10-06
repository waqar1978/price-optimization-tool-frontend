import React, {useEffect, useMemo, useState} from "react";
import type {ProductSales} from "../../types/api/products.ts";
import {Box, IconButton, MenuItem, Modal, Select, Stack, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import {Line} from "react-chartjs-2";
import {productService} from "../../api/services/products.ts";

type Props = {
    products: number[];
    open: boolean;
    handleClose: () => void;
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const colors = ["purple", "cyan", "orange", "green", "red", "blue"];

export const DemandForecastChart: React.FC<Props> = (props) => {
    const [productData, setProductData] = useState<ProductSales[]>([]);
    const [selectedFrequency, setSelectedFrequency] = useState<'week' | 'month' | 'year'>('week')

    const chartData = useMemo(() => {
        if (!productData.length) return { labels: [], datasets: [] };

        const getPeriod = (date: Date) => {
            switch (selectedFrequency) {
                case 'week':
                    { const firstDayOfWeek = new Date(date);
                    firstDayOfWeek.setDate(date.getDate() - date.getDay()); // Sunday as first day
                    return firstDayOfWeek.toISOString().slice(0, 10); } // YYYY-MM-DD
                case 'month':
                    return `${date.getFullYear()}-${(date.getMonth() + 1)
                        .toString()
                        .padStart(2, '0')}`;
                case 'year':
                    return date.getFullYear().toString();
                default:
                    return date.toISOString().slice(0, 10);
            }
        };

        const allPeriods = Array.from(
            new Set(
                productData.flatMap((p) =>
                    p.completeSales.map((s) => getPeriod(new Date(s.date)))
                )
            )
        ).sort();

        const datasets = productData.map((product, idx) => {
            const data = allPeriods.map((period) => {
                const periodSales = product.completeSales.filter(
                    (s) => getPeriod(new Date(s.date)) === period
                );
                return periodSales.reduce((sum, s) => sum + s.unitsSold, 0);
            });

            return {
                label: product.name,
                data,
                borderColor: colors[idx % colors.length],
                backgroundColor: colors[idx % colors.length],
                tension: 0.4,
            };
        });

        return {
            labels: allPeriods,
            datasets,
        };
    }, [productData, selectedFrequency]);


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom" as const,
                labels: {
                    usePointStyle: true, // <-- this makes the legend markers dots
                    pointStyle: 'circle', // optional, default is 'circle'
                    color: "#fff",
                },
            },
            title: {
                display: true,
                color: "#fff",
            },
        },
        scales: {
            x: {
                ticks: {color: "#fff"},
                grid: { display: false },
            },
            y: {
                ticks: {color: "#fff"},
                grid: {color: "rgba(255,255,255,0.1)"},
            },
        },
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 850,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(
        () => {
            if (props.open) {
                productService.getAllSales(props.products)
                    .then(
                        (data) => {
                            setProductData(data)
                        }
                    )
            }
        },
        [props.open, props.products]
    );

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={style}>
                <Stack direction="row" justifyContent={'space-between'} alignItems={'center'}>
                    <Typography>Demand Forecast</Typography>
                    <IconButton
                        onClick={props.handleClose}
                        aria-label="Close"
                        color={'primary'}
                    >
                        <CloseIcon/>
                    </IconButton>
                </Stack>
                <Box>
                    <Select
                        value={selectedFrequency}
                        onChange={(event) => {
                            setSelectedFrequency(event.target.value)
                        }}
                        variant={'standard'}
                    >
                        <MenuItem value={'week'}>Week</MenuItem>
                        <MenuItem value={'month'}>Month</MenuItem>
                        <MenuItem value={'year'}>Year</MenuItem>
                    </Select>
                </Box>
                <Line data={chartData} options={options}/>
            </Box>
        </Modal>
    )
}