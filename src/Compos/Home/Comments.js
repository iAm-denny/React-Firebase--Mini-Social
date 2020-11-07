import React, { useEffect, useState } from "react";
import moment from "moment";
import { db } from "../../config/firebase";

function Comments({ cmt, id }) {
  return (
    <div className="per-cmt">
      <div className="user">
        <img src={cmt.profileImage} />
        <div>
          {cmt.displayName} <br />
          {cmt.createdAt ? (
            <small>
              {moment(cmt.createdAt.toDate().toString()).calendar()}
            </small>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="user-cmt">
        {cmt.comment}
      </div>
    </div>
  );
}

export default Comments;
