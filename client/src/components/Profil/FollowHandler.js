import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/user.actions';
import { isEmpty } from '../Utils';

const FollowHandler = ({idToFollow, button, type}) => {

    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    const handleFollow = () => {
        dispatch(followUser(userData._id, idToFollow));
        setIsFollowed(true);
    }

    const handleUnfollow = () => {
        dispatch(unfollowUser(userData._id, idToFollow));
        setIsFollowed(false);
    }

    useEffect(() => {
        if(!isEmpty(userData.following)) {
            if(userData.following.includes(idToFollow)) {
                setIsFollowed(true);
            } else setIsFollowed(false)
        } 
    }, [userData, idToFollow])


    return (
        <>
        {isFollowed && !isEmpty(userData) && userData._id !== idToFollow && (
            <div onClick={handleUnfollow} className="follow">
                {type === 'suggestion' && <button className="unfollow-btn">{button ? 'Supprimer' : 'Abonné'}</button>}
                {type === 'card' && (
                    <i className="fas fa-user-times"></i>
                )}
            </div>
        )}
        {isFollowed === false && !isEmpty(userData) && (
            <div onClick={handleFollow} className="follow">
                {type === 'suggestion' && <button className="follow-btn">Suivre</button>}
                {type === 'card' && (
                    <i className="fas fa-user-plus"></i>
                )}
            </div>
        )}
        </>
    );
};

export default FollowHandler;