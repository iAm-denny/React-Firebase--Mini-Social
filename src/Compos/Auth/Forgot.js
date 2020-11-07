import {useState} from 'react'
import {auth} from '../../config/firebase'

function Forgot() {
    const [ email, setEmail ] = useState("")
    const resetPassword = e => {
        e.preventDefault();
        auth.sendPasswordResetEmail(email)
            .then(() => alert("Send to your Email"))
            .catch((err) => {
                if(err.message.includes("endPasswordResetEmail failed")) {
                    alert("Failed to send Email")
                }else {
                    alert("Something went wrong ")
                }
            })
    }
    return (
        <div className="signIn">
            <form onSubmit={resetPassword} style={{height: "300px"}}>
                <h3>Reset Password</h3>
            <div>
                    <input type='text' placeholder="Email" id="email" required onChange={e => setEmail(e.target.value)} />
                </div>
                <button>Send Email</button>
            </form>
    </div>
    )
}

export default Forgot
