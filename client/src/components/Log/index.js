import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Log = ({type}) => {

    const [signUpModal, setSignUpModal] = useState(false);
    const [signInModal, setSignInModal] = useState(true);

    const handleModals = (e) => {
        if(e.target.id === 'register') {
            setSignInModal(false);
            setSignUpModal(true);
        } else if (e.target.id === 'login') {
            setSignInModal(true);
            setSignUpModal(false);
        }
    }

    return (
        <div className="connection-form">
            <div className="form-container">
                <div className="user">
                    {signUpModal && <SignUpForm />}
                    {signInModal && <SignInForm />}
                    {signUpModal ? (
                        <div className="btn-container">
                            <p>Déjà inscris ?<span onClick={handleModals} id='login'> Se connecter</span></p>
                        </div>
                    ) : (
                        <div className="btn-container">
                            <p>Pas encore de compte ?<span onClick={handleModals} id='register'> S'inscrire</span></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Log;