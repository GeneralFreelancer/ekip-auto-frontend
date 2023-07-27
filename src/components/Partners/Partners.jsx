import s from "./Partners.module.scss";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectedUser } from "../../redux/features/userSlice";

import { Link } from "react-router-dom";
import { ReactComponent as PaperClip } from "../../assets/svg/paper_clip.svg.svg";
import { ReactComponent as DoubleArrow } from "../../assets/svg/down_duble_arrow.svg.svg";

const baseUrl = process.env.REACT_APP_BASE_URL;

const Partners = () => {
  const [comment, setComment] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [file, setFile] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectedUser);

  const sendComment = async (comment) => {
    try {
      const formData = new FormData();

      formData.append("message", comment);
      // console.log(file)
      formData.append("file", file); // 'file' is the variable that holds the file to be sent

      const response = await axios.post(`${baseUrl}/user/partner`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data", // Make sure to set the proper content type for file uploads
        },
      });

      // Handle the response here
      if (response.data.success) {
        setComment("");
        setFile(null);
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const getFile = async (f) => {
    setFile(f.target.files[0]);
  };

  useEffect(() => {
    if (isLoggedIn) {
      sendComment(comment);
    }
    setIsLoggedIn(user.isLoggedIn);
  }, [dispatch, user.token]);

  function scrollToAnchor(anchorId) {
    const element = document.getElementById(anchorId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  }

  return (
    <React.Fragment>
      <div className={s.container_partners}>
        <div className={s.partners_empty}></div>
        <div className={s.partners_image}></div>
        <div className={s.partners_logo}>
          <div className={s.partners_text}>Читати для партнерів</div>
          <DoubleArrow
            className={s.partners_arrow}
            onClick={() => scrollToAnchor("message_block")}
          />
        </div>
        <div className={s.partners_arrow}></div>
        <div className={s.partners_title}></div>
        <div className={s.partners_button}></div>
        <a id="message_block" className={s.anchor}></a>
        <div className={s.partners_content}>
          <p className={s.title}>
            Наша компанія завжди відкрита для нових пропозицій<br></br> і ми
            завжди готові налогодити індивідуальний формат роботи<br></br> з
            нашими клієнтами.
          </p>
          <div className={s.wrapperText}>
            <p className={s.text}>
              У разі якщо ви не побачили позицію, котра була би Вам цікава чи ви
              хочете запропонувати індивідуальний <br></br>формат співпраці, то
              ми завжди відкриті до ваших пропозицій.
            </p>
            <div className={s.hr}></div>
          </div>
          <div className={s.message_block}>
            <div style={{ position: "relative", maxWidth: "100%" }}>
              <textarea
                className={s.textarea}
                placeholder="Додайте свою пропозицію і ми обов'язково її розглянемо..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <PaperClip className={s.paper_clip} />
            </div>

            <div className={s.input_file}>
              <input name="file" type="file" onChange={(f) => getFile(f)} />
              <label htmlFor="file">
                Ви можете надіслати наступні форматии:
                (jpg|jpeg|png|pdf|doc|docx|txt|xls|xlsx|rtf)
              </label>
            </div>

            {isLoggedIn &&
              (isSuccess ? (
                <div className={s.success}>
                  Ваша пропозиція успішно надіслана
                </div>
              ) : (
                <button
                  className={s.btn_send}
                  onClick={() => {
                    sendComment(comment);
                  }}
                >
                  Надіслати пропозицію
                </button>
              ))}
            <Link to="#" style={{ textDecoration: "none", cursor: "default" }}>
              *Для того щоб надіслати пропозицію, будь ласка, авторизуйтесь, або
              зареєструйтесь
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Partners;
