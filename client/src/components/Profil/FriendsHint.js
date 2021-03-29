import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../Utils';
import FollowHandler from './FollowHandler';
import { useMediaQuery } from 'react-responsive';

const FriendsHint = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [playOnce, setPlayOnce] = useState(true);
    const [friendsHint, setFriendsHint] = useState([]);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    const isMobile = useMediaQuery({ query: '(max-width: 590px)' })

    const noFriendList = () => {
        let array = [];
        // eslint-disable-next-line
        usersData.map((user) => {
            if(user._id !== userData._id && !user.followers.includes(userData._id)) {
                return array.push(user._id);
            }
        })
        array.sort(() => 0.5 - Math.random());

        setFriendsHint(array);
    }

    useEffect(() => {
        if(playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
            noFriendList();
            setIsLoading(false);
            setPlayOnce(false)
        }// eslint-disable-next-line
    }, [usersData, userData])

    return (
        <div className="friend-hint-container">
            <h4>Suggestions :</h4>
            <div className="wrapper-container">
                {isLoading ? (
                    <div className="icon">
                        <i className="fas fa-spinner fa-pulse"></i>
                    </div>
                ) : (
                    <ul>
                        {/* eslint-disable-next-line */}
                        {friendsHint[0] ? (friendsHint.map((user) => {
                            for(let i=0; i < usersData.length; i++) {
                                if(user === usersData[i]._id) {
                                    return (
                                        <li className="user-hint" key={user}>
                                            <img src={usersData[i].picture} alt="user"/>
                                            <p>{usersData[i].pseudo}</p>
                                            {isMobile ? (
                                                <FollowHandler idToFollow={usersData[i]._id} type={"card"} />
                                            ) : (
                                                <FollowHandler idToFollow={usersData[i]._id} type={"suggestion"} />
                                            )}
                                        </li>
                                    ) 
                                }
                            }
                        })): (
                            <p>Aucune suggestion trouvé</p>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FriendsHint;