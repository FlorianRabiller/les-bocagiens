import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from '../../actions/user.actions';

const UploadImg = () => {

    const [file, setFile] = useState('');
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);

    const handlePicture = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', userData.pseudo);
        data.append('userId', userData._id);
        data.append('file', file);

        dispatch(uploadPicture(data, userData._id));
    }

    return (
        <form action="" onSubmit={handlePicture} className="upload-pic">
            <div className="input-file-container">
                <label htmlFor="file">Changer photo de profil</label>
                <input type="file" id='file' accept='.jpg, jpeg, .png' className="input-file" onChange={(e) => setFile(e.target.files[0])}/>
            </div>
            <br/>
            <input type="submit" value='Envoyer'/>
        </form>
    );
};

export default UploadImg;