import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

type Props = {};

const Layout = (props: Props) => {
  return (
    <div className='p-4'>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
