import React from "react"
import { Outlet } from "react-router-dom"
import NavBar from "./Navbar/Navbar"



function Root () {
    return (
        <>
        <NavBar/>
        <Outlet/>
        </>
    )
}

export default Root