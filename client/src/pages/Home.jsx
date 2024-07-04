import React, { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser';
import useEthe from '../hooks/useEthe';

export default function Home() {
    const { user } = useAuth();
    const getUser = useUser();
    const getEthereum = useEthe();
    const [ethe, setEthe] = useState([]);

    useEffect(() => {
        getUser();
        const fetchDataAsync = async () => {
            try {
                const response = await getEthereum();
                setEthe(response);
                console.log(response);
            } catch (error) {
                console.log(error)
            } 
          };
          fetchDataAsync(); 
    }, [])

    return (
        <div className='container mt-3'>
            <div className='jumbotron'>
                {user?.email !== undefined ? (
                    <div className='row'>
                        <div className="mb-12">
                            <h1 className='text-center'>List user Ethereum balance</h1>
                        </div>
                        <table className='table table-bordered table-hover mt-5'>
                            <thead>
                                <tr>
                                    <th>Ethereum Address</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {user.address}
                                    </td>
                                    <td>
                                        {ethe == null ? '': ethe.balance} ETH
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="mb-12">
                        <h1 className='text-center'>Please Login First</h1>
                    </div>
                )}                
            </div>
        </div>
    )
}
