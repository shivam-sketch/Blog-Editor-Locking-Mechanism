import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import api from "../lib/api";

const BlogDetails = () => {
  const params = useParams();
  const { id } = params;
  const { data: blog } = useQuery({
    queryKey: ["get-blogs-by-id", id],
    queryFn: () => api.get(`blog/${id}`),
    select: (res) => res.data.data,
  });

  return (
    <div>
      <main className="content">
        <a id="btn-toggle" href="#" className="sidebar-toggler break-point-sm">
          <i className="ri-menu-line ri-xl"></i>
        </a>
        <div className="container mt-5 px-44">
          <h3>{blog?.title}</h3>
          <p>{blog?.content}</p>
        </div>
      </main>
    </div>
  );
};

export default BlogDetails;
