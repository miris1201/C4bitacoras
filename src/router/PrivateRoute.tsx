import { FC } from "react"
import { Navigate } from "react-router-dom"

interface PrivateValues {
    isAuthenticated:boolean,
    children: any
}

export const PrivateRoute:FC<PrivateValues> = ({ isAuthenticated, children }) => {
    return isAuthenticated 
        ? children
        : <Navigate to='/login'/>
}
