import {useState} from 'react'
import { auth, storage, db, timestamp } from '../../config/firebase'
import useAuth from '../hooks/useAuth'

function UserProfile(props) {
    const { user, profileImage }  = useAuth()
    const [email, setEmail] = useState("")
    const handleEmailVerify = e => {
        e.preventDefault();
        user.sendEmailVerification()
            .then(() => alert('Send Verification to your email'))
            .catch((err) => console.log(err))
    }
    const resetForm = e => {
        e.preventDefault()
        auth.sendPasswordResetEmail(user.email)
            .then(alert('Send to your Email'))
            .catch(err => alert('Something went wrong'))
    }

    const changeProfile = e => {
        e.preventDefault()
        const setImage = e.target.files[0];    
        if(setImage) {
            console.log(setImage)
                storage.ref(`/user/profile/${user.uid}`).put(setImage)
                .then(async (img) =>{
                    const image =  await storage.ref(`/user/profile/${user.uid}`).getDownloadURL()
                    const createdAt =timestamp()
                    db.collection('userProfile').doc(user.uid).set({ image, createdAt})
                    .then(() => {
                      props.history.push("/home")
                    })
                  })
        }
    }
    return (
        <div className="userprofile">
            <div className="bg">
                <h2>{user.displayName} Profile</h2>
            </div>   
            <div className="profile-detail">
                <div className="profile">
                    <img src={profileImage} width="300px" height="300px"/>
                    <form >
                        <input type='file' onChange={changeProfile} />
                        <span>Update Profile Picture</span>
                    </form>
                </div>
                <div className="detail">
                    <div>Email -  {user.email}</div>
                        <div className="verify-container">
                            <span>Your email is </span>{user.emailVerified ? <p className="verify">Verified</p> : <p className="noverify">Not Verified</p>}
                                {
                                    user.emailVerified ? "" :(
                                        <form onSubmit={handleEmailVerify}>
                                        <input type='hidden' value={user.email} onChange={e => setEmail(e.target.value)} />
                                        <button>Verify</button>
                                    </form>
                                  )}
    

                            </div>
                            <form className="reset-form" onSubmit={resetForm}>
                          <input type='hidden' value={user.email} />
                          <button>Change Passowrd</button>
                          </form>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
