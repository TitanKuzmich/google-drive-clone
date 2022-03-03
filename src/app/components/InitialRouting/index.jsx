import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom"

import HomeScreen from "pages/HomeScreen"

const InitialRouting = () => {

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/drive"/>}
                />

                <Route
                    path="/drive"
                    element={<HomeScreen/>}
                />
            </Routes>
        </>
    )
}

export default InitialRouting