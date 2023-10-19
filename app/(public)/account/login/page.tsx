"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

function Login() {
  //const authService = useAuthService();

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const fields = {
    email: register("email", { required: "Email is required" }),
    password: register("password", { required: "Password is required" }),
  };

  async function onSubmit({ email, password }: any) {
    //await authService.login(email, password);
  }

  return (
    <section>
      <h4 className="text-4xl mb-6">Login</h4>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            {...fields.email}
            type="text"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">
            {errors.email?.message?.toString()}
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
          Login
        </button>
        <p>
          Need an account?{" "}
          <Link href="/account/register" className="underline">
            Register
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
