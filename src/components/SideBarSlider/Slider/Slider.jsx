import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./Slider.scss";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Setting } from "../../../assets/svg/setting.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../redux/features/userSlice";
import { selectedAdvertising } from "../../../redux/features/advertisingSlice";

// const photos = [
//   {
//     Image: "http://localhost:5502/images/777270_adver1.jpg",
//     url: "https://rozetka.com.ua/",
//   },
//   {
//     Image: "http://localhost:5502/images/995036_adver2.jpg",
//     url: "https://rozetka.com.ua/",
//   },
//   {
//     Image: "http://localhost:5502/images/557285_adver3.jpg",
//     url: "https://rozetka.com.ua/",
//   },
// ];

const indicators = (index) => <div className="indicator">{index + 1}</div>;

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
};

const Slider = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [role, setRole] = useState(false);
  const images = useSelector(selectedAdvertising).advertising;
  
  const localStor = localStorage.getItem("role");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      setRole(true);
    }
  }, [localStor]);

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleImageClick = (imageUrl) => {
    window.open(imageUrl);
  };

  return (
    <div className="wrapperSlider">
      {role && (
        <NavLink to="/admin_slider">
          <button className="slider_setting">
            <Setting />
          </button>
        </NavLink>
      )}
      {viewportWidth < 825 ? (
        <Slide indicators={indicators} scale={1.4} {...properties}>
          {images?.map((each, index) => (
            <div key={index} style={{ width: "100%" }}>
              <img
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "375px",
                  cursor: "pointer",
                }}
                alt="Slide img"
                src={each.Image}
                onClick={() => handleImageClick(each.url)}
              />
            </div>
          ))}
        </Slide>
      ) : (
        <Slide indicators={indicators} scale={1.4} {...properties}>
          {images?.map((each, index) => (
            <div key={index} style={{ width: "100%" }}>
              <img
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "375px",
                  cursor: "pointer",
                }}
                alt="Slide img"
                src={each.Image}
                onClick={() => handleImageClick(each.url)}
              />
            </div>
          ))}
        </Slide>
      )}
    </div>
  );
};

export default Slider;
