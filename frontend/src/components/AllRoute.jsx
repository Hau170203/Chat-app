import React from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from '../routes'

export const AllRoute = () => {
    const element = useRoutes(routes)
    return (
        <>
            {element}
        </>
    )
}
