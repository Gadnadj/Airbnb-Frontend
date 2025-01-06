import React from 'react';
import { Link } from 'react-router-dom';

type Props = {}

const LoginPage = (props: Props) => {
    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form className='max-w-md mx-auto'>
                    <input type="email" placeholder='your@email.com' />
                    <input type="password" placeholder='password' />
                    <button className='primary'>Login</button>
                    <div>
                        Don't have an account yet? <Link to={'/register'}>Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;