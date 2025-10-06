import {Box, Stack} from "@mui/material";
import {PriceOptimizationControls, SystemNavbar, PriceOptimizationTable} from "../components";

export const PriceOptimisation = () => {
    return (
        <Stack minHeight={'100vh'}>
            <SystemNavbar/>
            <PriceOptimizationControls/>
            <Box p={2} sx={{flexGrow: 1}}>
                <PriceOptimizationTable/>
            </Box>
        </Stack>
    )
}