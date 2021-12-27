import React, { useState } from "react";
import { toast } from "react-toastify";
import Axios from "../Axios";
import { useNavigate } from "react-router-dom";
const CreatePosts = () => {
  let navigator = useNavigate();
  let [state, setState] = useState({
    title: "",
    author: "",
    loading: false,
  });
  let { title, author, loading } = state;
  let handleChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setState({ loading: true });
      let payLoad = { title, author };
      await Axios.post("/posts", payLoad);
      navigator("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section id="postBlock" className="col-mid-4 mx-auto bg-white p-4 mt-4">
      <article>
        <h1 className="h4 font-weight-bold text-success text-uppercase border-bottom">
          Create Post
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
            Submit
          </button>
        </form>
      </article>
    </section>
  );
};

export default CreatePosts;
