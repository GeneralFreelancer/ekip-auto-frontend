import React, { useState } from "react";
import s from "./AuthModal.module.scss";

const LoginTab = (props) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loginErrors, setloginErrors] = useState({});

  const validate = () => {
    let errors = {};
    if (!loginForm.email) {
      errors.email = "Введіть Email";
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      errors.email = "Email введено неправильно";
    }
    if (!loginForm.password) {
      errors.password = "Введіть пароль";
    } else if (loginForm.password.length < 5) {
      errors.password = "Пароль повинен містити не менше 5 символів";
    }
    setloginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const changeLoginHandler = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
      rememberMe: event.target.checked,
    });
  };

  const submitLoginHandler = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      console.log(loginForm);
      props.onSubmit(true);
    }
    // try {
    //   const data = await axios.post("/api/auth/login", { ...loginForm });
    //   auth.login(data.token, data.userId);
    // } catch (e) {}
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
              className={`${s.form_input} ${loginErrors.email ? s.input_error : ""}`}
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
            <button type="submit" onClick={submitLoginHandler}>Увійти</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginTab;

