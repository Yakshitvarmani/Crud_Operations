import React, { Fragment, useEffect, useState } from "react";
import Axios from "../Axios";
import { Link, useParams } from "react-router-dom";

const Home = () => {
  let [state, setState] = useState([]);
  let [loading, setLaoding] = useState(false);
  let [searchTerm, setSearchTerm] = useState("");
  let { id } = useParams();
  useEffect(() => {
    let fetchData = async () => {
      let payload = await Axios.get("/posts");
      setState(payload.data);
    };
    fetchData();
  }, [id]);

  let mapData = state
    .filter(val => {
      if (searchTerm === "") {
        return val;
      } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val;
      }
    })
    .map(x => {
      return (
        <Fragment>
          <tr>
            <td>{x.id}</td>
            <td>{x.title}</td>
            <td>{x.author}</td>
            <td className="btn-group w-100">
              <div className="btn-group w-100">
                <Link
                  className="btn btn-outline-primary"
                  to={`/edit-post/${x.id}`}
                >
                  edit
                </Link>
                <Link
                  className="btn btn-outline-danger"
                  to={`/delete-post/${x.id}`}
                >
                  Delete
                </Link>
              </div>
            </td>
          </tr>
        </Fragment>
      );
    });
  return (
    <div>
      {loading ? (
        "loading..."
      ) : (
        <Fragment>
          <div className="container my-4 btn-lite">
            <input
              type="search"
              name="searchTerm"
              placeholder="just Search..."
              className="form-control"
              onChange={e => {
                setSearchTerm(e.target.value);
              }}
              value={searchTerm}
            />
          </div>
          <div className="container my-4 bg-light p-4">
            <table className="table table-bordered table-hover table-light">
              <thead className="table-dark">
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>{mapData}</tbody>
            </table>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Home;
