import { Navigate } from "react-router-dom"
import { FC } from 'react';

interface PublicValues {
    isAuthenticated:boolean,
    children: any
}


export const PublicRoute:FC<PublicValues> = ({ isAuthenticated, children }) =>{
    return isAuthenticated
        ? <Navigate to="/"/>
        : children
}
