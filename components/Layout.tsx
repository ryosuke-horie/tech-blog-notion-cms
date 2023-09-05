import React from 'react';

import Navbar from './Navbar/Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}

export default Layout;