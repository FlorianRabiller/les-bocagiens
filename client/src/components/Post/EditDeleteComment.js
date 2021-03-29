import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, editComment } from '../../actions/post.actions';
import { UidContext } from '../AppContext';

const EditDeleteComment = ({comment, postId}) => {

    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('');
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    
    const handleEdit = (e) => {
        e.preventDefault();

        if(text) {
            dispatch(editComment(postId, comment._id, text));
            setText('');
            setEdit(false);
        }
    }

    const handleDelete = () => {
        dispatch(deleteComment(postId, comment._id))
    }

    useEffect(() => {
        const checkAuthor = () => {
            if(uid === comment.commenterId) {
                setIsAuthor(true)
            }
        }
        checkAuthor();

    }, [uid, comment.commenterId])

    return (
        <div className="edit-comment">
            {isAuthor && edit === false && (
                <>
                <span onClick={() => {
                    if(window.confirm("Supprimer le commentaire ?")) {
                        handleDelete();
                    }
                }}>
                    <i className="fas fa-trash"></i>
                </span>
                <span onClick={() => setEdit(!edit)}>
                    <i className="fas fa-edit"></i>
                </span>
                </>
            )}
            {isAuthor && edit && (
                <form action="" onSubmit={handleEdit} className="edit-comment-form">
                    <br/>
                    <input type="text" name="text" onChange={(e) => setText(e.target.value)} defaultValue={comment.text}/>
                    <br/>
                    <input type="submit" value="Valider"/>
                    <label htmlFor="text" onClick={() => setEdit(!edit)}>Annuler</label>
                </form>
            )}
        </div>
    );
};

export default EditDeleteComment;