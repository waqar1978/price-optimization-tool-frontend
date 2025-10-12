import {Stack, Typography} from "@mui/material";
import ProductIcon from '../assets/product-icon.png';
import MarketInsightIcon from '../assets/market-research.png';
import {DashboardCard} from "../components";

function DashboardPage() {
    return (
        <Stack direction={'column'} minHeight={'100vh'} width={'100vw'} alignItems={'center'} py={5} spacing={5}>
            <Stack direction={'column'} alignItems={'center'}>
                <Typography variant={'h2'} sx={{fontWeight: 'fontWeightLight'}} gutterBottom={true}>
                    Price Optimization tool
                </Typography>
                <Typography variant={"body1"} sx={{fontSize: 20}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore
                    magna aliqua.
                </Typography>
            </Stack>
            <Stack direction={'row'} spacing={3} mt={4}>
                <DashboardCard
                    title={'Create and Manage Product'}
                    description={'Lorem ipsum dolor sit amet, consectetur adipiscing\n' +
                        '                        elit, sed do eiusmod tempor incididunt ut labore et\n' +
                        '                        dolore magna aliqua.'}
                    nextUrl={'/manage-products'}
                    icon={ProductIcon}
                />
                <DashboardCard
                    icon={MarketInsightIcon}
                    title={'Pricing Optimization'}
                    description={'Lorem ipsum dolor sit amet, consectetur adipiscing\n' +
                        'elit, sed do eiusmod tempor incididunt ut labore et\n' +
                        'dolore magna aliqua. '}
                    nextUrl={'/price-optimization'}
                />
            </Stack>
        </Stack>
    );
}

    export {DashboardPage};