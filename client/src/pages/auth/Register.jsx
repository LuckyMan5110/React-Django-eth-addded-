import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../api/apiConfig'
import Web3 from 'web3'

const web3 = new Web3();

export default function Register() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const first_name = useRef()
    const last_name = useRef()
    const address = useRef()
    const email = useRef()
    const password = useRef()
    const password2 = useRef(undefined)
    const [isValid, setIsValid] = useState(null);

    const handleAddressChange = (e) => {
        setIsValid(web3.utils.isAddress(e.target.value));
    };

    async function onSubmitForm(event) {
        event.preventDefault()
        const data = {
            first_name: first_name.current.value,
            last_name: last_name.current.value,
            address: address.current.value,
            email: email.current.value,
            password: password.current.value,
            password2: password2.current.value
          };

        setLoading(true)

        try {
            const response = await axiosInstance.post('auth/register', JSON.stringify(data))

            setLoading(false)

            navigate('/auth/login')
        } catch (error) {
            setLoading(false)
            // TODO: handle errors
        }
    }

    return (
        <div className='container mt-4'>
            <h2>Register</h2>
            <form onSubmit={onSubmitForm}>
                <div className="mb-3">
                    <input type="text" placeholder='First Name' autoComplete='off' className='form-control' id='first_name' ref={first_name} />
                </div>
                <div className="mb-3">
                    <input type="text" placeholder='Last Name' autoComplete='off' className='form-control' id='last_name' ref={last_name} />
                </div>
                <div className="mb-3">
                    <input type="text" placeholder='Ethereum Address' autoComplete='off' className='form-control' id="address" ref={address} onChange={handleAddressChange}/>
                </div>
                {isValid === null ? (
                    ''
                ) : isValid ? (
                    <p style={{ color: 'green' }}>Valid Ethereum address</p>
                ) : (
                    <p style={{ color: 'red' }}>Invalid Ethereum address</p>
                )}
                <div className="mb-3">
                    <input type="email" placeholder='Email' autoComplete='off' className='form-control' id="email" ref={email} />
                </div>
                <div className="mb-3">
                    <input type="password" placeholder='Password' autoComplete='off' className='form-control' id="password" ref={password} />
                </div>
                <div className="mb-3">
                    <input type="password" placeholder='Confirm Password' autoComplete='off' className='form-control' id="passwordConfirmation" ref={password2} />
                </div>
                <div className="mb-3">
                    <button disabled={loading} className='btn btn-success' type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}
