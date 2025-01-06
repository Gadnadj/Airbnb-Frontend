import React from 'react';

type Props = {}

const LoginPage = (props: Props) => {
    return (
        <div className='mt-4'>
            <h1 className='text-4xl text-center'>Login</h1>
            <form className='max-w-md mx-auto'>
                <input type="email" placeholder='your@email.com' />
                <input type="password" placeholder='password' />
                <button className='primary'>Login</button>
            </form>
        </div>
    );
};

export default LoginPage;