import {Box, TextField, Typography} from "@mui/material";
import React from "react";

type Props = {
    label: string,
    value: string,
    onChange: (value: string) => void,
    placeholder?: string,
    size?: 'small' | 'medium',
    multiline?: boolean,
    rows?: number,
    type?: React.HTMLInputTypeAttribute
}

export const AddProductField: React.FC<Props> = (props: Props) => {
    return (
        <Box mt={.5} width={'100%'}>
            <Typography mb={.5} variant={'subtitle1'}>{props.label}</Typography>
            <TextField
                placeholder={props.placeholder}
                variant="outlined"
                fullWidth
                hiddenLabel
                multiline={props.multiline ?? false}
                rows={props.rows}
                size={props.size || 'small'}
                InputProps={{sx: {color: "white", backgroundColor: "#222"}}}
                value={props.value}
                type={props.type || 'text'}
                onChange={event => props.onChange(event.target.value)}
            />
        </Box>
    )
}