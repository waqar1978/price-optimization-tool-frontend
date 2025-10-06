import {AppBar, Avatar, Stack, Toolbar, Typography} from "@mui/material";

export const SystemNavbar = () => {
    return (
        <AppBar position={'relative'}>
            <Toolbar>
                <Typography color={'primary.main'} variant={'h6'} sx={{fontWeight: 'bold', flexGrow: 1}}>
                    Price Optimization Tool
                </Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                        <Typography variant={'subtitle1'} color={'text.secondary'}>
                            Welcome
                        </Typography>
                        <Typography color={'secondary.main'} sx={{fontWeight: 'lighterBold'}}>
                            Shahsad
                        </Typography>
                    </Stack>
                    <Avatar/>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}