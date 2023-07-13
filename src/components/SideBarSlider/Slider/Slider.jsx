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

const photos = [
  // get /advertising
  // {image: 'link', url: 'website url'}
  "http://localhost:5502/images/230363_adver1.jpg",
  "http://localhost:5502/images/744699_adver2.jpg",
  "http://localhost:5502/images/811860_adver3.jpg",
];

const baseUrl = process.env.REACT_APP_BASE_URL;

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
  const [images, setImages] = useState([]);

  const user = useSelector(selectedUser);
  const navigate = useNavigate();

  const localStor = localStorage.getItem("role");

  useEffect(() => {
    const getSlidersImages = async () => {
      try {
        const response = await axios.get(`${baseUrl}/advertising`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setImages(response.data.advertising.desktop);
       
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    getSlidersImages();
  }, [user.token]);

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

console.log(images);
  return (
    <div className="wrapperSlider">
      {role && (
        <NavLink to="/admin_slider">
          <button className='slider_setting'>
            <Setting />
          </button>
        </NavLink>
      )}
      {viewportWidth < 825 ? (
        <Slide indicators={indicators} scale={1.4} {...properties}>
          {images?.map((each, index) => (
            <div key={index} style={{ width: "100%" }}>
              <img
                style={{ objectFit: "cover", width: "100%", height: "375px", cursor: "pointer" }}
                alt="Slide img"
                src={each.Image}
                onClick={() => handleImageClick(each.url)}
              />
            </div>
          ))}
        </Slide>
      ) : (
        <Slide indicators={indicators} scale={1.4} {...properties}>
          {images.map((each, index) => (
            <div key={index} 
            style={{ width: "100%" }}
            >
              <img
                style={{ objectFit: "cover", width: "100%", height: "375px", cursor: "pointer"  }}
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
