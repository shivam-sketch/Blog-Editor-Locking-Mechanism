import React from "react";
import { useAuth } from "../hooks/useAuth";
import api from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Home = () => {
  const { user, logout } = useAuth();

  const { data: blogs } = useQuery({
    queryKey: ["get-blogs"],
    queryFn: () => api.get("blog"),
    select: (res) => res.data.data,
  });

  return (
    <>
      <main className="content">
        <a id="btn-toggle" href="#" className="sidebar-toggler break-point-sm">
          <i className="ri-menu-line ri-xl"></i>
        </a>
        <div className="container mt-5 px-44">
          <div className="row">
            {blogs?.map((blog) => (
              <div className="col-lg-4" key={blog?._id}>
                <div className="card border-0 mb-3">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-9">
                        <Link to={`blog/${blog?._id}`}>
                          <a>
                            <h3 className="">{blog?.title}</h3>
                          </a>
                        </Link>

                        <Link to={`blog/edit/${blog?._id}`}>
                          {" "}
                          <Button>Edit</Button>
                        </Link>
                        <p>
                          Last edited by: <b>{blog?.lastEditedBy?.name}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
