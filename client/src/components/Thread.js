import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post.actions';
import Card from './Post/Card';
import { isEmpty } from './Utils';

const Thread = () => {
    
    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(10);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);
    const userData = useSelector((state) => state.userReducer);

    const loadMore = () => {
        if(window.innerHeight + document.documentElement.scrollTop + 50 > document.scrollingElement.scrollHeight) {
            setLoadPost(true)
        }
    }

    useEffect(() => {
        if(loadPost) {
            dispatch(getPosts(count));
            setLoadPost(false);
            setCount(count + 5);
        }

        window.addEventListener('scroll', loadMore)
        return () => window.removeEventListener('scroll', loadMore)
        // eslint-disable-next-line
    }, [loadPost, dispatch])


    return (
        <div className="thread-container">
            <ul>
                {!isEmpty(posts) && !isEmpty(userData) && 
                // eslint-disable-next-line
                    posts.map((post) => {
                        for(let i=0; i < userData.following.length; i++) {
                            if(userData.following[i] === post.posterId) {
                                return <Card post={post} key={post._id} />
                            }
                        }
                    })
                }
            </ul>
        </div>
    );
};

export default Thread;