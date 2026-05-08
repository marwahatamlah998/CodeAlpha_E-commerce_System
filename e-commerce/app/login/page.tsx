"use client";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { useState, useEffect } from "react";
import "./login.css";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data: session } = useSession();
  console.log("session" , session)
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showErrorMessage, seteshowErrorMessage] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      password: form.password,
      email: form.email,
      callbackUrl: "/home",
    });

    if (result?.ok) {
      console.log("result: ", result);

      router.push("/home");
    } else {
      seteshowErrorMessage(true);
      if (result?.error) {
        setErrorMessage(result.error);
        setTimeout(() => {
          seteshowErrorMessage(false);
        }, 2000);
      }
    }
  };


  useEffect(() => {
    if (session) router.push("/home");
  }, [session, router]);

  return (
    <section className="loginPage">
      <div className="containerInLogin">
        <div className="titleLogin">Login</div>
        <div className="content">
          <form onSubmit={onSubmit}>
            <div className="user-detailsInLogin">
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="button">
              <input type="submit" value="Login" />
            </div>
            <div className="signup-link">
              Not a member? <a href="register">Register</a>
            </div>
            <div>
              {showErrorMessage && (
                <div className="errorMessage">{errorMessage}</div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
