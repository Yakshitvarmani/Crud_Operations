import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "../Axios";
import { toast } from "react-toastify";

const DeletePost = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let [state, setState] = useState({
    loading: false,
    title: "",
    author: "",
  });
  let { title, author, loading } = state;

  useEffect(() => {
    let fetchData = async () => {
      let deleteData = await Axios.get(`/posts/${id}`);
      console.log(deleteData.data);
    };
    fetchData();
  }, [id]);

  let handleDelete = async e => {
    Axios.delete(`/posts/${id}`);
    navigate("/");
  };
  return (
    <div className="removeBlock">
      <aside>
        <div className="float-left">
          <h2 className="h4">
            {title}
            <span className="text-success">{author}</span>
          </h2>
        </div>
        <div className="float-right">
          <button btn btn-danger onClick={handleDelete}>
            Delete
          </button>
        </div>
      </aside>
      <h1>delete post</h1>
    </div>
  );
};

export default DeletePost;
