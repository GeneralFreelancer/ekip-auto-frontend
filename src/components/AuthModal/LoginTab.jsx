import React, { useState, useEffect } from "react";
import s from "./AuthModal.module.scss";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";
import axios from "axios";

const LoginTab = (props) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });
  const [loginErrors, setloginErrors] = useState({ email: "", password: "" });
  // const [token, setToken] = useState(null);
  const dispatch = useDispatch();

  // Test
  useEffect(() => {
    if (loginForm.email === 'admin@gmail.com' && loginForm.password === '333555') {
      localStorage.setItem("role", "admin");
    } else {
      localStorage.setItem("role", "user");
    }
  }, [loginForm.email, loginForm.password]);
  // Test end

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
      dispatch(
        login({
          email: loginForm.email,
          password: loginForm.password,
          rememberMe: loginForm.rememberMe,
          role: localStorage.getItem('role'),
        })
      );
      props.onSubmit(true);
    } else if (!loginForm.email) {
      validateLoginForm("email", null);
    } else if (!loginForm.password) {
      validateLoginForm("password", null);
    }
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        ...loginForm,
      });
      console.log("User login:", response.data);
      if (response.data.user.email === "admin@gmail.com") {
        localStorage.setItem("token", response.data.token);
      } else {
        localStorage.setItem("token", response.data.token);
      }
      // setToken(response.data.token);
    } catch (error) {
      if (error.response) {
        console.log("Error status:", error.response.status);
        console.log("Error message:", error.response.data.message);
      } else if (error.request) {
        console.log("No response received");
      } else {
        console.log("Error:", error.message);
      }
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
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginTab;
