import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import NewPostForm from '../components/Post/NewPostForm';
import FriendsHint from '../components/Profil/FriendsHint';
import Thread from '../components/Thread';
import Navbar from '../components/Navbar';
import Log from '../components/Log'

const Home = () => {
    const uid = useContext(UidContext);

    console.log(uid);

    return (
        <div className="home">
            {uid ? (
                <>
                <Navbar />
                <div className="home-connected-container">
                    <NewPostForm />
                    <FriendsHint />
                    <Thread />
                </div>
                </>
            ) : (
                <div className="home-container">
                    <h1>Bienvenue sur LES BOCAGIENS</h1>
                    <h3>Veuillez-vous inscrire pour accéder au site</h3>
                    <Log />
                </div> 
            )}
        </div>
    );
};

export default Home;