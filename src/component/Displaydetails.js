import axios from "axios";
import React from "react";
import { useState } from "react";
import "./style.css";

function Displaydetails(props) {
  console.log(props);
  const [description, setdescription] = useState("none");
  let [comments, setcomments] = useState([]);
  let [commentshow, setcommentshow] = useState(false);

  const handledescription = (e) => {
    setdescription(e.target.value);
  };

  const addcomment = async (Obj) => {
    let value = {
      title: Obj.title,
      comment: [
        {
          descriptions: description,
        },
      ],
    };
    let res = await axios.post("http://localhost:5000/user/addcomments", value);
    setdescription("");
  };

  const showcomments = async () => {
    let res = await axios.get(
      `http://localhost:5000/user/getcomments/${props.Obj.title}`
    );
    setcomments(res.data.payload);
    setcommentshow(true);
  };

  const closecomment = () => {
    setcommentshow(false);
  };

  return (
    <div>
      <div className="card mt-3 p-2">
        <div className="row">
          <div className="col">
            <img width="200px" height="200px" src={props.Obj.cover} />
          </div>
          <div className="col">
            <p className="card-title h3 fw-bold">{props.Obj.title}</p>
            <div className="card-body">
              <p>
                <span className="fw-bold">Author</span> - {props.Obj.author}
              </p>
              <p>
                <span className="fw-bold">Genre</span> - {props.Obj.genre}
              </p>
              <p>
                <span className="fw-bold">Description</span> -{" "}
                {props.Obj.description}
              </p>
              <p className="fw-bold">Publication - {props.Obj.year}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-3 mt-3">
        <div className="form-floating">
          <textarea
            className="form-control"
            onChange={handledescription}
            placeholder="Leave a comment here"
            id="floatingTextarea"
          ></textarea>
          <label htmlFor="floatingTextarea" className="text-secondary">
            Comment Here
          </label>
        </div>
        <div className="mt-2">
          <button
            type="submit"
            className="btn btn-success float-end"
            onClick={() => addcomment(props.Obj)}
          >
            Comment
          </button>
        </div>
      </div>
      <div className="card p-3 mt-3">
        <div className="mt-3">
          <button
            className="btn btn-outline-primary float-end"
            onClick={() => showcomments()}
          >
            Show Comments
          </button>
        </div>

        {commentshow && (
          <div>
            <p className="h3 mt-3">Comments</p>
            {comments.map((Obj, index) => (
              <div>
                <p>{Obj.descriptions}</p>
              </div>
            ))}
            <div>
              <button
                className="btn btn-outline-danger fw-bold float-end"
                onClick={() => closecomment()}
              >
                close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Displaydetails;
