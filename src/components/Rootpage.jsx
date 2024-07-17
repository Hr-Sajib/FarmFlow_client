import React from 'react';
import { Outlet } from 'react-router-dom';

const Rootpage = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default Rootpage;