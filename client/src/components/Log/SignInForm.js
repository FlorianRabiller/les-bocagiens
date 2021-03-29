import React, { useState } from 'react';
import axios from 'axios';


const SignInForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            data: {
                email,
                password
            }
        }).then((res) => {
            if(res.data.errors) {
                emailError.innerHTML = res.data.errors.email;
                passwordError.innerHTML = res.data.errors.password;
            } else {
                window.location = '/';
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <div className="imgBox"><img src="./img/signIn.jpeg" alt=""/></div>
            <div className="formBox">
                <form action="" onSubmit={handleLogin} id="sign-up-form">
                    <h2>Connexion</h2>
                    <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email"/>
                    <div className="email error"></div>
                    <br/>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Mot de passe"/>
                    <div className="password error"></div>
                    <br/>
                    <input type="submit" value="Se connecter"/>
                </form>
            </div>
        </>
    );
};

export default SignInForm;