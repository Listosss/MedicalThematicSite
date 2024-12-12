import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import React from 'react'

export function AppOutlet() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
