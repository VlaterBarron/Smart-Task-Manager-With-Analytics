import { Navigate, Outlet, useLocation} from "react-router-dom";
import { SESSION_STORAGE_NAME } from "../utils/constants";

export const PrivateRoute = () => {

    const location = useLocation();

    return sessionStorage.getItem(SESSION_STORAGE_NAME) !== null ? <Outlet/> : <Navigate to="/login" replace state={{ from: location}}/>
}