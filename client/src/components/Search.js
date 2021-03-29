import React, { useState } from 'react';
import { isEmpty } from './Utils';
import axios from 'axios';
import FollowHandler from './Profil/FollowHandler';
import { NavLink } from 'react-router-dom';


const Search = () => {

    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);
    const [searchPopup, setSearchPopup] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();

        if(search) {
            await axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}api/user/search?p=` + search,
            })
            .then((res) => {
                setResult(res.data)
                
            }).catch((err) => {
                console.log(err);
            })
        }
        setSearchPopup(true)
    }
    
    
    return (
        <div className="search-container">
            <form action="" onSubmit={handleSearch} id="search-form">
                <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Rechercher quelqu'un..."/>
                <input type="submit" value="Rechercher" onClick={() => setSearchPopup(true)}/>
                <div className="search error"></div>
            </form>
            {searchPopup && (
                <div className="result-container">
                    <span className="cross" onClick={() => setSearchPopup(false)}>&#10005;</span>
                    {!isEmpty(result) ? (
                        result.map((user) => {
                            return (
                                <div className="result" key={user._id}>
                                    <NavLink exact to={"/profil/" + user._id} >
                                        <div className="info-container">
                                            <img src={user.picture} alt="user"/>
                                            <p className="pseudo">{user.pseudo}</p>
                                        </div>
                                    </NavLink>
                                    <div className="follow-container">
                                        <FollowHandler type={'suggestion'} idToFollow={user._id}  />
                                    </div>
                                </div>
                            )
                        })
                    ) : <p>Aucun resultat pour : {search}</p> }
                </div>
            )}
        </div>
    );
};

export default Search;