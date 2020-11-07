import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import { db, timestamp } from "../../config/firebase";
import moment from "moment";
import Comments from "./Comments";

function Project({ doc, id }) {
  const { user, profileImage } = useAuth();
  const [modal, setModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [Profile, setProfile] = useState("");
  const [sendCmt, setSendCmt] = useState("");
  const [getCmt, setGetCmt] = useState("");
  const [cmtSize, setCmtSize] = useState("");
  const [LikeSize, setLikeSize] = useState("");
  const [likeUserId, setLikeUserId] = useState("")

  useEffect(() => {
    setProfile(doc.profileImage)
    const storeRef = db.collection("contents").doc(id).collection("comments")
    storeRef
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        let documents = [];
        snapshot.forEach((doc) =>
          documents.push({ ...doc.data(), id: doc.id })
        );
        setGetCmt(documents);
      });
      storeRef
      .onSnapshot((snapshot) => setCmtSize(snapshot.size));

  db.collection("contents")
      .doc(id)
      .collection("likes")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setLikeSize(snapshot.size);
        snapshot.forEach((snap) => {
          if (snap.data().likeUser == user.uid) {
            setLiked(true);
          } else {
            setLiked(false);
          }
        });
      });
      
  }, []);

  const cmtFormHandle = (e) => {
    e.preventDefault();
    db.collection("contents")
      .doc(id)
      .collection("comments")
      .add({
        comment: sendCmt,
        userid: user.uid,
        displayName: user.displayName,
        profileImage,
        createdAt: timestamp(),
      })
      .then(() => setSendCmt(""))
      .catch((err) => console.log(err));
  };
  const likeHandle = (e) => {
    e.preventDefault();
    const likeRef = db.collection("contents").doc(id).collection("likes");
    likeRef
      .doc(user.uid)
      .onSnapshot(doc => {
        if (doc.exists) {
          console.log("Already Liked")
        } else {
          db.collection("contents")
            .doc(id)
            .collection("likes")
            .doc(user.uid)
            .set({
              likeUser: user.uid,
              createdAt: timestamp(),
            })
            .then(() => {
              console.log("Liked")
              setLiked(true);
            }
              )
            .catch((err) => console.log(err));
        }
      })
  };
  return (
    <div className="project"> 
      <div className="profile">
        <img src={Profile} alt="user_profile" />
        <div>
          <span>{doc.displayName}</span> <br />
          <small>
            {" "}
            {doc.createdAt ? (
              <small>
                {moment(doc.createdAt.toDate().toString()).calendar()}
              </small>
            ) : (
              ""
            )}
          </small>
        </div>
      </div>
      <div className="content">
        <div>
          {doc.content}
          <span
            onClick={(e) => {
              if (e.target == e.currentTarget) {
                setModal(!modal);
              }
            }}
          >
            Read More
          </span>
          <div className="total_count">
            <div className="likecount">
              <div>{LikeSize}</div> have liked this post.
            </div>
            <div className="likecount">
              <div>{cmtSize}</div> have commeted this post.
            </div>
          </div>

          <div className="reaction">
            <form onSubmit={likeHandle}>
              <p>{liked ? "you have liked this post" : ""}</p>
              <button className= {liked ? "likebtn active" : "likebtn"}>{liked ? "Liked" : "Like"}</button>
            </form>
            <button onClick={() => setModal(!modal)}>Comment</button>
          </div>
        </div>
      </div>
      {modal && (
        <div className="project-detail">
          <div
            className="overlay"
            onClick={(e) => {
              if (e.target == e.currentTarget) {
                setModal(!modal);
              }
            }}
          >
            <motion.div
              className="modal"
              initial={{ y: "-100vh", opacity: 0 }}
              animate={{ y: "100px", opacity: 1 }}
            >
              <motion.div className="detail">
                <div className="content">
                  <div className="profile">
                    <img src={Profile} alt="profile" />
                    <p>
                      {doc.displayName}
                      <br />
                      <small>
                        {doc.createdAt ? (
                          <small>
                            {moment(
                              doc.createdAt.toDate().toString()
                            ).calendar()}
                          </small>
                        ) : (
                          ""
                        )}
                      </small>
                    </p>
                  </div>
                  <h2 align="center">{doc.title}</h2>
                  <p>{doc.content}</p>
                </div>
                <div className="cmt-box">
                  <div>
                    <form onSubmit={likeHandle}>
                      
                      <button className="likebtn">Like</button>
                    </form>

                    <div>
                      <span>{LikeSize}</span> have liked this post.
                    </div>
                  </div>
                  <div className="people-cmt">
                    {getCmt &&
                      getCmt.map((cmt) => {
                        return <Comments cmt={cmt} key={doc.id} id={id} />;
                      })}
                  </div>
                  <motion.form className="cmt-form" onSubmit={cmtFormHandle}>
                    <div>
                      <input
                        type="text"
                        placeholder="Comment"
                        onChange={(e) => setSendCmt(e.target.value)}
                      />
                    </div>
                    <div>
                      <button>Send</button>
                    </div>
                  </motion.form>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Project;
