import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

type Props = {}

const LoginPage = (props: Props) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [redirect, setRedirect] = useState<boolean>(false);
    const { setUser } = useContext(UserContext);

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', {
                email,
                password,
            });
            const userInfo = response.data;
            setUser(userInfo);
            alert('Login Successful');
            setRedirect(true);
        }
        catch {
            alert('Login Failed, Try again!');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
                    <input type="email"
                        placeholder='your@email.com'
                        value={email}
                        onChange={e => setEmail(e.target.value)} />

                    <input type="password"
                        placeholder='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} />

                    <button className='primary'>Login</button>
                    <div className='text-center py-2 text-gray-500'>
                        Don't have an account yet? <Link to={'/register'} className='underline text-black hover:text-primary'>Register Now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;