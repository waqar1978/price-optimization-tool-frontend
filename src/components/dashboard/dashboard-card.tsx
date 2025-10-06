import {Card, IconButton, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

type Props = {
    icon: string;
    title: string;
    description: string;
    nextUrl: string;
};

export function DashboardCard(props: Props) {
    return (
        <Card sx={{bgcolor: 'white', width: 300, padding: 2}}>
            <img src={props.icon} width={100} alt={props.title} />
            <Typography variant={'h5'} sx={{fontWeight: 'bold'}} color={'secondary.contrastText'}>
                {props.title}
            </Typography>
            <Typography variant={'body2'} mt={3} color={'secondary.contrastText'}>
                {props.description}
            </Typography>
            <IconButton
                component={Link}
                to={props.nextUrl}
                sx={{mt: 4}}
                size={'large'}
            >
                <ArrowForwardIcon/>
            </IconButton>
        </Card>
    );
}