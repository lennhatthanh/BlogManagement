import AuthContext from "@/context/AuthContext";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children, role: requireRole}) {
    const { userInfo, role } = useContext(AuthContext);
    if(!userInfo){
        return <Navigate to="/login"/>
    } 
    if(role !== requireRole){
        return <Navigate to="/"/> 
    }
  return children;
}
