import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateBio } from '../../actions/user.actions';
import { dateParser } from '../Utils';
import FollowHandler from './FollowHandler';
import UploadImg from './UploadImg';

const UpdateProfil = () => {

    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const dispatch = useDispatch();
    const [followingPopup, setFollowingPopup] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);

    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const error = useSelector((state) => state.errorReducer.userError)

    const handleUpdate = () => {
        dispatch(updateBio(userData._id, bio));
        setUpdateForm(false);
    }

    // const handleDelete = () => {
    //     dispatch(deleteUser(userData._id))
        // if(!isEmpty(usersData)) {
        //     for(let i=0; i < usersData.length; i++) {
        //         for(let j=0; j < usersData[i].following.length; j++) {
        //             if(usersData[i].following[j] === userData._id) {
        //                 usersData[i].following.splice(j, 1);
        //             }
        //         }
        //     }
        // }
    // }
    
    
    return (
        <div className="profil-container">
            <div className="user-container">
                <div className="info-container">
                    <h1>Mon profil</h1>
                    <div className="follow-container">
                        <button onClick={() => setFollowersPopup(true)}>Abonnés : {userData.followers ? userData.followers.length : ''}</button>
                        <button onClick={() => setFollowingPopup(true)}>Abonnements : {userData.following ? userData.following.length : ''}</button>
                    </div>
                </div>
                <div className="line"></div>
                <div className="update-container">
                    <div className="img-container">
                        <img src={userData.picture} alt="user-pic"/>
                        <UploadImg />
                        <p>{error.maxSize}</p>
                        <p>{error.format}</p>
                    </div>             
                    <div className="bio-container">
                        <div className="bio-update">
                            <h3>Bio</h3>
                            {updateForm === false && (
                                <>
                                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                                <button onClick={() => setUpdateForm(!updateForm)}>Modifier bio</button>
                                </>
                            )}
                            {updateForm && (
                                <>
                                <textarea type="text" defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                                <button onClick={handleUpdate}>Valider modifications</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-container">
                <p>Profil créé le : {dateParser(userData.createdAt)}</p>
                {/* <p>Supprimer le profil : <i classname="fas fa-trash" onClick={() => {
                    if(window.confirm('Voulez vraimez supprimer votre profil ?')) {
                        handleDelete();
                        window.location = '/';
                    }
                }}></i></p> */}
            </div>
            {followersPopup && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnés</h3>
                        <span className="cross" onClick={() => setFollowersPopup(false)}>&#10005;</span>
                        <ul>
                            {usersData.map((user) => {
                                for(let i = 0; i < userData.followers.length; i++) {
                                    if(user._id === userData.followers[i]) {
                                        return (
                                            <li key={user._id}>
                                                <NavLink exact to={"/profil/" + user._id} >
                                                    <img src={user.picture} alt="user-pic"/>
                                                    <h4>{user.pseudo}</h4>
                                                </NavLink>
                                                <FollowHandler idToFollow={user._id} button={false} type={'suggestion'} />
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
                            {usersData.map((user) => {
                                for(let i = 0; i < userData.following.length; i++) {
                                    if(user._id === userData.following[i]) {
                                        return (
                                            <li key={user._id}>
                                                <NavLink exact to={"/profil/" + user._id} >
                                                    <img src={user.picture} alt="user-pic"/>
                                                    <h4>{user.pseudo}</h4>
                                                </NavLink>
                                                <FollowHandler idToFollow={user._id} button={true} type={'suggestion'} />
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

export default UpdateProfil;