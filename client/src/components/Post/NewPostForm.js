import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, getPosts } from '../../actions/post.actions';
import { isEmpty, timestampParser } from '../Utils';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import Popup from 'reactjs-popup';


const NewPostForm = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [postPicture, setPostPicture] = useState(null);
    const [video, setVideo] = useState('');
    const [file, setFile] = useState();

    const [emoji, setEmoji] = useState();

    const userData = useSelector((state) => state.userReducer);
    const error = useSelector((state) => state.errorReducer.postError);
    const dispatch = useDispatch();

    const handlePost = async () => {
        if(message || postPicture || video) {
            const data = new FormData();
            data.append('posterId', userData._id);
            data.append('message', message);
            if(file) data.append('file', file);
            data.append('video', video);

            await dispatch(addPost(data));
            dispatch(getPosts());
            cancelPost();

        } else {
            alert('Veuillez entrer un message')
        }
    }


    const handlePicture = (e) => {
            setPostPicture(URL.createObjectURL(e.target.files[0]));
            setFile(e.target.files[0]);
            setVideo('');
    }

    const cancelPost = () => {
        setMessage('');
        setPostPicture('');
        setVideo('');
        setFile('');
    }

    const handleVideo = () => {
        let findlink = message.split(" ");

        for(let i = 0; i < findlink.length; i++) {
            if(findlink[i].includes('https://www.youtube') || findlink[i].includes('https://youtube')) {
                let embed = findlink[i].replace('watch?v=', 'embed/');
                setVideo(embed.split('&')[0])
                findlink.splice(i, 1)
                setMessage(findlink.join(' '))
                setPostPicture('');
            }
        }
    }

    useEffect(() => {
        if(!isEmpty(userData)) {
            setIsLoading(false)
        } else {
            setIsLoading(true)
        }

        handleVideo();
        // eslint-disable-next-line
    }, [userData, message, video])

    const addEmoji = (e) => {
        console.log(e.native);
        setEmoji(e.native)
        if(!isEmpty(emoji)) {
            setMessage(message + emoji)
        }
    }

    return (
        <div className="post-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"></i>
            ) : (
                <>
                <div className="data">
                    <p><span>{userData.following ? userData.following.length : 0}</span> Abonnement{userData.following && userData.following.length > 1 ? 's' : null}</p>
                    <p><span>{userData.followers ? userData.followers.length : 0}</span> Abonné{userData.followers && userData.followers.length > 1 ? 's' : null}</p>
                </div>
                <div className="user-info">
                    <img src={userData.picture} alt="user"/>
                </div>
                <div className="post-form">
                    <Popup trigger={<i className="far fa-grin"></i>} position={['bottom left']} closeOnDocumentClick contentStyle={{width: "362px", border: "none"}}>
                    
                        <Picker  onClick={addEmoji}/>
                    </Popup>
                    <textarea name="message" id="message" placeholder="Quoi de neuf ?" onChange={(e) => {setMessage(e.target.value)}} value={message}></textarea>
                    {message || postPicture || video.length > 20 ? (
                        <li className="card-container">
                            <div className="card-header">
                                <div className="pseudo">
                                    <img src={userData.picture} alt="user"/>
                                    <h3>{userData.pseudo}</h3>
                                </div>
                                <span>{timestampParser(Date.now())}</span>
                            </div>
                            <div className="content">
                                <p>{message}</p>
                                <img src={postPicture} alt=""/>
                                {video && (
                                    <iframe
                                        src={video}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={video}
                                    ></iframe>
                                )}
                            </div>
                        </li>
                    ) : null }
                    <div className="footer-form">
                        <div className="icon">
                            {isEmpty(video) && (
                                <>
                                <label className="custom-file-upload">
                                    <input type="file" id="file-upload" name="file" accept=".jpg, .jpeg, .png" onChange={(e) => handlePicture(e)}/>
                                    <i className="far fa-image"></i>
                                    Envoyer une image
                                </label>
                                </>
                            )}
                            {video && (
                                <button onClick={() => setVideo('')}>Supprimer la video</button>
                            )}
                        </div>
                        {!isEmpty(error.format) && <p>{error.format}</p>}
                        {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
                        {message || postPicture || video.length > 20 ? (
                        <div className="btn-send">
                            <button className="send" onClick={handlePost}>Envoyer</button>
                            <button className="cancel" onClick={cancelPost}>Annuler</button>
                        </div>
                        ) : null}
                    </div>
                </div>
                </>
            )}
        </div>
    );
};

export default NewPostForm;