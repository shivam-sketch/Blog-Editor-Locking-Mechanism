import * as React from "react";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import cogoToast from "cogo-toast";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (data) => api.post("/auth/register", data),
    onMutate: (variables) => {
      // A mutation is about to happen!

      // Optionally return a context containing data to use when for example rolling back
      return { id: 1 };
    },

    onError: (data, error, variables, context) => {
      // An error happened!
      console.log("data error", data);
      if (data.response.data.message) {
        cogoToast.error(`${data.response.data.message}`);
      } else {
        cogoToast.error(`server error`);
      }
    },
    onSuccess: (data, variables, context) => {
      console.log("variable", variables);
      if (data.data.status == 201) {
        cogoToast.success(`${data.data.message}`);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    let body = { ...data };
    body["role"] = "User";

    mutate(body);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 px-md-0">
          <div className="px-lg-5 px-md-3 mt-4">
            <img src="/images/logo.svg" alt="logo" />
          </div>

          <div className="row justify-content-center mt-4 mx-0">
            <div className="col-xl-8 col-lg-10 col-md-8">
              <div className="card border-0 common">
                <div className="card-body">
                  <h2 className="text-black">Create Account</h2>
                  <p className="text-mute my-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                      <label
                        htmlFor="Name"
                        className="form-label fw-bolder text-label"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                        id="Name"
                        {...register("name", { required: "Name is required" })}
                      />
                      {errors.name && (
                        <p style={{ color: "red" }} role="alert">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="form-label fw-bolder text-label"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        id="email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                      />
                      {errors.email && (
                        <p style={{ color: "red" }} role="alert">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="password"
                        className="form-label fw-bolder text-label"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        id="exampleInputPassword"
                        {...register("password", {
                          required: "Password is required",
                        })}
                      />
                      {errors.password && (
                        <p style={{ color: "red" }} role="alert">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <a href="#">
                      <button
                        type="submit"
                        className="btn btn-login btn-block w-100"
                      >
                        Register
                      </button>
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center">
            Already have an Account?{" "}
            <a
              onClick={() => {
                navigate("/login");
              }}
              className="thm-color fw-bolder text-decoration-none"
            >
              Login
            </a>
          </p>
        </div>

        <div className="col-lg-6 px-0 d-None">
          <div className="bg-login">
            <img
              src="/images/login.png"
              alt="login"
              className="img-fluid w-75"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
