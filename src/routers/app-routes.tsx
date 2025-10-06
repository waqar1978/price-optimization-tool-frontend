import {Route, Routes} from "react-router-dom";
import {DashboardPage, ManageProductsPage} from "../pages";
import {PriceOptimisation} from "../pages/price-optimization.tsx";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DashboardPage/>}/>
            <Route path="/manage-products" element={<ManageProductsPage/>}/>
            <Route path="/price-optimization" element={<PriceOptimisation/>}/>
        </Routes>
    );
};