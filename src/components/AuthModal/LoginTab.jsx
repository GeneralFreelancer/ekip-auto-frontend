import React, { useState, useEffect } from "react";
import s from "./AuthModal.module.scss";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectedUser } from "../../redux/features/userSlice";

const LoginTab = (props) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });
  const [loginErrors, setloginErrors] = useState({ email: "", password: "" });
  const [errorLoginMessage, setErrorLoginMessage] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector(selectedUser);

  useEffect(() => {
    if (errorLoginMessage === "") {
      props.onSubmit(true);
    }
  }, [errorLoginMessage, props]);

  // Admin
  useEffect(() => {
    if (user.roles.includes("ADMIN")) {
      localStorage.setItem("role", "admin");
    } else if (user.roles.includes("USER")) {
      localStorage.setItem("role", "user");
    }
  }, [user.roles]);
  // Admin end


  // const resendVerificationEmail = async () => {
  //   try {
  //     await axios.post("http://localhost:5502/user/verification-email", {
  //       email: user.userdata.email,
  //     });
  //     console.log("Verification email sent successfully");
  //   } catch (error) {
  //     console.log("Error resending verification email:", error.message);
  //   }
  // };

  const validateLoginForm = (name, value) => {
    let errors = { ...loginErrors };
    switch (name) {
      case "email":
        errors.email = isValidEmail(value);
        break;
      case "password":
        errors.password = isValidPassword(value);
        break;
      default:
        break;
    }
    setloginErrors(errors);
  };

  function isValidEmail(value) {
    if (!value) {
      return "Введіть Email";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      return "Email введено неправильно";
    }
  }

  function isValidPassword(value) {
    if (!value) {
      return "Введіть пароль";
    } else if (value.length < 6) {
      return "Пароль повинен містити не менше 6 символів";
    }
  }

  const changeLoginHandler = (event) => {
    const { name, value, checked } = event.target;
    const fieldValue = name === "rememberMe" ? checked : value;
    setLoginForm((prevState) => ({ ...prevState, [name]: fieldValue }));
    validateLoginForm(name, fieldValue);
  };

  const submitLoginHandler = async (e) => {
    e.preventDefault();

    if (loginForm.email && loginForm.password) {
      try {
        const response = await axios.post("http://localhost:5502/auth/login", {
          ...loginForm,
        });

        dispatch(
          login({
            ...response.data,
            rememberMe: loginForm.rememberMe,
          })
        );
        setErrorLoginMessage("");
      } catch (error) {
        if (error.response) {
          setErrorLoginMessage(error.response.data.message);
        } else {
          console.log("Error:", error.message);
        }
      }
    } else if (!loginForm.email) {
      validateLoginForm("email", null);
    } else if (!loginForm.password) {
      validateLoginForm("password", null);
    }
  };

  return (
    <>
      <form>
        <div className={s.form_content}>
          <div className={s.form_group}>
            <label>Введіть Email:</label>
            <input
              type="email"
              name="email"
              className={`${s.form_input} ${
                loginErrors.email ? s.input_error : ""
              }`}
              value={loginForm.email}
              onChange={changeLoginHandler}
              placeholder="Email..."
            />
            {loginErrors.email && (
              <div className={s.error_message}>{loginErrors.email}</div>
            )}
          </div>
          <div className={s.form_group}>
            <label>Введіть пароль:</label>
            <input
              type="password"
              name="password"
              className={`${s.form_input} ${
                loginErrors.password ? s.input_error : ""
              }`}
              value={loginForm.password}
              onChange={changeLoginHandler}
              placeholder="Пароль..."
            />
            {loginErrors.password && (
              <div className={s.error_message}>{loginErrors.password}</div>
            )}
          </div>
          <div className={s.form_group}>
            <label className={s.custom_checkbox}>
              <input
                type="checkbox"
                name="rememberMe"
                checked={loginForm.rememberMe}
                onChange={changeLoginHandler}
              />
              <span className={s.checkmark}></span>
              <p>- Запам'ятати мене</p>
            </label>
          </div>
          <div className={s.form_submit_btn}>
            <button type="submit" onClick={submitLoginHandler}>
              Увійти
            </button>
            {errorLoginMessage ? (
              <p className={s.error_message}>{errorLoginMessage}</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginTab;
