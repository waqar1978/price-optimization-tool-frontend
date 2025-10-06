import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {CssBaseline} from "@mui/material";
import {AppContext} from "./context/AppContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppContext>
            <CssBaseline/>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AppContext>
    </StrictMode>,
)
