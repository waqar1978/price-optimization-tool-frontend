import React, {type ReactNode} from "react";
import {ProductsProvider} from "./products/ProductContext.tsx";
import {ThemeProvider} from "@mui/material";
import theme from "../../theme.ts";

type Props = {
    children: ReactNode;
}


export const AppContext: React.FC<Props> = ({children}: Props) => (
    <ThemeProvider theme={theme}>
        <ProductsProvider>
            {children}
        </ProductsProvider>
    </ThemeProvider>
)