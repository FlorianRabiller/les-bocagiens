import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updatePost } from '../../actions/post.actions';
import FollowHandler from '../Profil/FollowHandler';
import { dateParser, isEmpty } from '../Utils';
import CardComments from './CardComments';
import DeleteCard from './DeleteCard';
import LikeButton from './LikeButton';

const Card = ({ post }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const updateItem =  () => {
        if(textUpdate) {
            dispatch(updatePost(post._id, textUpdate))
        }
        setIsUpdated(false) 
    }

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false)
    }, [usersData]);

    return (
        <li className='card-container' key={post._id}>
            {isLoading ? (
                <i className='fas fa-spinner fa-spin'></i>
            ) : (
                <>
                <div className="card">
                    <div className="card-header">
                        {!isEmpty(usersData[0]) && usersData.map((user) => {
                            if(user._id === post.posterId) {
                                return (
                                    <div className="pseudo" key={user._id}>
                                        <NavLink exact to={"/profil/" + user._id} >
                                            <img src={user.picture} alt="poster"/>
                                            <h3>{user.pseudo}</h3>
                                        </NavLink>
                                        {post.poster !== userData._id && (
                                            <FollowHandler idToFollow={post.posterId} type={'card'} />
                                        )}
                                    </div>
                                )   
                            } else return null
                        })}
                        <span>{dateParser(post.createdAt)}</span>
                    </div>
                    {isUpdated === false && <p>{post.message}</p>}
                    {isUpdated && (
                        <div className="update-post">
                            <textarea defaultValue={post.message} onChange={(e) => setTextUpdate(e.target.value)} />
                            <div className="button-container">
                                <button className='btn' onClick={updateItem}>
                                    Valider modifiaction
                                </button>
                            </div>
                        </div>
                    )}
                    {post.picture && (
                        <div className="card-pic">
                            <img src={post.picture} alt="post"/>
                        </div>
                    )}
                    {post.video && (
                        <iframe
                            width="500"
                            height="300"
                            src={post.video}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={post._id}
                        ></iframe>
                    )}
                    {userData._id === post.posterId && (
                        <div className="button-container">
                            <div onClick={() => setIsUpdated(!isUpdated)}>
                                <i class="fas fa-edit"></i>
                            </div>
                            <DeleteCard postId={post._id} />
                        </div>
                    )}
                    <div className="card-footer">
                        <LikeButton post={post}/>
                        <div className="comment-icon">
                            <img onClick={() => setShowComments(!showComments)} src="./img/icons/message1.svg" alt="comment"/>
                            <span>{post.comments.length}</span>
                        </div>
                    </div>
                    {showComments && <CardComments post={post} />}
                </div>
                </>
            )}
        </li>
    );
};

export default Card;