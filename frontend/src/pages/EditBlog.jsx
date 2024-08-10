import { useMutation, useQuery } from "@tanstack/react-query";
import cogoToast from "cogo-toast";
import React from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import api from "../lib/api";

const EditBlog = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const { id } = params;
  const { data: blog, refetch } = useQuery({
    queryKey: ["get-blogs-by-id", id],
    queryFn: () => api.get(`blog/${id}`),
    select: (res) => res.data.data,
  });

  useEffect(() => {
    if (blog) {
      setValue("title", blog?.title);
      setValue("content", blog?.content);
    }
  }, [blog]);

  const { mutate } = useMutation({
    mutationFn: (data) => api.put("blog", data),

    onError: (error, variables, context) => {
      // An error happened!
      console.log(error);
      cogoToast.error(`${error.response.data.message}`);
    },
    onSuccess: (data, variables, context) => {
      if (data.data.status == 200) {
        cogoToast.success("success");
        refetch();
      }
    },
  });

  const onSubmit = (data) => {
    data["id"] = id;
    mutate(data);
  };

  return (
    <div className="mx-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="title" className="form-label fw-bolder text-label">
            Title
          </label>
          <div>
            <input
              id="title"
              type="text"
              name="title"
              {...register("title", {
                required: "Title is required",
              })}
            />
          </div>
          {errors?.title && (
            <p style={{ color: "red" }} role="alert">
              {errors?.title.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="form-label fw-bolder text-label">
            Content
          </label>
          <div>
            <textarea
              id="content"
              name="content"
              rows={5}
              {...register("content", {
                required: "Content is required",
              })}
            />
          </div>
          {errors?.content && (
            <p style={{ color: "red" }} role="alert">
              {errors?.content.message}
            </p>
          )}
        </div>
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};

export default EditBlog;
