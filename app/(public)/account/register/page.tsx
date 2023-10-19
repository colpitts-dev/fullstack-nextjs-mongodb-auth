"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

//import { usePersonService } from "_services";

export default Register;

function Register() {
  //const personService = usePersonService();

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const fields = {
    firstName: register("firstName", { required: "First Name is required" }),
    lastName: register("lastName", { required: "Last Name is required" }),
    username: register("username", { required: "Username is required" }),
    password: register("password", {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    }),
  };

  async function onSubmit(newPerson: any) {
    //await personService.register(newPerson);
  }

  return (
    <div className="card">
      <h4 className="text-4xl mb-6">Register</h4>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              {...fields.firstName}
              type="text"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">
              {errors.firstName?.message?.toString()}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              {...fields.lastName}
              type="text"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">
              {errors.lastName?.message?.toString()}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              {...fields.username}
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">
              {errors.username?.message?.toString()}
            </div>
          </div>
          <div className="mb-6">
            <label className="form-label">Password</label>
            <input
              {...fields.password}
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">
              {errors.password?.message?.toString()}
            </div>
          </div>
          <button
            disabled={formState.isSubmitting}
            className="px-7 py-3 bg-primary text-on-primary mb-2"
          >
            {formState.isSubmitting && (
              <span className="spinner-border spinner-border-sm me-1"></span>
            )}
            Register
          </button>
          <p>
            Alreadt have an account?{" "}
            <Link href="/account/login" className="underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
