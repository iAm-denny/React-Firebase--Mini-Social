import React from 'react'
import { Link } from 'react-router-dom'
import { auth, facebookProvider, googleProvider } from '../../config/firebase'

function SigninOption(props) {
    const signinWithGoogle = () => {
        auth.signInWithPopup(googleProvider)
        .then(() => props.history.push("/home"))
        .catch(err => console.log(err))
    }
    const signinWithFacebook = () => {
        auth.signInWithPopup(facebookProvider)
            .then(() => props.history.push("/home"))
            .catch(err => console.log(err))
    }
    
    return (
        <div className="signInOptin">
            <h3>Connect with People!</h3>
            <div className="google">
                <button onClick={signinWithGoogle}>Google</button>
            </div>
            <div className="facebook">
                <button onClick={signinWithFacebook} >Facebook</button>
            </div>
            <div className="own_account">
                <Link to="/signin"><button>Account</button></Link>
            </div>
            <Link to="/signup">Don't have an account?</Link><br/>
            <Link to="/forgotpassword">Forgot Password?</Link>
        </div>
    )
}

export default SigninOption
