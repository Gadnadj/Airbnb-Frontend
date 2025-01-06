import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {}

const RegisterPage = (props: Props) => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/register', {
                name,
                email,
                password,
            });
            alert('Registration Successful, Now you can log in');
        }
        catch (e) {
            alert('Registration Failed, Please try again later');
        }
    };

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <form className='max-w-md mx-auto' onSubmit={registerUser}>
                    <input type="text" placeholder='Username'
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder='Your@email.com'
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <button type='submit' className='primary'>Register</button>
                    <div className='text-center py-2 text-gray-500'>
                        Already a member? <Link to={'/login'} className='underline text-black hover:text-primary'>Login In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;