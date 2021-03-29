import React, { useState } from 'react';
import { dateParser } from '../Utils';
import { useSelector } from 'react-redux';
import FollowHandler from './FollowHandler';
import { NavLink } from 'react-router-dom';
// import Card from '../Post/Card';


const FriendProfil = ({user}) => {

    const [followingPopup, setFollowingPopup] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);

    const usersData = useSelector((state) => state.usersReducer);
    // const posts = useSelector((state) => state.postReducer);

    return (
        <div className="profil-container">
            <div className="user-container">
                <div className="info-container">
                    <h1>Profil de {user.pseudo}</h1>
                    <div className="follow-container">
                        <button onClick={() => setFollowersPopup(true)}>Abonnés : {user.followers ? user.followers.length : ''}</button>
                        <button onClick={() => setFollowingPopup(true)}>Abonnements : {user.following ? user.following.length : ''}</button>
                    </div>
                </div>
                <div className="line"></div>
                <div className="img-container">
                    <img src={user.picture} alt="user-pic"/>
                </div>             
                <div className="bio-container">
                    <h3>Bio</h3>
                    <p>{user.bio}</p>
                </div>    
            </div>
            <div className="footer-container">
                <p>Profil créé le : {dateParser(user.createdAt)}</p>
            </div>
            {followersPopup && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnés</h3>
                        <span className="cross" onClick={() => setFollowersPopup(false)}>&#10005;</span>
                        <ul>
                            {user.followers.map((follower) => {
                                for(let i=0; i < usersData.length; i++) {
                                    if(follower === usersData[i]._id) {
                                        return (
                                            <li key={usersData[i]._id}>
                                                <NavLink exact to={"/profil/" + usersData[i]._id} >
                                                    <img src={usersData[i].picture} alt="user-pic"/>
                                                    <h4>{usersData[i].pseudo}</h4>
                                                </NavLink>
                                                <FollowHandler idToFollow={usersData[i]._id} button={false} type={'suggestion'} />
                                            </li>
                                        )
                                    }
                                }
                                return null
                            })}
                        </ul>
                    </div>
                </div>
            )}
            {followingPopup && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnements</h3>
                        <span className="cross" onClick={() => setFollowingPopup(false)}>&#10005;</span>
                        <ul>
                            {user.following.map((following) => {
                                for(let i=0; i < usersData.length; i++) {
                                    if(following === usersData[i]._id) {
                                        return (
                                            <li key={usersData[i]._id}>
                                                <NavLink exact to={"/profil/" + usersData[i]._id} >
                                                    <img src={usersData[i].picture} alt="user-pic"/>
                                                    <h4>{usersData[i].pseudo}</h4>
                                                </NavLink>
                                                <FollowHandler idToFollow={usersData[i]._id} button={false} type={'suggestion'} />
                                            </li>
                                        )
                                    }
                                }
                                return null
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FriendProfil;