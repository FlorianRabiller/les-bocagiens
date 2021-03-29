import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from './Log/Logout';
import { useSelector } from 'react-redux';
import Search from './Search';

const Navbar = () => {

    const userData = useSelector((state) => state.userReducer);

    return (
        <nav>
            <div className="nav-container">
                <NavLink exact to='/' activeClassName="active">
                    <div className="title">
                        <img src="../img/icons/logo.png" alt="logo"/>
                        <h1>LES BOCAGIENS</h1>
                    </div>
                    <div className="title-media">
                        <i className="fas fa-home"></i>
                    </div>
                </NavLink>
                <Search />
                <NavLink exact to={"/profil/" + userData._id} activeClassName="active">
                    <div className="user-nav-container">
                        <img src={userData.picture} alt="user"/>
                        <h5>{userData.pseudo}</h5>
                    </div>
                        <div className="user-media">
                            <i class="fas fa-user"></i>
                        </div>
                </NavLink>
                <Logout />
            </div>
        </nav>
    );
};

export default Navbar;