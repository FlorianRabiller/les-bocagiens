import React, { useState } from 'react';
import axios from 'axios';
import SignInForm from './SignInForm';

const SignUpForm = () => {

    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        const pseudoError = document.querySelector('.pseudo.error');
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const passwordConfirmError = document.querySelector('.password-confirm.error');

        passwordConfirmError.innerHTML = '';

        if(password !== controlPassword) {
            if(password !== controlPassword) {
                passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
            }
        } else {
            await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                data: {
                    pseudo,
                    email,
                    password
                }
            }).then((res) => {
                if(res.data.errors) {
                    pseudoError.innerHTML = res.data.errors.pseudo;
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    setFormSubmit(true);
                }
            }).catch((err) => console.log(err));
        }
    }

    return (
        <>
        {formSubmit ? (
            <>
                <SignInForm />
                <div className="signup-succeed">
                    <h4 className="success">Enregistrement réussi, veuillez-vous connecter</h4>
                </div>
            </>
        ) : (
            <>
                <div className="imgBox"><img src="./img/signUp.jpeg" alt=""/></div>
                <div className="formBox">
                    <form action="" onSubmit={handleRegister} id="sign-up-form">
                        <h2>Inscription</h2>
                        <input type="text" name="pseudo" id="pseudo" onChange={(e) => setPseudo(e.target.value)} value={pseudo} placeholder="Pseudo"/>
                        <div className="pseudo error"></div>
                        <br/>
                        <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email"/>
                        <div className="email error"></div>
                        <br/>
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Mot de passe"/>
                        <div className="password error"></div>
                        <br/>
                        <input type="password" name="password" id="password-conf" onChange={(e) => setControlPassword(e.target.value)} value={controlPassword} placeholder="Confirmer mot de passe"/>
                        <div className="password-confirm error"></div>
                        <br/>
                        <input type="submit" value="Valider inscription" />
                    </form>
                </div>
            </>
        )}
        </>
    );
};

export default SignUpForm;