import React, { useState } from "react";
import s from "./AuthModal.module.scss";

const RegisterTab = (props) => {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errors = {};
    if (!registerForm.email) {
      errors.email = "Введіть Email";
    } else if (!/\S+@\S+\.\S+/.test(registerForm.email)) {
      errors.email = "Email введено неправильно";
    }
    if (!registerForm.password) {
      errors.password = "Введіть пароль";
    } else if (registerForm.password.length < 5) {
      errors.password = "Пароль повинен містити не менше 5 символів";
    }
    if (!registerForm.confirmPassword) {
      errors.confirmPassword = "Підтвердіть пароль";
    } else if (registerForm.password !== registerForm.confirmPassword) {
      errors.confirmPassword = "Паролі не співпадають";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const changeRegisterHandler = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  const submitRegisterHandler = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      console.log(registerForm);
      props.onSubmit(true);
    }
    // try {
    //   const data = await axios.post('/api/auth/register', { ...registerForm })
    //   setRegisterForm({
    //     email: '', password: ''
    //   })
    // } catch (e) {
    //   console.log(e)
    // }
  };

  const handleShowPasswordChange = (e) => setShowPassword(e.target.checked);

  return (
    <>
      <form >
        <div className={s.form_content}>
          <div className={s.form_group}>
            <label>Введіть Email:</label>
            <input
              type="email"
              name="email"
              className={`${s.form_input} ${errors.email ? s.input_error : ""}`}
              value={registerForm.email}
              onChange={changeRegisterHandler}
              placeholder="Email..."
            />
            {errors.email && (
              <div className={s.error_message}>{errors.email}</div>
            )}
          </div>
          <div className={s.form_hr}></div>
          <div className={s.form_group}>
            <label>Введіть пароль:</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={`${s.form_input} ${
                errors.password ? s.input_error : ""
              }`}
              value={registerForm.password}
              onChange={changeRegisterHandler}
              placeholder="Пароль..."
            />
            {errors.password && (
              <div className={s.error_message}>{errors.password}</div>
            )}
          </div>
          <div className={s.form_group}>
            <label>Підтвердити пароль:</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              className={`${s.form_input} ${
                errors.confirmPassword ? s.input_error : ""
              }`}
              value={registerForm.confirmPassword}
              onChange={changeRegisterHandler}
              placeholder="Пароль..."
            />
            {errors.confirmPassword && (
              <div className={s.error_message}>{errors.confirmPassword}</div>
            )}
          </div>
          <div className={s.form_group}>
            <label className={s.custom_checkbox}>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={handleShowPasswordChange}
              />
              <span className={s.checkmark}></span>
              <p>- Показати пароль</p>
            </label>
          </div>
          <div className={s.form_submit_btn}>
            <button type="submit" onClick={submitRegisterHandler}>
              Зареєструватися
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterTab;
