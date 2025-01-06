import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {}

const LoginPage = (props: Props) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('on mappelle');
            await axios.post('/login', {
                email,
                password,
            })
            alert('Login Successful')
        }
        catch {
            alert('Login Failed, Try again!')
        }
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