import React from 'react';

import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '3rem',
            justifyContent: 'center',
            marginTop: '2rem',
            marginBottom: '2rem'
        }}>
            <NavLink to='/all-bar-codes'>View All BarCodes</NavLink>
            <br />
            <NavLink to='/'>Add A Bar Code</NavLink>
        </div>
    )
}

export default Nav;