import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

type Props = {};

const Layout = (props: Props) => {
  return (
    <div className='py-4 px-8 p-4 flex flex-col min-h-screen'>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
