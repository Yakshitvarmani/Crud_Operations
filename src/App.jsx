import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreatePosts from "./Components/CreatePosts";
// import useFetch from "./HOOKS/useFetch";
import Home from "./Pages/Home";
import Navbar from "./Pages/Navbar";
import EditPost from "./Components/EditPost";
import DeletePost from "./Components/DeletePost";

const App = () => {
  return (
    <Router>
      <section>
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePosts />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
            <Route path="/delete-post/:id" element={<DeletePost />} />
          </Routes>
        </main>
        <footer></footer>
      </section>
    </Router>
  );
};

export default App;
