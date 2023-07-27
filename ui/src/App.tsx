import React from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom";
import {Layout} from "./layout/Layout";
import {APP_ROUTES} from './constants/Routes';

function App() {

    const routes = APP_ROUTES

    return (
        <div>
            {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}

            <Routes>

                <Route path="/" element={<Layout/>}>
                    {routes.map((route, i) => (
                        <Route
                            key={i}
                            exact={true}
                            path={`${route.path}`}
                            element={<route.element/>}
                        />
                    ))}
                </Route>
            </Routes>

        </div>
    )
}

export default App
