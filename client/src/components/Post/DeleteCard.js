import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.actions';

const DeleteCard = ({postId}) => {

    const dispacth = useDispatch();

    const deleteQuote = () => {
        dispacth(deletePost(postId))
    }
    
    return (
        <div onClick={() => {
            if(window.confirm('Voulez-vous supprimer cet article ?')) {
                deleteQuote();
                console.log('test');
            }

        }}>
            <i className="fas fa-trash"></i>
        </div>
    );
};

export default DeleteCard;