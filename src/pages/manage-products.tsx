import {Box, Stack} from "@mui/material";
import {SystemNavbar, ManageProductsControls, ManageProductTable} from "../components";

export const ManageProductsPage = () => {
    return (
        <Stack minHeight={'100vh'}>
            <SystemNavbar/>
            <ManageProductsControls/>
            <Box p={2} sx={{flexGrow: 1}}>
                <ManageProductTable/>
            </Box>
        </Stack>
    )
}