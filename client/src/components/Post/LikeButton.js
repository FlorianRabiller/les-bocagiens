import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost } from '../../actions/post.actions';
import { UidContext } from '../AppContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'

const LikeButton = ({ post }) => {

    const [liked, setliked] = useState(false);
    const [likeImg, setLikeImg] = useState('./img/icons/heart.svg');

    const uid = useContext(UidContext);
    
    const usersData = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();

    const like = () => {
        dispatch(likePost(post._id, uid))
        setliked(true)
    }

    const unlike = () => {
        dispatch(unlikePost(post._id, uid))
        setliked(false)
    }

    useEffect(() => {
        if(post.likers.includes(uid)) setliked(true)
        else setliked(false)
    }, [uid, post.likers, liked])

    return (
        <div className="like-container">
            {liked === false && (
                <img src={likeImg} onClick={like} alt="like" 
                onMouseOver={() => setLikeImg('./img/gif/heart.gif')} 
                onMouseOut={() => setLikeImg('./img/icons/heart.svg')} />
            )}
            {liked && (
                <img src="./img/icons/heart-filled.svg" alt="like" onClick={unlike} />
            )}
            <span>{post.likers.length}</span>
            <Popup trigger={<span>{post.likers.length}</span>} position={['top center']} closeOnDocumentClick contentStyle={{width: "300px"}}>
                <div className="likers-container">
                    <h4>Aimé{post.likers.length > 1 ? 's' : ''} par :</h4>
                    <ul>
                        {/* eslint-disable-next-line */}
                        {post.likers.map((liker) => {
                            for(let i=0; i < usersData.length; i++) {
                                if(usersData[i]._id === liker) {
                                    return (
                                        <li key={usersData[i]._id}>
                                            <img src={usersData[i].picture} alt="liker"/>
                                            {usersData[i].pseudo}
                                        </li>
                                    )
                                } 
                            }
                        })}
                    </ul> 
                </div>
            </Popup>    
        </div>
    );
};

export default LikeButton;