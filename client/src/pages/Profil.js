import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import UpdateProfil from '../components/Profil/UpdateProfil';
import { UidContext } from '../components/AppContext';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FriendProfil from '../components/Profil/FriendProfil';
import { isEmpty } from '../components/Utils';



const Profil = () => {

    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);

    let {id} = useParams();

    return (
        <div className="profil-page">
            {uid ? (
                <>
                <Navbar />
                {!isEmpty(userData) && !isEmpty(usersData) && userData._id === id ? (
                    <UpdateProfil />
                ) : (// eslint-disable-next-line
                    usersData.map((user) => {
                        if(user._id === id) {
                            return (
                                <FriendProfil user={user} key={user._id}/>
                            )
                        }
                    })
                )}
                </>
            ) : (
                <div className="not-connected">
                    <h1>Veuillez vous connecter</h1>
                    <NavLink exact to="/" >
                        Se connecter
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default Profil;