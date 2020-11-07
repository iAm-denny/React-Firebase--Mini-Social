import { createRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Project from "./Project";
import useAuth from "../hooks/useAuth";
import { db, timestamp } from '../../config/firebase'
import useGetData from "../hooks/useGetData";


function Home() {
  const [modal, setModal] = useState(false);
  const { user, profileImage } = useAuth();
  const { docs } = useGetData()
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const ref = createRef();

  const showModal = (e) => {
    setModal(!modal);
  };

  const submitForm = (e) => {
    e.preventDefault();
    db.collection('contents').add({
      userid: ref.current.value,
      displayName: user.displayName,
      title,
      content,
      createdAt: timestamp(),
      profileImage
    })
    .then(() => setModal(!modal))
    .catch(err => console.log(err))
  };
  return (
    <div className="home">
      <h3>Note - if you are already haeve liked, like count won't increase.:D</h3>
      <div className="container">
        <button onClick={showModal}>
          <i className="fas fa-pen"></i>
        </button>
      </div>
      {modal && (
        <motion.div className="modal">
          <motion.div className="overlay" onClick={showModal}></motion.div>
          <motion.form
            onSubmit={submitForm}
            initial={{ y: "-100vh", x: "-20vw" }}
            animate={{ y: "0vh", x: "-20vw" }}
            className="home-form"
          >
            <div className="profile">
              <img
                src={profileImage}
                alt="fake-profile"
                width="60px"
                height="60px"
                style={{ borderRadius: "50%" }}
              />
              <p>{user.displayName}</p>
            </div>
            <div className="text">
              <input type="hidden" ref={ref} defaultValue={user.uid} />
              <input type="text" onChange={e => setTitle(e.target.value)} id="title"  autoFocus placeholder="Title"/>
              <textarea
                placeholder="Create your post"
                onChange={(e) => setContent(e.target.value)}
                id="content"
    
              />
            </div>
            <div className="btn">
              <button>Post</button>
            </div>
          </motion.form>
        </motion.div>
      )}
      {
        docs && docs.map(doc => {
          return <Project doc={doc} key={doc.id} id={doc.id}/>
        } )
      }
    </div>
  );
}

export default Home;
