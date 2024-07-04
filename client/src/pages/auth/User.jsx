import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import useAuth from '../../hooks/useAuth'
import useLogout from "../../hooks/useLogout"
import useUser from '../../hooks/useUser'

export default function User() {

    const { user } = useAuth()

    const navigate = useNavigate()
    const logout = useLogout()
    const [loading, setLoading] = useState(false)
    const getUser = useUser()

    useEffect(() => {
        getUser()
    }, [])

    async function onLogout() {
        setLoading(true)

        await logout()
        navigate('/')
    }
    
    return (
        <div className='container mt-3'>
            <div className='jumbtron'>
                <h1 className='text-center'>User Profile</h1>
            </div>
            <table className="table table-hover mt-5">
                <tbody>
                    <tr>
                        <th scope="row">User ID</th>
                        <td>{user?.id}</td>
                    </tr>
                    <tr>
                        <th scope="row">User Name</th>
                        <td>{user?.first_name + " " + user?.last_name} </td>
                    </tr>
                    <tr>
                        <th scope="row">Email</th>
                        <td>{user?.email}</td>
                    </tr>
                    <tr>
                        <th scope="row">First Name</th>
                        <td>{user?.first_name}</td>
                    </tr>
                    <tr>
                        <th scope="row">Last Name</th>
                        <td>{user?.last_name}</td>
                    </tr>
                    <tr>
                        <th scope="row">Ethereum Address</th>
                        <td>{user?.address}</td>
                    </tr>
                    <tr>
                        <th scope="row">User Role</th>
                        <td>{user?.id ? 'staff': 'admin'}</td>
                    </tr>
                </tbody>
            </table>
            <button disabled={loading} type='button' className='btn btn-danger text-right' onClick={onLogout}>Logout</button>
        </div>
    )
}
