import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "../Axios";
import { toast } from "react-toastify";

const EditPost = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let [state, setState] = useState({
    loading: false,
    title: "",
    author: "",
  });
  let { title, author, loading } = state;
  useEffect(() => {
    let fetchPost = async () => {
      let existData = await Axios.get(`/posts/${id}`);
      //   console.log(existData.data);
      setState(existData.data);
    };
    fetchPost();
  }, [id]);

  let handleChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setState({ loading: true });
      let payLoad = { title, author };
      await Axios.put(`/posts/${id}`, payLoad);
      navigator("/");
    } catch (error) {
      toast.error(error.message);
    }
    setState({ loading: false });
  };
  return (
    <section id="postBlock" className="col-mid-4 mx-auto bg-white p-4 mt-4">
      <article>
        <h1 className="h4 font-weight-bold text-success text-uppercase border-bottom">
          Update Post
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              title
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="enter title"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Author
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="enter author"
              name="author"
              value={author}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {loading === true ? "loading..." : "update"}
          </button>
        </form>
      </article>
    </section>
  );
};

export default EditPost;
