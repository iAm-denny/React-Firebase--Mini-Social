import { useState } from "react";
import { db, auth, storage, timestamp } from "../../config/firebase";

function Signup(props) {
  const [signupForm, setSignupForm] = useState({
    displayName: "",
    email: "",
    password: "",
    conpassword: "",
  });
  const [image, setImage] = useState(null)
  const [displayError, setDisplayError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const changeHandle = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.id]: e.target.value,
    });
  };
  const patterns = {
    display: /[\w]{3,}/,
    email: /[\w]{3,}@[a-z,A-Z]{3,}\.[a-z,A-Z]{2,}(\.[a-z,A-Z]{2,})?/,
    password: /[a-z,A-Z\d]{5,}(-@)?/,
  };
  const submitForm = (e) => {
    e.preventDefault();
    if (!patterns.display.test(signupForm.displayName)) {
      setDisplayError("Enter Display Name at least 3 characters");

    }
    else if (!patterns.email.test(signupForm.email)) {
        setEmailError("Enter Validate Email");
 
    }
    else if (!patterns.password.test(signupForm.password)) {
      setPasswordError("Enter password at least 5 characters");
    }
    else if (signupForm.password != signupForm.conpassword) {
        setPasswordError("Password does not same");       
      }
      else {
        auth.createUserWithEmailAndPassword(signupForm.email, signupForm.password) 
            .then(user => {
                var user = auth.currentUser
                user.updateProfile({
                    displayName: signupForm.displayName
                })
                .then(() => {
                    storage.ref(`/user/profile/${user.uid}`).put(image)
                    .then(async (img) =>{
                      const image =  await storage.ref(`/user/profile/${user.uid}`).getDownloadURL()
                      const createdAt =timestamp()
                      db.collection('userProfile').doc(user.uid).set({ image, createdAt})
                      .then(() => {
                        props.history.push("/home")
                      })
                    })
                })
            })
      }

  };
  return (
    <div className="signup">
      <form onSubmit={submitForm}>
        <h3>Let's get Started</h3>
        {displayError && <p className="error"> {displayError} </p>}
        {emailError && <p className="error"> {emailError} </p>}
        {passwordError && <p className="error"> {passwordError} </p>}
        <div>
          <input
            type="text"
            placeholder="Display Name"
            id="displayName"
            onChange={changeHandle}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            id="email"
            onChange={changeHandle}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={changeHandle}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            id="conpassword"
            onChange={changeHandle}
          />
        </div>
        <div className="profile-container">
        <label for="profile">Selcet Profile Image</label>
        <input type="file" id="profile"  onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button>Sign up</button>
      </form>
    </div>
  );
}

export default Signup;
