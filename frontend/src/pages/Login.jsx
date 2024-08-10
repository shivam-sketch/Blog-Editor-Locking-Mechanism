import * as React from "react";

import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import cogoToast from "cogo-toast";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const { login, user } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: (data) => api.post("auth/login", data),

    onError: (error, variables, context) => {
      // An error happened!
      cogoToast.error(`${error?.response?.data?.message}`);
    },
    onSuccess: (data, variables, context) => {
      if (data.data.status == 200) {
        cogoToast.success("success");
        login(data.data.data);
      }
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    mutate(data);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 px-md-0">
          <div className="px-lg-5 px-md-3 mt-4">
            {/* <img src="/images/logo.svg" alt="logo" /> */}
          </div>

          <div className="row justify-content-center mt-4 mx-0">
            <div className="col-xl-8 col-lg-10 col-md-8">
              <div className="card border-0 common">
                <div className="card-body">
                  <h2 className="text-black">Blog Editor Login</h2>
                  <p className="text-mute my-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)}>
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
                          required: "email is required",
                        })}
                      />
                      {errors.email && (
                        <p style={{ color: "red" }} role="alert">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
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
                    <div className="clearfix mb-5">
                      <div className="float-end">
                        <a
                          onClick={() => {
                            navigate("/register");
                          }}
                          className="text-black color text-decoration-none"
                        >
                          Create An Account?{" "}
                        </a>
                      </div>
                    </div>
                    <a href="#">
                      <button
                        type="submit"
                        className="btn btn-login btn-block w-100"
                      >
                        Login
                      </button>
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* <p className="text-center">Don't have an Account? <a onClick={()=>{
            navigate('/register')
          }} className="thm-color fw-bolder text-decoration-none">Register</a></p> */}
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
