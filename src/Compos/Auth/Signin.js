import { useState } from 'react'
import { auth, facebookProvider, googleProvider } from '../../config/firebase'
import { Link } from 'react-router-dom'

function Signin(props) {
    const [signinForm, setSignInForm] = useState({
        email: "",
        password: ""
    })
    const [error , setError ] = useState("")
    const changeHandle = e => {
        setSignInForm({
            ...signinForm,
            [e.target.id]: e.target.value
        })
    }
    const loginHandle = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(signinForm.email, signinForm.password)
            .then(() => props.history.push('/home'))
            .catch(err => {
                console.log(err.message)
                if(err.message.includes("The email address is badly formatted.")) {
                    setError("Enter the validation Email")
                }
                else if (err.message.includes("The password is invalid or the user does not have a password.")) {
                    setError("Enter correct Password")
                }
            })
    }

    return (
        <div className="signIn">
            <form onSubmit={loginHandle}>
                <h3>Sign in</h3>
                { error && <p className="error">{error}</p> }
                <div>
                    <input type='text' placeholder="Email" id="email" required onChange={changeHandle} />
                </div>
                <div>
                    <input type='password' placeholder="Password" id="password" required onChange={changeHandle} />
                </div>
                <button>Sign in</button>
            </form>
            <Link to="/forgotpassword">Forgot Password?</Link>
        </div>
    )
}

export default Signin
