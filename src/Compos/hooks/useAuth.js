import {useEffect, useState} from 'react'
import { auth, db } from '../../config/firebase'
import  { Redirect } from 'react-router-dom'

function useStore() {
    const [user, setUser] = useState("")
    const [ profileImage, setProfileImage ] = useState("")
    const [userLoggedIn, setUserLoggedIn ] = useState(false)
  
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
                user.providerData.forEach(function(providerData) {
                    console.log("Signed in with "+providerData.providerId);
                    if(providerData.providerId == 'google.com') {
                        console.log(providerData)
                        setUser(providerData)
                        setProfileImage(providerData.photoURL)
                        setUserLoggedIn(true)
                    }else if(providerData.providerId == 'facebook.com') {
                        console.log(providerData)
                        setUser(providerData)
                        setProfileImage(providerData.photoURL)
                        setUserLoggedIn(true)
                    }
                    else {
                        setUser(user)
                        setUserLoggedIn(true)
                        db.collection('userProfile').doc(user.uid).get()
                            .then(doc => setProfileImage(doc.data().image))
                            .catch(err => console.log(err))
                    }
                });
            }
        })
    },[])


    return { user, profileImage, userLoggedIn }
}

export default useStore
