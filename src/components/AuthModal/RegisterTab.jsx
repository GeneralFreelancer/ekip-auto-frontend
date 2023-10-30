import React, {useState, useEffect} from 'react';
import s from './AuthModal.module.scss';
import {useDispatch} from 'react-redux';
import {register} from '../../redux/features/userSlice';
import {registerRequest} from '../../api/authRequests';

const RegisterTab = (props) => {
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [regiserErrors, setRegisterErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorRegisterMessage, setErrorRegisterMessage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (errorRegisterMessage === '') {
      props.onSubmit(true);
    }
  }, [errorRegisterMessage, props]);

  const validateRegisterForm = (name, value) => {
    let errors = {...regiserErrors};
    switch (name) {
      case 'email':
        errors.email = isValidEmail(value);
        break;
      case 'password':
        errors.password = isValidPassword(value);
        break;
      case 'confirmPassword':
        errors.confirmPassword = isValidConfirmPassword(value);
        break;
      default:
        break;
    }
    setRegisterErrors(errors);
  };

  function isValidEmail(value) {
    if (!value) {
      return 'Введіть Email';
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      return 'Email введено неправильно';
    }
  }

  function isValidPassword(value) {
    if (!value) {
      return 'Введіть пароль';
    } else if (value.length < 6) {
      return 'Пароль повинен містити не менше 6 символів';
    }
  }

  function isValidConfirmPassword(value) {
    if (!value) {
      return 'Підтвердіть пароль';
    } else if (registerForm.password !== value) {
      return 'Паролі не співпадають';
    }
  }

  const changeRegisterHandler = (event) => {
    setRegisterForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    validateRegisterForm(event.target.name, event.target.value);
  };

  const submitRegisterHandler = async (e) => {
    e.preventDefault();
    if (
      registerForm.email &&
      registerForm.password &&
      registerForm.password.trim() === registerForm.confirmPassword.trim()
    ) {
      try {
        const response = await registerRequest({...registerForm});

        setRegisterForm({
          email: '',
          password: '',
        });

        dispatch(
          register({
            email: response.data.user.email,
            password: registerForm.password,
          }),
        );
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setErrorRegisterMessage(error.response.data.message);
        } else {
          console.log('Error:', error.message);
        }
      }
    } else if (!registerForm.email) {
      validateRegisterForm('email', null);
    } else if (!registerForm.password) {
      validateRegisterForm('password', null);
    } else if (!registerForm.confirmPassword) {
      validateRegisterForm('confirmPassword', null);
    }
  };

  const handleShowPasswordChange = (e) => setShowPassword(e.target.checked);

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
                regiserErrors.email ? s.input_error : ''
              }`}
              value={registerForm.email}
              onChange={changeRegisterHandler}
              placeholder="Email..."
            />
            {regiserErrors.email && (
              <div className={s.error_message}>{regiserErrors.email}</div>
            )}
          </div>
          <div className={s.form_hr}></div>
          <div className={s.form_group}>
            <label>Введіть пароль:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className={`${s.form_input} ${
                regiserErrors.password ? s.input_error : ''
              }`}
              value={registerForm.password}
              onChange={changeRegisterHandler}
              placeholder="Пароль..."
            />
            {regiserErrors.password && (
              <div className={s.error_message}>{regiserErrors.password}</div>
            )}
          </div>
          <div className={s.form_group}>
            <label>Підтвердити пароль:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              className={`${s.form_input} ${
                regiserErrors.confirmPassword ? s.input_error : ''
              }`}
              value={registerForm.confirmPassword}
              onChange={changeRegisterHandler}
              placeholder="Пароль..."
            />
            {regiserErrors.confirmPassword && (
              <div className={s.error_message}>
                {regiserErrors.confirmPassword}
              </div>
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
            {errorRegisterMessage ? (
              <p className={s.error_message}>{errorRegisterMessage}</p>
            ) : (
              ''
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterTab;
