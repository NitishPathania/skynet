import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
const Protected = () => {
    const [token, setToken] = useState([])
    const tokenGet = () => {
        const tokenData = JSON.parse(localStorage.getItem("token"))
        setToken(tokenData)
    }


    useEffect(() => {
        tokenGet()
    }, [])

    return (
        <div>
            {
                token ? <Outlet /> : <Navigate to="/login"></Navigate>
            }
        </div>
    )
}

export default Protected

