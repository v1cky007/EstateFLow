import React from "react";
import Sidebar from "./sidebar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from "./Dashboard";

const Admin=() =>{
    
    return(
        <div>
        <Sidebar />
        <Dashboard/>
        </div>

    )
}
export default Admin;