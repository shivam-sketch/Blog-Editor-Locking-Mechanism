import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeLayout from "./component/Layout";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import EditBlog from "./pages/EditBlog";

function App() {
  //   useEffect(() => {
  //     window.open("/");
  //   });

  return (
    <>
      <Routes>
        <Route element={<Register />} path="/register" />
        <Route element={<Login />} path="/login" />

        <Route element={<HomeLayout />}>
          <Route element={<Home />} path="/" />
          <Route element={<BlogDetails />} path="/blog/:id" />
          <Route element={<EditBlog />} path="/blog/edit/:id" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
